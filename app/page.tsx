import DonationAndVolunteer from '@/components/home/DonationAndVolunteer'
import EmpowerSection from '@/components/home/EmpowerSection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import GalleryPeek from '@/components/home/GalleryPeek'
import RecentBlogPosts from '@/components/shared/RecentBlogPosts'
import Testimonials from '@/components/home/Testimonials'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import HomeLayout from '@/components/layouts/HomeLayout'
import OurDonors from '@/components/home/OurDonors'
import Hero from '@/components/home/Hero'

export default function HomePage() {
  return (
    <HomeLayout >
      <Hero />
      <OurDonors />
      <EmpowerSection />
      <FeaturedProjects />
      <UpcomingEvents />
      <DonationAndVolunteer />
      <GalleryPeek />
      <Testimonials />
      <RecentBlogPosts />
    </HomeLayout>
  )
}
