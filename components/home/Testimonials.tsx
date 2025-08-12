import Button from '../shared/Button'
import { IoChevronBack } from 'react-icons/io5'
import { IoIosArrowForward } from 'react-icons/io'

export default function Testimonials() {
  return (
    <div className="min-h-fit flex flex-col justify-center items-center px-5 py-10 lg:px-20 lg:py-16">
      <div
        className="max-w-screen-xl p-4 mx-auto lg:h-[400px] shadow-lg rounded-lg text-center bg-cover bg-center flex justify-center items-center py-10 md:px-16"
        style={{ backgroundImage: "url('/images/home/content(8).jpeg')" }}
      >
        {/* Text Section with Buttons */}
        <div className="flex items-center justify-center w-full space-x-4 lg:space-x-8">
          {/* Left Button */}
          <Button
            icon={<IoChevronBack />}
            className="bg-[#211464] rounded-full p-3 lg:p-4 text-white
            transition-colors duration-500 hover:bg-[#D2145A] font-bold
            text-[20px] shadow-lg hover:shadow-xl hidden md:block"
          />

          {/* Text Section */}
          <div className="p-6 bg-[#FFEFF5] dark:bg-black w-full max-w-[720px] mx-4 lg:mx-0 rounded-xl shadow-md px-5 sm:px-10 md:px-16">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
              Lorem ipsum dolor sit amet consectetur. Tellus nec vehicula magna
              velit et.
            </h1>
            <p className="text-[12px] mb-4 text-[#D2145A]">
              Mike Johnson - Project Advocate
            </p>
            {/* <div className="text-right">
              <p className="text-sm text-gray-500">Mike Johnson</p>
              <p className="text-sm text-gray-400">Project Advocate</p>
            </div> */}
          </div>

          {/* Right Button */}
          <Button
            icon={<IoIosArrowForward />}
            className="bg-[#211464] rounded-full p-3 lg:p-4 text-white transition-colors duration-500 hover:bg-[#D2145A] font-bold text-[20px] shadow-lg hover:shadow-xl hidden md:block"
          />
        </div>
      </div>
    </div>
  )
}
