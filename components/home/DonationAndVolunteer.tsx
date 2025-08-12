import React from 'react'

const DonationAndVolunteer = () => {
  return (
    <div
      className="max-w-screen-xl p-4 mx-auto flex flex-col md:flex-row lg:px-32 space-x-0
      md:space-x-2 space-y-2 md:space-y-0"
    >
      {/* Make Donation Section */}
      <div
        className="w-full md:w-1/2 h-64 md:h-75 bg-cover bg-center rounded-lg flex items-center justify-center"
        style={{ backgroundImage: "url('/images/home/Content(6).png')" }} // Replace with your image path
      ></div>

      {/* Be a Volunteer Section */}
      <div
        className="w-full md:w-1/2 h-64 md:h-75 bg-cover bg-center rounded-lg flex items-center justify-center"
        style={{ backgroundImage: "url('/images/home/Content(7).png')" }} // Replace with your image path
      ></div>
    </div>
  )
}

export default DonationAndVolunteer
