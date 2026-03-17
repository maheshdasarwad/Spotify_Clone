import React from 'react';
import { GrHomeRounded } from "react-icons/gr";


const PageHead = () => {
  return (
    <div className="bg-black fixed w-full h-14 flex items-center p-8 z-50">

      {/* Logo */}
      <div>
        <img title='spotify' src="./assets/logo2.png" height="60" width="60" alt="logo" />
      </div>
    
      {/* Home Icon */}
      <div className="bg-[#232323] ml-10 -mr-20 p-3 rounded-full
                      flex items-center justify-center cursor-pointer
                      hover:bg-[#2a2a2a] transition-colors">
        <a href='/'>
          
          <GrHomeRounded 
          className="text-gray-300 text-2xl cursor-pointer group-hover:text-white transition-colors"
        />
        </a>
        <span className="absolute top-10 left-1/2 -translate-x-1/2 
                          bg-[#212121] text-white text-xs px-2 py-1 rounded
                          opacity-0 group-hover:opacity-100">
            Home
        </span>
        
      </div>

      <div className="relative w-80 ml-24">

        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 group cursor-pointer">
          <img src="/search.png" className="w-6 h-6 opacity-70"/>

          <span className="absolute top-10 left-1/2 -translate-x-1/2 
                          bg-[#212121] text-white text-xs px-2 py-1 rounded
                          opacity-0 group-hover:opacity-100">
            Search
          </span>
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="What do you want to play?"
          className="bg-[#232323] rounded-full h-11 w-full pl-11 pr-16
                    font-medium text-white border-none outline-none
                    placeholder:text-gray-400"
        />

        {/* Divider */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 h-6 w-[1px] bg-gray-500"></div>

        {/* Browse Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 group cursor-pointer">
          <img src="/browser.png" className="w-7 h-7" />

          <span className="absolute top-10 left-1/2 -translate-x-1/2 
                          bg-[#212121] text-white text-xs px-2 py-1 rounded
                          opacity-0 group-hover:opacity-100">
            Browser
          </span>
        </div>

      </div>

      {/* Navigation Links */}
      <div className="flex ml-16 mt-1">
        <a href="#" className="text-gray-400 px-1.5 font-bold hover:text-white transition">Premium</a>
        <a href="#" className="text-gray-400 px-1.5 font-bold hover:text-white transition">Support</a>
        <a href="#" className="text-gray-400 px-1.5 font-bold hover:text-white transition">Download</a>
      </div>

      {/* Divider Line */}
      <div className="-ml-6 mt-1">
        <img src="line.png" className="h-6 w-20" alt="divider" />
      </div>

      {/* Install App */}
      <div className="text-gray-400 pl-8
                     bg-[url('download.png')] bg-no-repeat bg-[length:30px_30px] bg-left">
        <a href="#" className="font-semibold text-gray-400 relative  hover:text-white hover:underline">Install App</a>
      </div>

      {/* Login Section */}
      <div className="flex items-center ml-10 text-base font-bold">
        <a href="#" className="text-gray-400 pr-4 hover:text-white transition">Sign up</a>
        <button className="text-black h-11 w-24 text-base font-bold bg-white rounded-full 
                         hover:scale-105 transition-transform">
          Log in
        </button>
      </div>
    </div>
  );
};

export default PageHead
