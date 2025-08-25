// lib/jwt.ts
import { SignJWT, jwtVerify } from "jose";
import { User } from "@/utils/interfaces";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  status: string;
}

export interface SessionData {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  joinDate: Date;
  emailVerified: boolean;
  coursesEnrolled: number;
  coursesCompleted: number;
  posts: number;
  comments: number;
  authMethod: string;
  lastLogin: Date;
}

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

if (!JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET environment variable is not defined");
}

// Generate access token (short-lived)
export async function generateAccessToken(
  payload: JWTPayload,
): Promise<string> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    return await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("dapp-mentors")
      .setAudience("dapp-mentors-users")
      .setExpirationTime("15m")
      .sign(secret);
  } catch (error) {
    throw new Error(`Failed to generate access token: ${error}`);
  }
}

// Generate refresh token (long-lived)
export async function generateRefreshToken(
  payload: JWTPayload,
): Promise<string> {
  try {
    const secret = new TextEncoder().encode(JWT_REFRESH_SECRET);
    return await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("dapp-mentors")
      .setAudience("dapp-mentors-users")
      .setExpirationTime("7d")
      .sign(secret);
  } catch (error) {
    throw new Error(`Failed to generate refresh token: ${error}`);
  }
}

// Verify access token
export async function verifyAccessToken(
  token: string,
): Promise<JWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret, {
      issuer: "dapp-mentors",
      audience: "dapp-mentors-users",
    });
    return payload as unknown as JWTPayload;
  } catch (error) {
    console.error("Access token verification failed:", error);
    return null;
  }
}

// Verify refresh token
export async function verifyRefreshToken(
  token: string,
): Promise<JWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(JWT_REFRESH_SECRET);
    const { payload } = await jwtVerify(token, secret, {
      issuer: "dapp-mentors",
      audience: "dapp-mentors-users",
    });
    return payload as unknown as JWTPayload;
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    return null;
  }
}

// Create session data from user object
export function createSessionData(user: User): SessionData {
  return {
    id: user._id?.toString() || "",
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    status: user.status === "pending" ? "active" : user.status,
    avatar: user.avatar,
    bio: user.bio,
    phone: user.phone,
    location: user.location,
    joinDate: user.joinDate,
    emailVerified: user.emailVerified,
    coursesEnrolled: user.coursesEnrolled,
    coursesCompleted: user.coursesCompleted,
    posts: user.posts,
    comments: user.comments,
    authMethod: user.authMethod,
    lastLogin: new Date(),
  };
}

// Create JWT payload from user
export function createJWTPayload(user: User): JWTPayload {
  return {
    userId: user._id?.toString() || "",
    email: user.email,
    role: user.role,
    status: user.status === "pending" ? "active" : user.status,
  };
}
