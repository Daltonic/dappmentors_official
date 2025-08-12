'use client'

import EventConnect from '@/components/events/event/EventConnect'
import EventDetails from '@/components/events/event/EventDetails'
import EventHeader from '@/components/events/event/EventHeader'
import EventImage from '@/components/events/event/EventImage'
import EventObjectives from '@/components/events/event/EventObjectives'
import MarketingLayout from '@/components/layouts/MarketingLayout'
import { events } from '@/data/global'
import { EventStruct } from '@/utils/interfaces'
import { NextPage } from 'next'
import { useParams } from 'next/navigation'

const Page: NextPage = () => {
  const params = useParams()
  const slug = params?.slug as string | undefined // ✅ Type casting

  const event = events.find((event: EventStruct) => event.slug == slug)

  return (
    <MarketingLayout>
      <div className="max-w-full mx-auto px-4 md:px-10 py-10 bg-white dark:bg-gray-900 ">
        <EventHeader event={event!} />
        <EventImage event={event!} />
        <EventDetails event={event!} />
        <EventObjectives event={event!} />
        <EventConnect event={event!} />
      </div>
    </MarketingLayout>
  )
}

export default Page
