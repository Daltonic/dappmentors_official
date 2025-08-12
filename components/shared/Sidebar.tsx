'use client'

import Link from 'next/link'
import Button from './Button'
import { navlinks } from '@/data/global'

const Sidebar: React.FC<{ sidebarOpened: boolean }> = ({ sidebarOpened }) => {
  return (
    <div
      className={`
          flex items-center justify-center lg:hidden min-h-screen w-3/4 bg-gray-100 dark:bg-gray-900 bg-opacity-95 absolute top-0 bottom-0 ease-in duration-300 z-50 ${
            sidebarOpened ? 'left-0' : '-left-full'
          }
      `}
    >
      <div className="p-5 text-black dark:text-white rounded space-y-4 font-bold flex flex-col items-center w-full">
        {navlinks.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="hover:text-pink-500 transition-colors duration-300 w-full text-center bg-gray-200 dark:bg-gray-800 rounded-full p-3 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            {item.label}
          </Link>
        ))}

        <Button
          label="Donate Now"
          className="bg-[#D2145A] w-full h-[56px] rounded-[8px] px-[24px] text-white hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] dark:hover:bg-gray-800 dark:hover:text-white md:w-[450px] text-center mt-5"
        />
      </div>
    </div>
  )
}

export default Sidebar
