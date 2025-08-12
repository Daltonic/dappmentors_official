import React from "react";

export default function MakeDonationsPage() {
  return (
    <div className="w-full min-h-fit flex justify-center items-center">
      <div className="h-fit flex flex-col items-center justify-center w-full max-w-3xl space-y-2 text-center">
        <h3 className="text-[12px] font-semibold text-[#D2145A] tracking-[2px]">
          Make Donations
        </h3>
        <h1 className="font-semibold tracking-[2px] text-2xl">
          Donate for Cause
        </h1>
        <p className="text-[13px] dark:text-gray-400 font-inter tracking-[1px]">
          Growing up in poverty, children face tough challenges: hunger and
          malnutrition, limited access to education.
        </p>
      </div>
    </div>

    // <div className="h-48 w-full relative">
    //   <Image
    //     objectFit="cover"
    //     layout="fill"
    //     alt="DonatePageHeaderImage"
    //     src="/images/donate/Section.png"
    //   />
    // </div>
  );
}
