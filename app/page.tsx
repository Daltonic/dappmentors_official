import AboutSection from "@/components/home/AboutSection";
import GalleryPeek from "@/components/home/GalleryPeek";
import RecentBlogPosts from "@/components/shared/RecentBlogPosts";
import HomeLayout from "@/components/layouts/HomeLayout";
import OurStacks from "@/components/home/OurStacks";
import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import OurServices from "@/components/home/OurServices";

export default function HomePage() {
  return (
    <HomeLayout>
      <Hero />
      <OurStacks />
      <FeaturedCourses />
      <AboutSection />
      <GalleryPeek />
      <RecentBlogPosts />
      <OurServices />
    </HomeLayout>
  );
}
