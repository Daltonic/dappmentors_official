import { RecentBlogPageStruct } from "@/utils/interfaces";
import React from "react";

const RecentBlogPostDescription: React.FC<{ recent: RecentBlogPageStruct }> = ({
  recent,
}) => {
  return (
    <div>
      <p className="text-gray-700 dark:text-gray-400">{recent.description}</p>
    </div>
  );
};

export default RecentBlogPostDescription;
