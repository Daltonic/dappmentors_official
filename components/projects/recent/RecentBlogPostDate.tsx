import { RecentBlogPageStruct } from "@/utils/interfaces";
import React from "react";

const RecentBlogPostDate: React.FC<{ recent: RecentBlogPageStruct }> = ({
  recent,
}) => {
  return (
    <div className="flex items-center font-semibold text-[16px] font-inter space-x-2 text-[#D2145A]">
      <div className="h-[8px] w-[8px] bg-[#D2145A] rounded-full"></div>
      <small>{recent.date}</small>
    </div>
  );
};

export default RecentBlogPostDate;
