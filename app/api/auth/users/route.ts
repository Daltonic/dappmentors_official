// /api/auth/users/route.ts

import { generateVerificationToken, logActivity } from "@/heplers/users";
import { sendVerificationEmail } from "@/lib/email";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { User } from "@/utils/interfaces";
import { signupSchema } from "@/validations/users";
import bcrypt from "bcryptjs";
import disposableEmailDomains from "disposable-email-domains";
import dns from "dns/promises";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ADDITIONAL_DISPOSABLE_DOMAINS } from "@/data/global";

// Enhanced disposable domain patterns and known services
const ADDITIONAL_DISPOSABLE_PATTERNS = [
  // Common patterns for disposable services
  /^.+\.(tk|ml|ga|cf)$/i, // Free TLDs often used for disposable
  /^.+-\w+\.cc$/i, // Pattern like p-y.cc, x-z.cc
  /^\w{1,3}-\w{1,3}\.(cc|tk|ml|ga|cf|xyz)$/i, // Short hyphenated domains
  /temp.*mail/i,
  /disposable/i,
  /throwaway/i,
  /fake.*mail/i,
  /spam.*mail/i,
  /trash.*mail/i,
];

// Suspicious domain characteristics
const SUSPICIOUS_DOMAIN_CHECKS = {
  // Very short domains (often disposable)
  isVeryShort: (domain: string) => domain.length <= 6,

  // Contains numbers in unusual patterns
  hasRandomNumbers: (domain: string) => /\d{3,}/.test(domain),

  // Multiple hyphens or unusual patterns
  hasUnusualPattern: (domain: string) =>
    /--/.test(domain) ||
    /^[a-z]{1,2}-[a-z]{1,2}\./.test(domain) ||
    /\d+[a-z]{1,2}\./.test(domain),

  // Recently registered domains (you'd need a domain age API for this)
  // This is a placeholder - you'd integrate with a service like WhoisAPI
  isNewDomain: async (domain: string) => {
    // Implement domain age checking if needed
    console.log(domain);

    return false;
  },
};

// Enhanced email validation function
async function validateEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) {
    return {
      valid: false,
      reason: "Invalid email format",
      code: "INVALID_FORMAT",
    };
  }

  // Check against original disposable list
  if (disposableEmailDomains.includes(domain)) {
    return {
      valid: false,
      reason: "Disposable email domain detected (known list)",
      code: "DISPOSABLE_KNOWN",
    };
  }

  // Check against additional disposable domains
  if (ADDITIONAL_DISPOSABLE_DOMAINS.includes(domain)) {
    return {
      valid: false,
      reason: "Disposable email domain detected (additional list)",
      code: "DISPOSABLE_ADDITIONAL",
    };
  }

  // Check against disposable patterns
  for (const pattern of ADDITIONAL_DISPOSABLE_PATTERNS) {
    if (pattern.test(domain)) {
      return {
        valid: false,
        reason: "Domain matches disposable email pattern",
        code: "DISPOSABLE_PATTERN",
      };
    }
  }

  // Suspicious domain checks
  let suspiciousScore = 0;
  const suspiciousReasons = [];

  if (SUSPICIOUS_DOMAIN_CHECKS.isVeryShort(domain)) {
    suspiciousScore += 2;
    suspiciousReasons.push("very short domain");
  }

  if (SUSPICIOUS_DOMAIN_CHECKS.hasRandomNumbers(domain)) {
    suspiciousScore += 1;
    suspiciousReasons.push("contains random numbers");
  }

  if (SUSPICIOUS_DOMAIN_CHECKS.hasUnusualPattern(domain)) {
    suspiciousScore += 2;
    suspiciousReasons.push("unusual domain pattern");
  }

  // Block if suspicion score is too high
  if (suspiciousScore >= 3) {
    return {
      valid: false,
      reason: `Suspicious domain characteristics: ${suspiciousReasons.join(", ")}`,
      code: "SUSPICIOUS_DOMAIN",
    };
  }

  // MX record validation
  try {
    const addresses = await dns.resolveMx(domain);
    if (addresses.length === 0) {
      return {
        valid: false,
        reason: "Domain does not support email delivery",
        code: "NO_MX_RECORDS",
      };
    }
  } catch (dnsError) {
    console.error("DNS MX lookup error:", dnsError);
    return {
      valid: false,
      reason: "Unable to verify email domain",
      code: "DNS_ERROR",
    };
  }

  // Additional checks could include:
  // - Domain age verification
  // - Reputation checking
  // - Real-time disposable email API calls

  return { valid: true, reason: null, code: "VALID" };
}

