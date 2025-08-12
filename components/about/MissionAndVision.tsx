import Image from "next/image";
import { MdOutlineArrowBackIos } from "react-icons/md";

export default function MissionAndVision() {
  return (
    <div className="min-h-fit max-w-screen-xl p-4 mx-auto flex items-center justify-center md:p-8">
      <div className="w-full">
        {/* Heading Section */}
        <div className="text-center flex justify-center items-center mb-4 lg:w-2/2">
          <h1 className="text-2xl md:text-4xl text-center font-bold">
            Mission and Vision: Nurturing Compassion, Transforming Lives
          </h1>
        </div>


        {/* Flex Container for Image and Text */}
        <div className="flex flex-col lg:flex-row lg:space-x-8 mt-6">
          {/* Image Section (On the Left in Desktop View) */}
          <div className="relative w-full lg:w-1/2 h-[300px] md:h-96 rounded-lg overflow-hidden">
            <Image
              src="/images/home/Content(20).png" // Replace with your image path
              alt="Mission and Vision"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Text Content (On the Right in Desktop View) */}
          <div className="flex-1 space-y-6 mt-6 lg:mt-0">
            <p className="text-gray-700 dark:text-gray-500 text-lg">
              The goal is to empower communities with technology, education, and
              innovation, ensuring equal opportunities for learning, growth, and
              success in a tech-driven future.
            </p>

            {/* Compassion Section */}
            <div className="space-y-4">
              <div className="flex space-x-4 items-center">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#211464] font-semibold dark:bg-white dark:text-black text-white">
                  <MdOutlineArrowBackIos />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-[#211464] dark:text-white">
                  Compassion as a Catalyst
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-500 ml-16">
                At the core of our mission is a deep well of compassion. We
                believe in the inherent goodness of humanity and the power of
                kindness to create meaningful, lasting change.
              </p>
            </div>

            {/* Empowering Communities Section */}
            <div className="space-y-4">
              <div className="flex space-x-4 items-center">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#211464] dark:bg-white dark:text-black font-semibold text-white">
                  <MdOutlineArrowBackIos />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-[#211464] dark:text-white">
                  Empowering Communities
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-500 ml-16">
                We invest in education, healthcare, economic development, and
                environmental sustainability, striving to create self-reliant
                and resilient communities that can shape their own destinies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}