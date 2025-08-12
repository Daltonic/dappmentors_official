import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="p-4">
      <div className="w-full rounded-2xl bg-[#2B202D] dark:bg-[#1A1A1A] text-white py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-screen-xl p-4 mx-auto">
          {/* Newsletter Section */}
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4">
                Subscribe to our newsletter to receive updates!
              </h2>
              <p className="text-gray-300">
                Subscribe to stay informed about our new campaigns, blogs, and
                other projects.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D2145A]"
              />
              {/* <Button label="Subscribe Now" className="w-full sm:w-1/3 px-6 py-3 bg-[#D2145A] text-white rounded-lg hover:bg-[#FFBAD4] transition-colors duration-300"/> */}

              <button className="w-full sm:w-1/3 px-6 py-3 bg-[#D2145A] text-white rounded-lg hover:bg-[#FFBAD4] transition-colors duration-300">
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Footer Links Section */}
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">QUICK LINKS</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-[#D2145A]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-300 hover:text-[#D2145A]">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-gray-300 hover:text-[#D2145A]">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="text-gray-300 hover:text-[#D2145A]">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-300 hover:text-[#D2145A]">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="Volunteers" className="text-gray-300 hover:text-[#D2145A]">
                    Volunteers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-lg font-bold mb-4">POLICIES</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-[#D2145A]">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-[#D2145A]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-[#D2145A]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-lg font-bold mb-4">SOCIALS</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-[#D2145A]">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#D2145A]">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#D2145A]">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#D2145A]">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="w-full max-w-7xl mx-auto text-center border-t border-gray-800 pt-8">
            <p className="text-gray-300">DMF @ 2024. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
