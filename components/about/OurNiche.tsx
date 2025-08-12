import React from "react";

export default function OurNiche() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:px-8">
      <div className="max-w-screen-xl w-full">
        {/* Heading Section */}
        <div className="text-center">
          <h3 className="text-xs font-semibold tracking-widest text-[#D2145A]">
            OUR NICHE
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            We stand at the intersection of <br /> technology and social impact:
          </h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Web3 Events" },
            { title: "Computer Gadget Donations" },
            { title: "Online Mentorship" },
            { title: "Hackathon Competitions" },
            { title: "Grants Disbursal" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-lg text-[#211464] dark:text-white bg-gray-100 dark:bg-transparent"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur. Dictum ac enim
                pellentesque donec mauris tincidunt purus gravida. Iaculis et
                lectus at diam adipiscing. Urna risus ac commodo diam.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
