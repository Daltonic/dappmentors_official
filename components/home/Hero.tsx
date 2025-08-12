import React from 'react'
import Header from './Header'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
import { GoDotFill } from 'react-icons/go'
import Button from '../shared/Button'
import HeaderTransformer from './HeaderTransformer'

const Hero: React.FC = () => {
  return (
    <div className="relative bg-[url('/images/home/dmf.jpeg')] bg-cover bg-center dark:bg-dark">
      <div className="absolute inset-0 bg-gradient-to-r from-[#211464] via-[#06011D] to-[#06011D] opacity-50 dark:from-[#100A30] dark:via-[#040015] dark:to-[#040015]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#06011D] to-transparent opacity-50 dark:from-[#040015] dark:to-transparent"></div>

      <div className="relative">
        <Header />
        <HeaderTransformer />

        <div className="max-w-screen-xl mx-auto h-fit md:px-8 pt-[64px] pb-[12px]  gap-[32px] text-white">
          <div className="w-full h-fit px-10 md:px-0">
            <div className="w-[375px] md:w-fit h-fit pt-[24px] pb-[64px]">
              <div className="w-[327px] md:w-[560px] h-fit">
                <div className="flex items-center gap-[10px] font-semibold text-[#FFBAD4]">
                  <small>Empowering childrens future</small>
                  <div className="border w-[40px] border-[#FFBAD4] mt-1"></div>
                </div>

                <h1 className="font-cambo font-normal text-[33px] leading-[40.39px] tracking-[-0.02em] space-y-[60px] font-cambo md:text-[56px] md:leading-[62.83px] mt-2">
                  DMF – Empowering the Next Generation Through Technology
                </h1>

                <div className="text-[#ECECEC] mt-4 font-inter font-normal text-[18px] leading-[28px] space-y-[18px] mb-14">
                  <small>
                    Bridging the Digital Divide and Cultivating Future Leaders.
                  </small>
                </div>

                <Button
                  className="w-[142px] h-[56px] rounded-[8px] pt-[16px] pr-[24px] pb-[16px] pl-[24px] gap-[51px] bg-[#D2145A] hover:bg-white hover:text-[#D2145A] "
                  label="Donate Now"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto hidden md:flex justify-between items-center">
          <div className="flex">
            <div className="bg-white dark:bg-black w-3/5 h-52 py-6 px-10 space-y-4">
              <h1 className="font-cambo font-normal text-[20px] md:text-[32px] leading-[22.44px] md:leading-[35.9px] tracking-[-0.02em]">
                01. Empowering the Next Generation Through Technology
              </h1>

              <div className="font-inter font-normal text-[14px] md:text-[17px] text-[#4C4C4C]">
                <small>
                  Bridging the Digital Divide and Cultivating Future Leaders
                </small>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center h-52 w-[96px]">
              <button className="bg-[#D2145A] hover:bg-white  dark:bg-[#232323] w-full h-full flex justify-center text-white hover:text-[#D2145A] transition-colors duration-500 items-center">
                <MdOutlineArrowForwardIos className=" text-[24px]" />
              </button>
              <button className="bg-[#E72A70] dark:bg-[#1A1A1A] w-full h-full flex justify-center items-center ">
                <MdOutlineArrowBackIos className="text-white text-[24px]" />
              </button>
            </div>
          </div>

          <div className="flex pr-10">
            <GoDotFill className="text-[#D2145A] text-[14px]" />
            <GoDotFill className="text-white text-[14px]" />
            <GoDotFill className="text-white text-[14px]" />
            <GoDotFill className="text-white text-[14px]" />
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto md:hidden flex flex-col-reverse
        justify-between items-start">
          <div className="flex">
            <div className="bg-white dark:bg-black w-full py-6 px-10 space-y-4">
              <h1 className="font-cambo font-normal text-[20px] md:text-[32px] leading-[22.44px] md:leading-[35.9px] tracking-[-0.02em]">
                01. Empowering the Next Generation Through Technology
              </h1>

              <div className="font-inter font-normal text-[14px] md:text-[17px] text-[#4C4C4C]">
                <small>
                  Bridging the Digital Divide and Cultivating Future Leaders
                </small>
              </div>
            </div>
          </div>

          <div className="flex pl-10 mb-10">
            <GoDotFill className="text-[#D2145A] text-[14px]" />
            <GoDotFill className="text-white text-[14px]" />
            <GoDotFill className="text-white text-[14px]" />
            <GoDotFill className="text-white text-[14px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
