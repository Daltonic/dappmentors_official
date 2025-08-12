import Image from 'next/image';

const images = [
  { src: '/images/home/Content(12).png', alt: 'Image 1', className: 'h-48' }, // Left side image 1
  { src: '/images/home/EmpowerSection.jpeg', alt: 'Image 2', className: 'h-48' }, // Left side image 2
  { src: '/images/home/Content(13).png', alt: 'Image 3', className: 'h-64' }, // Middle image 1 (taller)
  { src: '/images/home/Content(14).png', alt: 'Image 4', className: 'h-64' }, // Middle image 2 (taller)
  { src: '/images/home/Content(14).png', alt: 'Image 4', className: 'h-64' }, // Middle image 2 (taller)
  { src: '/images/home/Content(14).png', alt: 'Image 4', className: 'h-64' }, // Middle image 2 (taller)
  { src: '/images/home/Content(16).png', alt: 'Image 5', className: 'h-48' }, // Right side image 1
  { src: '/images/home/Content(17).png', alt: 'Image 6', className: 'h-48' }, // Right side image 2
  // Add more images as needed
];

export default function GalleryPeek() {
  return (
    <div className='max-w-screen-xl p-4 mx-auto'>     
      <main className="p-4 md:py-[96px] lg:py-[50px]">
        <h1 className="text-[10px] text-[#D2145A] text-center font-bold mb-4">GALLERY PEEK</h1>
        <h1 className="text-2xl text-center font-bold mb-4">Activity in Frame</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Left side images with margin-top */}
          <div className="flex flex-col gap-4 w-full sm:w-1/4 md:py-14"> {/* Added mt-8 for margin-top */}
            <div className="relative h-48">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg ${images[0].className}`}
              />
            </div>
            <div className="relative h-48">
              <Image
                src={images[1].src}
                alt={images[1].alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg ${images[1].className}`}
              />
            </div>
          </div>

          {/* Middle images (taller) */}
          <div className="flex flex-col gap-4 w-full sm:w-1/4">
            <div className="relative h-64">
              <Image
                src={images[2].src}
                alt={images[2].alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg ${images[2].className}`}
              />
            </div>
            <div className="relative h-64">
              <Image
                src={images[3].src}
                alt={images[3].alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg ${images[3].className}`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-1/4">
            <div className="relative h-64">
              <Image
                src={images[3].src}
                alt={images[3].alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg ${images[2].className}`}
              />
            </div>
            <div className="relative h-64">
              <Image
                src={images[4].src}
                alt={images[4].alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg ${images[3].className}`}
              />
            </div>
          </div>

          {/* Right side images with margin-top */}
          <div className="flex flex-col gap-4 w-full sm:w-1/4 md:py-14"> {/* Added mt-8 for margin-top */}
            <div className="relative h-48">
              <Image
                src={images[5].src}
                alt={images[5].alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg ${images[4].className}`}
              />
            </div>
            <div className="relative h-48">
              <Image
                src={images[6].src}
                alt={images[6].alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg ${images[5].className}`}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}