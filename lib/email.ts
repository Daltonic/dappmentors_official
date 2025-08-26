// lib/email.ts
import nodemailer from "nodemailer";
import { generateVerificationEmailHTML } from "./templates/email_verify_template";
import { generatePasswordResetEmailHTML } from "./templates/password_reset_template";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create transporter configuration
const createTransporter = () => {
  // For production with Docker, you might want to use environment variables
  // for your SMTP configuration
  if (process.env.NODE_ENV !== "production") {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com", // Update with your SMTP provider
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your email credentials
        pass: process.env.SMTP_PASS, // Your email password or app password
      },
    });
  } else {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Dapp Mentors" <no-reply@dappmentors.org>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || "", // Fallback plain text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
): Promise<boolean> => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

  const subject = "Verify Your Email Address - Dapp Mentors";

  const html = generateVerificationEmailHTML(name, verificationUrl, subject);

  const text = `
    Hi ${name},

    Welcome to Dapp Mentors! Please verify your email address by clicking the link below:

    ${verificationUrl}

    This link will expire in 24 hours for security reasons.

    If you didn't create an account with us, please ignore this email.

    Best regards,
    The Dapp Mentors Team
  `;

  return await sendEmail({
    to: email,
    subject,
    html,
    text,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string,
): Promise<boolean> => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  const subject = "Reset Your Password - Dapp Mentors";

  const html = generatePasswordResetEmailHTML(name, resetUrl, subject);

  const text = `
    Hi ${name},

    You requested to reset your password for your Dapp Mentors account. Please click the link below to reset your password:

    ${resetUrl}

    This link will expire in 1 hour for security reasons.

    If you didn't request this password reset, please ignore this email or contact our support team.

    For security reasons, this link will only work once.

    Best regards,
    The Dapp Mentors Team
  `;

  return await sendEmail({
    to: email,
    subject,
    html,
    text,
  });
};
