"use client"
import MarketingLayout from "@/components/layouts/MarketingLayout";
import HackathonCompetitionsFundraising from "@/components/projects/project/HackathonCompetitionsFundraising";
import HackathonCompetitionsHeaderSection from "@/components/projects/project/HackathonCompetitionsHeaderSection";
import HackathonCompetitionsImage from "@/components/projects/project/HackathonCompetitionsImage";
import HackathonCompetitionsStories from "@/components/projects/project/HackathonCompetitionsStories";
import RecentBlogPostHeader from "@/components/projects/recent/RecentBlogPostHeader";
import { project } from "@/data/global";
import { ProjectStruct, RecentBlogPageStruct } from "@/utils/interfaces";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { recent } from '../../../data/global';
import RecentBlogPostImage from "@/components/projects/recent/RecentBlogPostImage";
import RecentBlogPostDate from "@/components/projects/recent/RecentBlogPostDate";
import RecentBlogPostDescription from "@/components/projects/recent/RecentBlogPostDescription";
import HackathonPage from "@/components/projects/project/HackathonPage";
import HackathonCompetitionsDescription from "@/components/projects/project/HackathonCompetitionsDescription";
import HackathonCompetitionsModalButton from "@/components/projects/project/HackathonCompetitionsModalButton";

const Page: NextPage = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined; // ✅ Type casting

  const projects = project.find((project: ProjectStruct) => project.slug == slug);

  const recents = recent.find((recent: RecentBlogPageStruct) => recent.slug == slug);
  

  return (
    <MarketingLayout>
      <div className="max-w-full mx-auto px-4 ">
        {projects && (
          <div className="max-w-[1000px] mx-auto p-4 space-y-8">
            <HackathonCompetitionsHeaderSection project={projects}/>
            <HackathonCompetitionsDescription project={projects}/>
            <HackathonCompetitionsModalButton/>
            <HackathonCompetitionsImage project={projects}/>
            <HackathonCompetitionsFundraising/>
            <HackathonCompetitionsStories/>
            <HackathonPage/>
          </div>
        )}

        {recents && (
          <div className="max-w-5xl mx-auto space-y-4">
            <RecentBlogPostImage recent={recents}/>
            <RecentBlogPostDate recent={recents}/>
            <RecentBlogPostHeader recent={recents}/>
            <RecentBlogPostDescription recent={recents}/>
          </div>
        )}
        
      </div>
    </MarketingLayout>
  );
};

export default Page;
