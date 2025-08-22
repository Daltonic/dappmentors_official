// SecurityTab Component
import { PasswordData } from "@/utils/interfaces";
import { FaChartBar, FaLock } from "react-icons/fa";

const SecurityTab: React.FC<{
  passwordData: PasswordData;
  setPasswordData: React.Dispatch<React.SetStateAction<PasswordData>>;
  handlePasswordChange: () => void;
}> = ({ passwordData, setPasswordData, handlePasswordChange }) => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
      Security Settings
    </h2>

    {/* Change Password */}
    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FaLock className="text-[#D2145A]" />
        Change Password
      </h3>
      <div className="grid gap-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
          />
        </div>
        <button
          onClick={handlePasswordChange}
          className="w-fit bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-2 rounded-lg hover:from-[#B01148] hover:to-[#E63971] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Update Password
        </button>
      </div>
    </div>

    {/* Session Management */}
    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FaChartBar className="text-[#D2145A]" />
        Session Management
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Active Sessions
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You are currently logged in from 2 devices
            </p>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Sign Out All Devices
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SecurityTab;