// Helper function to extract IP address from NextRequest
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const clientIP = request.headers.get("x-client-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (clientIP) {
    return clientIP;
  }

  return "unknown";
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (payload.role !== "admin" || payload.status !== "active") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const status = url.searchParams.get("status");
    const role = url.searchParams.get("role");

    const filter: Filter<User> = {};
    if (status) filter.status = status as User["status"];
    if (role) filter.role = role as User["role"];

    const skip = (page - 1) * limit;

    const users = await collection
      .find(filter, {
        projection: {
          password: 0,
          emailVerificationToken: 0,
          passwordResetToken: 0,
          passwordResetExpires: 0,
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const mappedUsers = users.map((user) => ({
      ...user,
      id: user._id.toString(),
      _id: undefined,
    }));

    const total = await collection.countDocuments(filter);

    return NextResponse.json(
      {
        users: mappedUsers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    const body = await request.json();

    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.issues.reduce(
        (acc, err) => {
          acc[err.path[0] as string] = err.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, password } = validationResult.data;

    // Enhanced email validation
    const emailValidation = await validateEmail(email);
    const now = new Date();
    const userName = `${firstName.trim()} ${lastName.trim()}`;

    if (!emailValidation.valid) {
      // Log the silent blocked attempt with detailed reason (no user created, no email sent)
      await logActivity(
        db,
        "disposable_email_silent_block",
        "Silent disposable email signup attempt",
        `Silent block: ${email}. Reason: ${emailValidation.reason}. No account created, no email sent.`,
        {
          email,
          ip: getClientIP(request),
          message: `${emailValidation.code} from ${email.split("@")[1]?.toLowerCase()}`,
        },
      );

      // Fake success response to waste attacker's time
      const fakeId = new ObjectId();
      const fakeUser = {
        id: fakeId,
        name: userName,
        email,
        role: "student",
        status: "pending",
        joinDate: now,
        emailVerified: false,
      };

      return NextResponse.json(
        {
          message:
            "Account created successfully! Please check your email to verify your account.",
          user: fakeUser,
        },
        { status: 201 },
      );
    }

    // Proceed with real signup only if email is valid
    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
          details: {
            email: "An account with this email address already exists",
          },
        },
        { status: 409 },
      );
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate email verification token
    const emailVerificationToken = generateVerificationToken();

    // Create user object
    const newUser: Omit<User, "_id"> = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: userName,
      email,
      password: hashedPassword,
      role: "student",
      status: "pending",
      joinDate: now,
      createdAt: now,
      updatedAt: now,
      emailVerified: false,
      emailVerificationToken,
      coursesEnrolled: 0,
      coursesCompleted: 0,
      posts: 0,
      comments: 0,
      authMethod: "traditional",
    };

    // Insert user into database
    const result = await collection.insertOne(newUser);

    // Log activity for new registration
    await logActivity(
      db,
      "user_registration",
      "New user registration",
      `${newUser.name} joined as ${newUser.role}`,
      {
        userId: result.insertedId.toString(),
        userName: newUser.name,
      },
    );

    // Send email verification email
    try {
      const emailSent = await sendVerificationEmail(
        email,
        emailVerificationToken,
        newUser.name,
      );

      if (!emailSent) {
        console.error("Failed to send verification email to:", email);
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    return NextResponse.json(
      {
        message:
          "Account created successfully! Please check your email to verify your account.",
        user: {
          id: result.insertedId,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
          joinDate: newUser.joinDate,
          emailVerified: newUser.emailVerified,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/users error:", error);

    if (error instanceof Error) {
      if (error.message.includes("E11000")) {
        return NextResponse.json(
          {
            error: "User already exists",
            details: {
              email: "An account with this email address already exists",
            },
          },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    const body = await request.json();
    const { action, token } = body;

    if (action === "verify-email" && token) {
      const user = await collection.findOne({ emailVerificationToken: token });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid or expired verification token" },
          { status: 400 },
        );
      }

      const tokenCreatedAt = user.updatedAt || user.createdAt;
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      if (tokenCreatedAt < twentyFourHoursAgo) {
        return NextResponse.json(
          {
            error:
              "Verification token has expired. Please request a new verification email.",
          },
          { status: 400 },
        );
      }

      await collection.updateOne(
        { _id: user._id },
        {
          $set: {
            emailVerified: true,
            status: "active",
            updatedAt: new Date(),
          },
          $unset: {
            emailVerificationToken: "",
          },
        },
      );

      return NextResponse.json(
        {
          message: "Email verified successfully! Your account is now active.",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            emailVerified: true,
            status: "active",
          },
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Invalid action or missing parameters" },
      { status: 400 },
    );
  } catch (error) {
    console.error("PATCH /api/users error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
