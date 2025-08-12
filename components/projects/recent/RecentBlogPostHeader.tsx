import { RecentBlogPageStruct } from "@/utils/interfaces";
import React from "react";

const RecentBlogPostHeader: React.FC<{ recent: RecentBlogPageStruct }> = ({
  recent,
}) => {
  return (
    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
      {recent.title}
    </div>
  );
};

export default RecentBlogPostHeader;
