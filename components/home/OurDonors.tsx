import Image from 'next/image'

const OurDonors: React.FC = () => {
  return (
    <div className="bg-[#201A44] dark:bg-[#1A1A1A] w-full h-fit">
      <div className="max-w-screen-xl p-4 mx-auto h-[144px] pt-12 pr-8 pb-12 pl-8 gap-16 md:flex flex-col md:flex-row items-center">
        <div className="w-full md:w-[162px] h-[36px] mb-4 md:mb-0">
          <h1 className="font-cambo font-normal text-[32px] leading-[35.9px] tracking-[-0.02em] text-center text-[#FFFFFF]">
            Our Donors
          </h1>
        </div>

        <div className="h-[1px] hidden md:block md:h-[48px] w-full md:w-[1px] bg-[#FFFFFF30] mb-4 md:mb-0"></div>

        <div className=" flex-1 opacity-50 overflow-x-auto overflow-y-hidden">
          <div className=" h-[48px] mb-2 md:mb-4 lgd:mb-0 flex items-center gap-12">
            <div className="w-[146px] h-[48px] flex items-center gap-2">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/images/home/Logomark.png"
                  alt="alt"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover object-center"
                />
              </div>

              <h1 className="text-[#FFFFFF] text-[22px]">Layers</h1>
            </div>

            <div className="w-[146px] h-[48px] flex items-center gap-2">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/images/home/Logomark 1.png"
                  alt="alt"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover object-center"
                />
              </div>

              <h1 className="text-[#FFFFFF] text-[22px]">Sisyphus</h1>
            </div>

            <div className="w-[146px] h-[48px] flex items-center gap-2">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/images/home/Logomark 2.png"
                  alt="alt"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover object-center"
                />
              </div>

              <h1 className="text-[#FFFFFF] text-[22px]">Circooles</h1>
            </div>

            <div className="w-[146px] h-[48px] flex items-center gap-2">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/images/home/Logomark 3.png"
                  alt="alt"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover object-center"
                />
              </div>

              <h1 className="text-[#FFFFFF] text-[22px]">Catalog</h1>
            </div>

            <div className="w-[146px] h-[48px] flex items-center gap-2">
              <div className="relative w-[40px] h-[40px]">
                <Image
                  src="/images/home/Logomark 4.png"
                  alt="alt"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover object-center"
                />
              </div>

              <h1 className="text-[#FFFFFF] text-[22px]">Quotient</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurDonors
