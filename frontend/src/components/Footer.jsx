const Footer = () => {
  return (
    <div className="mt-16 border-t border-gray-800 pt-10 pb-6">

      <div className="grid grid-cols-5 gap-8 text-sm text-gray-400">

        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <p>About</p>
          <p>Jobs</p>
          <p>For the Record</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Communities</h3>
          <p>For Artists</p>
          <p>Developers</p>
          <p>Advertising</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Useful Links</h3>
          <p>Support</p>
          <p>Free Mobile App</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Spotify Plans</h3>
          <p>Premium</p>
          <p>Individual</p>
          <p>Family</p>
        </div>

        <div className="flex gap-3">
          <div className="w-10 h-10 bg-[#222] rounded-full flex items-center justify-center">IG</div>
          <div className="w-10 h-10 bg-[#222] rounded-full flex items-center justify-center">TW</div>
          <div className="w-10 h-10 bg-[#222] rounded-full flex items-center justify-center">FB</div>
        </div>

      </div>

      <p className="text-gray-500 text-sm mt-10">
        © 2025 Spotify AB
      </p>

    </div>
  );
};

export default Footer;