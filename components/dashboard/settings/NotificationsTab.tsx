// NotificationsTab Component
import { NotificationSettings } from "@/utils/interfaces";
import { FaBell, FaEnvelope } from "react-icons/fa";

const NotificationsTab: React.FC<{
  notifications: NotificationSettings;
  handleNotificationChange: (
    field: keyof NotificationSettings,
    value: boolean,
  ) => void;
}> = ({ notifications, handleNotificationChange }) => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
      Notification Settings
    </h2>

    <div className="grid gap-6">
      {/* Email Notifications */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FaEnvelope className="text-[#D2145A]" />
          Email Notifications
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "emailNewUsers",
              label: "New User Registrations",
              desc: "Get notified when new users join",
            },
            {
              key: "emailNewContent",
              label: "New Content Published",
              desc: "Notifications for new courses and blog posts",
            },
            {
              key: "emailSystemUpdates",
              label: "System Updates",
              desc: "Important system maintenance and updates",
            },
            {
              key: "emailWeeklyReports",
              label: "Weekly Reports",
              desc: "Weekly analytics and performance reports",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between py-2"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.label}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    notifications[
                      item.key as keyof NotificationSettings
                    ] as boolean
                  }
                  onChange={(e) =>
                    handleNotificationChange(
                      item.key as keyof NotificationSettings,
                      e.target.checked,
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D2145A]/30 dark:peer-focus:ring-[#D2145A]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#D2145A]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FaBell className="text-[#D2145A]" />
          Push Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Browser Notifications
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show notifications in your browser
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.browserNotifications}
                onChange={(e) =>
                  handleNotificationChange(
                    "browserNotifications",
                    e.target.checked,
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D2145A]/30 dark:peer-focus:ring-[#D2145A]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#D2145A]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Mobile Notifications
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Push notifications to your mobile device
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.mobileNotifications}
                onChange={(e) =>
                  handleNotificationChange(
                    "mobileNotifications",
                    e.target.checked,
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D2145A]/30 dark:peer-focus:ring-[#D2145A]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#D2145A]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default NotificationsTab;
