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
  id: string;
  name: string;
  email: string;
  role: "admin" | "instructor" | "student";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastActivity: string;
  avatar?: React.ReactNode; // Changed from string to ReactNode for react-icons
  coursesEnrolled?: number;
  coursesCompleted?: number;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode; // Changed from string to ReactNode for react-icons
  href: string;
}
