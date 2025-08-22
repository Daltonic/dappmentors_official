import { UserProfile } from "@/utils/interfaces";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

// ProfileTab Component
const ProfileTab: React.FC<{
  userProfile: UserProfile;
  handleProfileChange: (field: keyof UserProfile, value: string) => void;
}> = ({ userProfile, handleProfileChange }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Profile Settings
      </h2>
    </div>

    {/* Avatar Section */}
    <div className="flex items-center gap-6">
      <div className="relative">
        <Image
          src={userProfile.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          width={96}
          height={96}
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <button className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] p-2 rounded-full text-white shadow-lg hover:scale-110 transition-transform">
          <FaCamera className="text-sm" />
        </button>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {userProfile.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{userProfile.role}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Member since {userProfile.joinDate}
        </p>
      </div>
    </div>

    {/* Profile Form */}
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={userProfile.name}
          onChange={(e) => handleProfileChange("name", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={userProfile.email}
          onChange={(e) => handleProfileChange("email", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={userProfile.phone}
          onChange={(e) => handleProfileChange("phone", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location
        </label>
        <input
          type="text"
          value={userProfile.location}
          onChange={(e) => handleProfileChange("location", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent transition-all"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          rows={4}
          value={userProfile.bio}
          onChange={(e) => handleProfileChange("bio", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent transition-all resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  </div>
);

export default ProfileTab;
