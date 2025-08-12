import MarketingLayout from '@/components/layouts/MarketingLayout'
import AllEvents from '../../components/events/AllEvents'
import PastEvents from '../../components/events/PastEvents'


const Page = () => {
  return (
    <MarketingLayout>
      <div className="max-w-screen-xl mx-auto space-y-10">
        <AllEvents/>
        <PastEvents/>
      </div>
    </MarketingLayout>
  )
}

export default Page
