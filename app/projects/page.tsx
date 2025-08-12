import MarketingLayout from "@/components/layouts/MarketingLayout";
import React from "react";
import ProjectsPage from "../../components/projects/ProjectsPage";
import RecentBlogPosts from "@/components/shared/RecentBlogPosts";

export default function page() {
  return (
    <MarketingLayout>
      <div>
        <ProjectsPage />
        <RecentBlogPosts />
      </div>
    </MarketingLayout>
  );
}
