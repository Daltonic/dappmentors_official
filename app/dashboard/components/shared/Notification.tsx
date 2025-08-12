"use client";

import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

const notifications = [
    { id: 1, message: "You got a new donation $10,000 from Mark Williams" },
    { id: 2, message: "Mark Williams newly joined as a volunteer" },
    { id: 3, message: "You got a new donation from Mark Williams" },
    { id: 4, message: "You got a new donation from Mark Williams" },
  ];

export default function Notification() {
  const [show, setShow] = useState(false);

  const toggleNotification = () => {
    setShow(!show);
  };
  return (
    <div className="relative">
      <button onClick={toggleNotification} className="relative">
        <IoMdNotificationsOutline
          size={24}
          className="text-gray-600 dark:text-gray-300"
        />
      </button>
      {show && (
        <div className="absolute right-0 mt-2 bg-[#F4F4F5] dark:bg-[#1A1A1A] p-4 rounded-lg w-80 shadow-lg z-50">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-2 p-3 bg-white dark:bg-black rounded-lg mb-2 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-[#333] dark:hover:text-white transition-colors"
            >
              <FaCircle className="text-[#D2145A] text-xs flex-shrink-0" />
              <span className="dark:text-gray-400 text-sm">{notification.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
