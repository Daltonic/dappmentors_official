import { RecentBlogPageStruct } from '@/utils/interfaces';
import Image from 'next/image';
import React from 'react'

const RecentBlogPostImage: React.FC<{ recent: RecentBlogPageStruct }> = ({
  recent,
}) => {
  return (
    <div className="relative w-full h-[180px] md:h-[280px] lg:h-[360px] mt-4"> {/* Adjust height as needed */}
          <Image
            src={recent.image}
            alt={recent.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
  );
};


export default RecentBlogPostImage;