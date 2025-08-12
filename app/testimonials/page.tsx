import MarketingLayout from '@/components/layouts/MarketingLayout'
import SuccessStories from '@/components/testimonials/SuccessStories'
import Testimonials from '@/components/testimonials/Testimonials'
import React from 'react'

function TestimonialsPage() {
  return (
    <MarketingLayout>
      <div className='text-center max-w-full mx-auto space-y-10 overflow-hidden'>
        <SuccessStories />
        <Testimonials />
      </div>
    </MarketingLayout>
  )
}

export default TestimonialsPage