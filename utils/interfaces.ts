import { ObjectId } from "mongodb";

export interface GlobalState {
  darkMode: boolean;
}

export interface RootState {
  globalStates: GlobalState;
}

export interface SearchResult {
  type: string;
  data: {
    slug?: string; // Used for blog, event, project, testimonial
    title?: string; // Used for blog, event, project, etc.
    name?: string; // Used for user, donation, etc.
    _id?: string; // Used for user, donation
  };
}

export interface HeroSectionProps {
  tagText: string;
  title: string;
  highlightText: string;
  subtitle: string;
  gradientFrom?: string;
  gradientTo?: string;
  backgroundGradient?: string;
}

export interface CTASectionProps {
  title?: string;
  highlightText?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  gradientFrom?: string;
  gradientTo?: string;
  darkGradientFrom?: string;
  darkGradientTo?: string;
  primaryButtonClassName?: string;
  secondaryButtonClassName?: string;
}

export interface ProductProp {
  title: string;
  description: string;
  type: string;
  duration: string;
  level: string;
  price: string;
  image: string;
  imageSrc: string;
  alt: string;
  gradient: string;
  features: string[];
}

export interface PostProp {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  topics: string[];
  imageSrc: string; // Path to the thumbnail image
  alt: string; // Alt text for accessibility
  icon: string; // Emoji or icon for the floating badge
  gradient: string; // Gradient class for styling
  featured: boolean;
  relatedProduct: string;
}

export interface ProductModule {
  title: string;
  duration: string;
  lessons: number;
  description: string;
}

export interface ProductTestimonial {
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface FAQs {
  question: string;
  answer: string;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProductStruct {
  id: string;
  type: "Course" | "Bootcamp" | "Ebook" | "Codebase";
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  totalRatings: number;
  studentsEnrolled: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  language: string;
  lastUpdated: string;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
    credentials: string[];
  };
  features: ProductFeature[];
  modules?: ProductModule[];
  technologies?: string[];
  includes: string[];
  testimonials: ProductTestimonial[];
  faqs: FAQs[];
  videoPreviewUrl?: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

export interface DashboardStats {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode; // Changed from string to ReactNode for react-icons
  trendData: { name: string; value: number }[];
}

export interface User {
  _id?: ObjectId;
  id?: string; // Unique identifier (could be UUID or MongoDB ObjectId as string)
  firstName: string;
  lastName: string;
  name: string; // Combined first + last name
  email: string;
  password: string;
  role: "admin" | "instructor" | "student";
  status: "active" | "inactive" | "pending" | "banned";
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
  lastActivity?: Date;
  lastLogin?: Date;
  emailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  // Social login fields (for future use)
  googleId?: string;
  twitterId?: string;
  // Course-related fields
  coursesEnrolled: number;
  coursesCompleted: number;
  posts: number;
  comments: number;
  // Authentication method
  authMethod: "traditional" | "google" | "twitter";
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode; // Changed from string to ReactNode for react-icons
  href: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  type: "Course" | "Bootcamp" | "eBook" | "Codebase";
  price: number;
  status: "published" | "draft" | "archived";
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  enrollments: number;
  rating: number;
  totalReviews: number;
  instructor: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  thumbnail: string;
  slug: string;
}

export type Particle = {
  top: string;
  left: string;
  color: string;
  baseSize: number;
  duration: number;
  xAmp: number;
  yAmp: number;
  scaleMax: number;
  scaleMin: number;
  opacityBase: number;
  opacityDelta: number;
  delay: number;
};

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  topics: string[];
  imageSrc: string;
  alt: string;
  icon: string;
  gradient: string;
  featured: boolean;
  relatedProduct: string;
  status: "published" | "draft" | "archived";
  views: number;
  comments: number;
  author: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  phone: string;
  location: string;
  joinDate: string;
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  userRegistration: boolean;
  emailNotifications: boolean;
  dataRetentionDays: number;
  maxFileSize: number;
  darkMode: boolean;
}

export interface NotificationSettings {
  emailNewUsers: boolean;
  emailNewContent: boolean;
  emailSystemUpdates: boolean;
  emailWeeklyReports: boolean;
  browserNotifications: boolean;
  mobileNotifications: boolean;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
}

export interface Service {
  _id?: ObjectId;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type:
    | "Education"
    | "Mentorship"
    | "Development"
    | "Writing"
    | "Hiring"
    | "Community";
  category: string;
  price: number | string;
  status: "active" | "inactive" | "coming-soon";
  duration: string;
  clients: number;
  rating: number;
  totalReviews: number;
  lead: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  thumbnail: string;
  tags: string[];
  deliverables: string[];
  slug: string;
  technologies: string[];
  blockchains: string[];
  features: ServiceFeature[];
  packages: ServicePackage[];
  faqs: FAQs[];
}
