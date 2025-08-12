import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiBriefcase,
  FiCalendar,
  FiHeart,
  FiFileText,
  FiMessageSquare,
  FiUsers,
  FiUser,
} from "react-icons/fi";
import UserDropdown from "../shared/UserDropdown";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: FiGrid },
  { name: "Projects", href: "/dashboard/projects", icon: FiBriefcase },
  { name: "Events", href: "/dashboard/events", icon: FiCalendar },
  { name: "Donations", href: "/dashboard/donations", icon: FiHeart },
  { name: "Blogs", href: "/dashboard/blogs", icon: FiFileText },
  {
    name: "Testimonials",
    href: "/dashboard/testimonials",
    icon: FiMessageSquare,
  },
  { name: "Volunteers", href: "/dashboard/volunteers", icon: FiUsers },
  { name: "Users", href: "/dashboard/users", icon: FiUser },
];

export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="relateive">
      {/* 🔹 Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`fixed lg:fixed top-0 left-0 h-screen w-80 md:w-96 lg:w-64 bg-white dark:bg-black shadow-lg 
          p-2 overflow-y-auto transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Close Button (Mobile Only) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 right-4 text-black dark:text-white mt-4"
        >
          ✖
        </button>

        {/* 🔹 Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full relative overflow-hidden">
            <Image
              src="/images/home/Dapp Mentors 1.png"
              alt="DAPP MENTORS Logo"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="text-black dark:text-white ml-2">
            <h1 className="text-lg font-bold">DAPP MENTORS</h1>
            <span className="text-[11px] font-light text-gray-800 dark:text-gray-400 tracking-[5px]">
              FOUNDATION
            </span>
          </div>
        </Link>

        {/* 🔹 Navigation */}
        <nav className="mt-5">
          <ul className="space-y-2">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 py-2 px-3 rounded transition-all 
                    text-black dark:text-white hover:bg-gray-200 dark:hover:bg-white dark:hover:text-black
                    ${
                      pathname === item.href
                        ? "text-[#D2145A] font-bold"
                        : "hover:text-black"
                    }`}
                >
                  <item.icon
                    size={20}
                    className={`${pathname === item.href ? "text-[#D2145A]" : ""}`}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 py-6 w-[calc(100%-1rem)]">
          <UserDropdown />
        </div>
      </div>
    </div>
  );
}
