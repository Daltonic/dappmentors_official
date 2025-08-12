import MarketingLayout from '@/components/layouts/MarketingLayout'
import { PrivacyDisclaimer } from '@/components/privacy/PrivacyDisclaimer'
import { PrivacyPolicy } from '@/components/privacy/PrivacyPolicy'


const Page = () => {
  return (
    <MarketingLayout>
      <div className="max-w-full mx-auto px-4 lg:px-10 py-10">
        <div className='max-w-[1000px] mx-auto space-y-8'>
            <PrivacyPolicy/>
            <PrivacyDisclaimer/>
        </div>
      </div>
    </MarketingLayout>
  )
}

export default Page
