// lib/jwt.ts
import jwt from "jsonwebtoken";
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
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: "15m", // 15 minutes
    issuer: "dapp-mentors",
    audience: "dapp-mentors-users",
  });
}

// Generate refresh token (long-lived)
export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET!, {
    expiresIn: "7d", // 7 days
    issuer: "dapp-mentors",
    audience: "dapp-mentors-users",
  });
}

// Verify access token
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!, {
      issuer: "dapp-mentors",
      audience: "dapp-mentors-users",
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error("Access token verification failed:", error);
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET!, {
      issuer: "dapp-mentors",
      audience: "dapp-mentors-users",
    }) as JWTPayload;
    return decoded;
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
