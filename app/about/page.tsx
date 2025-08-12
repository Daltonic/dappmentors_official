import MarketingLayout from '@/components/layouts/MarketingLayout'
import OurStory from '../../components/about/OurStory'
import MissionAndVision from '../../components/about/MissionAndVision'
import WhatWeAddress from '../../components/about/WhatWeAddress'
import OurNiche from '../../components/about/OurNiche'
import RecentBlogPosts from '../../components/about/RecentBlogPosts';

const Page = () => {
  return (
    <MarketingLayout>
      <div className="max-w-screen-xl mx-auto space-y-10">
        <OurStory/>
        <MissionAndVision/>
        <WhatWeAddress/>
        <OurNiche/>
        <RecentBlogPosts/>
      </div>
    </MarketingLayout>
  )
}

export default Page
