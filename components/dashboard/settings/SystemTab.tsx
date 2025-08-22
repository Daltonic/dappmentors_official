import { SystemSettings } from "@/utils/interfaces";
import { FaDatabase, FaGlobe } from "react-icons/fa";

// SystemTab Component
const SystemTab: React.FC<{
  systemSettings: SystemSettings;
  handleSystemChange: (
    field: keyof SystemSettings,
    value: string | boolean | number,
  ) => void;
}> = ({ systemSettings, handleSystemChange }) => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
      System Settings
    </h2>

    <div className="grid gap-6">
      {/* Site Information */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FaGlobe className="text-[#D2145A]" />
          Site Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={systemSettings.siteName}
              onChange={(e) => handleSystemChange("siteName", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max File Size (MB)
            </label>
            <input
              type="number"
              value={systemSettings.maxFileSize}
              onChange={(e) =>
                handleSystemChange("maxFileSize", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Description
            </label>
            <input
              type="text"
              value={systemSettings.siteDescription}
              onChange={(e) =>
                handleSystemChange("siteDescription", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* System Controls */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FaDatabase className="text-[#D2145A]" />
          System Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Maintenance Mode
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Temporarily disable public access to the site
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.maintenanceMode}
                onChange={(e) =>
                  handleSystemChange("maintenanceMode", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D2145A]/30 dark:peer-focus:ring-[#D2145A]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#D2145A]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                User Registration
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allow new users to register accounts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.userRegistration}
                onChange={(e) =>
                  handleSystemChange("userRegistration", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D2145A]/30 dark:peer-focus:ring-[#D2145A]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#D2145A]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Email Notifications
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enable system-wide email notifications
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.emailNotifications}
                onChange={(e) =>
                  handleSystemChange("emailNotifications", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D2145A]/30 dark:peer-focus:ring-[#D2145A]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#D2145A]"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data Retention (Days)
            </label>
            <input
              type="number"
              value={systemSettings.dataRetentionDays}
              onChange={(e) =>
                handleSystemChange(
                  "dataRetentionDays",
                  parseInt(e.target.value),
                )
              }
              className="w-32 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SystemTab;
