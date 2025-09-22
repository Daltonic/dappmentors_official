import { ObjectId } from "mongodb";

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
  id: string;
  title: string;
  description: string;
  duration: string;
  order?: number;
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

export type ProductType = "Course" | "Bootcamp" | "Ebook" | "Codebase";

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface Product {
  _id?: ObjectId;
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  type: ProductType;
  price: number | string;
  status?: string;
  difficulty?: string;
  level?: string;
  duration: string;
  instructor: {
    name: string;
    bio?: string; // Add bio
    avatar?: string; // Add avatar
    credentials?: string[]; // Add credentials
  };
  imageUrl?: string;
  videoPreviewUrl?: string;
  tags?: string[];
  technologies?: string[];
  features?: ProductFeature[];
  modules?: ModuleWithLessons[];
  testimonials?: ProductTestimonial[];
  faqs?: FAQs[];
  subtitle?: string;
  originalPrice?: number | string;
  currency?: string;
  category: string;
  language?: string;
  lastUpdated?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  featured?: boolean;
  enrollments?: number;
  rating?: number;
  totalReviews?: number;
  studentsEnrolled?: number;
  includes?: string[];
  slug?: string;
  createdBy?: string;
}
export interface Lesson {
  id: string;
  title: string;
  type: "video" | "reading" | "code" | "quiz" | "project";
  duration: string;
  completed: boolean;
  locked: boolean;
  videoUrl?: string;
  content?: string;
  transcript?: string;
  description?: string;
  resources?: Resource[];
  order?: number;
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "code" | "link" | "image";
  url: string;
  downloadable: boolean;
}

export interface Note {
  id: string;
  timestamp: number;
  content: string;
  createdAt: Date;
}

export interface ModuleWithLessons extends Omit<ProductModule, "lessons"> {
  id: string;
  productId?: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  completed: boolean;
  progress: number;
  order?: number;
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
  purchasedProducts?: string[]; // Added to store product IDs
  purchasedServices?: string[]; // Added to store service IDs
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode; // Changed from string to ReactNode for react-icons
  href: string;
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

export type BlogStatus = "published" | "draft" | "archived";

export interface BlogPost {
  _id?: ObjectId;
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: Date;
  updatedAt: Date;
  topics: string[];
  image: string;
  featured: boolean;
  status: "published" | "draft" | "archived";
  views: number;
  comments: number;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  relatedProduct?: string;
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

export type ServiceType =
  | "Hiring"
  | "Education"
  | "Mentorship"
  | "Professional"
  | "Writing";

export interface Package {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface Service {
  _id?: ObjectId;
  id: string;
  title: string;
  description: string;
  price: number | string;
  status: "active" | "inactive" | "coming-soon";
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  thumbnail: string;
  slug: string;
  features: string[];
  faqs: FAQs[];
  icon: string;
  clients: number;
  packages: Package[];
  type: ServiceType;
}

export interface ICheckoutItem {
  id: string;
  name: string;
  price: number;
  amount?: number;
  quantity: number;
  image?: string;
  type?: "product" | "service"; // Optional type to distinguish products/services
}

export interface Transaction {
  _id: string;
  email: string;
  userId: string;
  transactionId: string;
  type: string;
  lineItems?: ICheckoutItem[];
  totalAmount?: number;
  subscriptionId?: string;
  createdAt: Date;
  status: string;
}

export interface Activity {
  id: string;
  type:
    | "user_registration"
    | "items_activities"
    | "course_completed"
    | "payment_received"
    | "spam_attempt"
    | "disposable_email_silent_block";

  title: string;
  description: string;
  timestamp: Date; // ISO string from DB
  icon: string;
  color: string;
  metadata?: {
    userId?: string;
    email?: string;
    userName?: string;
    transactionId?: string;
    message?: string;
    amount?: number;
    itemTtitle?: string;
    itemType?: string;
    itemSlug?: string;
    ip?: string;
  };
}
