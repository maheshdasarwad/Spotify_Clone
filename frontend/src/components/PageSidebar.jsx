import React from "react";

const PageSidebar = () => {
  return (
    <div className="bg-[#121212] w-85 h-118 rounded-xl ml-2 mt-17 text-white">
      {/* Library Option */}
      <div className="flex items-center mt-8 opacity-70 rounded-lg px-6">

        <div className="flex items-center">
          <img src="/library.png" alt="library" className="h-6 w-6 mr-4" />
          <span className="font-semibold">Your Library</span>
        </div>

        <div className="ml-auto flex items-center opacity-60">
          <img src="/plus.png" alt="add" className="h-10 w-10 hover:opacity-100 cursor-pointer" />
        </div>

      </div>

      {/* Library Boxes */}
      <div className="rounded-3xl pt-10 px-2">

        {/* Box 1 */}
        <div className="bg-[#232323] h-39 rounded-xl p-4 pt-6 space-y-4">
            <p className="text-base font-bold">Create your first playlist</p>

            <p className="font-semibold text-sm opacity-70">
                It's easy, we'll help you
            </p>

            <button className="bg-white mt-3 align-middle cursor-pointer text-black text-[15px] font-semibold rounded-full px-4 py-1 w-fit">
                Create playlist
            </button>
        </div>

        {/* Box 2 */}
        <div className="bg-[#232323] h-39 rounded-xl p-4 pt-6 space-y-4 mt-6">
            <p className="text-base font-bold">Lets find some podcast to follow</p>

            <p className="font-semibold text-sm opacity-70">
                We'll keep you updated on new episodes
            </p>

            <button className="bg-white mt-3 align-middle cursor-pointer text-black text-[15px] font-semibold rounded-full px-4 py-1 w-fit">
                Browse podcasts
            </button>
        </div>

      </div>
    </div>
  );
};

export default PageSidebar;