export interface EventStruct {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  objective: string;
  involvement: string;
}

export interface PostStruct {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  slug: string;
}
export interface ProjectStruct {
  id?: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  completed?: boolean;
  slug?: string;
}

export interface RecentBlogPageStruct {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  slug: string;
}

export interface GlobalState {
  darkMode: boolean;
}

export interface RootState {
  globalStates: GlobalState;
}

export interface AllProjectCardProps {
  project: {
    id: number;
    title: string;
    raised: number;
    goal: number;
    image: string;
  };
}

export interface AccountFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  image: string | null;
}

export interface ProfileFormProps {
  onSubmit: (data: AccountFormData) => void;
}

export interface ProjectFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  targetAmount: number;
  aboutProject: string;
  storiesImpact: string;
  conclusion: string;
  gallery?: string;

  onSubmit: (data: AccountFormData) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ProjectProps {
  handleSeeMore: () => void;
}

export interface eventFormData {
  title: string;
  targetAmount?: number;
  aboutEvent: string;
  storiesImpact: string;
  conclusion: string;
  image: string;
  gallery?: string;
  description: string;
  date: string;
  location: string;
}

export interface EventsProps {
  handleViewMore: () => void;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  slug: string;
  userId: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EventCardProps {
  event: Event;
}

export interface EventCardProps {
  event: Event;
}

export interface BlogFormData {
  title: string; // Required
  content: string; // Required (replacing "aboutProject" as "Details")
  author: string; // Required
  image: string; // Required
  targetAmount?: number; // Optional (not always present in blogs)
  storiesImpact: string; // Required
  conclusion: string; // Required
  gallery?: string[]; // Optional
  userId: string; // Required for backend
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  image: string;
  targetAmount?: number;
  storiesImpact: string;
  conclusion: string;
  gallery: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface AllBlogCardProps {
  post: Blog;
}

export interface BlogProps {
  handleSeeMore: () => void;
}

export interface DonationCardProps {
  title: string;
  value: string | number;
}

export type ButtonProps = {
  label: string | number;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export interface UserFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  image: string | null;
}

export interface User {
  name: string;
  dateJoined: string;
  time: string;
  email: string;
  phone: string;
  userType: string;
  avatar: string;
}

export interface UsersTableProps {
  users: User[];
  filter: string;
  setFilter: (filter: string) => void;
  isFilterOpen: boolean;
  toggleFilter: () => void;
  deleteOptionVisible: number | null;
  toggleDeleteOption: (index: number) => void;
}

export type Volunteer = {
  name: string;
  date: string;
  time: string;
  project: string;
  amount: string;
  transactionId: string;
  avatar: string;
};

export interface AllVolunteersTableProps {
  volunteers: Volunteer[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  date: string | Date;
  location: string;
  slug: string;
  userId: string;
  image: string;
  targetAmount: number;
  aboutProject: string;
  storiesImpact: string;
  conclusion: string;
  gallery: string[];
  raised: number;
  completed: boolean;
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
