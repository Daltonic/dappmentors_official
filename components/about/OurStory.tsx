import Image from "next/image";

export default function OurStory() {
  return (
    <div className="min-h-fit max-w-screen-xl p-4 md:p-10 mx-auto flex items-center justify-center">
      <div className="max-w-6xl space-y-6">
        <div className="text-center">
          <small className="text-sm text-[#D2145A] font-semibold">OUR STORY</small>
        </div>

        {/* Flex container for h1 and p */}
        <div className="flex flex-col justify-center md:flex-row md:space-x-6">
          <div className="sm:w-1/3">
            <h1 className="text-4xl font-bold mb-4">
              At DMF, we prioritize transparency, and inclusivity.
            </h1>
          </div>
          <div className="sm:w-1/2">
            <p className="text-gray-700 dark:text-gray-400">
              Founded with a vision to bridge the digital divide, we are a
              community-driven charity that leverages the power of technology and
              innovation to empower underserved individuals. Our journey began
              with a simple goal: to create equal opportunities for everyone in
              the tech ecosystem, regardless of their background. Over time, we
              have grown into a hub where technology, mentorship, and
              collaboration come together to transform lives.
            </p>
          </div>
        </div>

        {/* Image container */}
        <div className="relative h-60 sm:h-96 rounded-lg overflow-hidden">
          <Image
            src="/images/home/EmpowerSection.jpeg"
            alt="Our Story"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}