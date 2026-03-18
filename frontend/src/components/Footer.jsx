import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-16 border-t border-gray-800 pt-10 pb-6">

      <div className="grid grid-cols-5 gap-8 text-sm text-gray-400">

        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <a href="#">About</a>
          <a href="#">Jobs</a>
          <a href="#">For the Record</a>
        </div>

        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-3">
           Communities
          </h3>
            <a href="#">For Artists</a>
            <a href="#">Developers</a>
            <a href="#">Advertising</a>
        </div>

        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-3">
            Useful Links
          </h3>
          <a href="#">Support</a>
          <a href="#">Free Mobile App</a>
          <a href="#">Advertising</a>
        </div>

        <div className="flex flex-col">
          <h3 className="text-white font-semibold mb-3">
            Spotify Plans
          </h3>
          <a href="#">Premium</a>
          <a href="#">Individual</a>
          <a href="#">Family</a>
        </div>

        <div className="flex gap-3">
          <a href="#" className="w-10 h-10 text-xl bg-[#222] rounded-full flex items-center justify-center"><FaInstagram /></a>        
          <a href="#" className="w-10 h-10 text-xl bg-[#222] rounded-full flex items-center justify-center"><FaTwitter /></a>        
          <a href="#" className="w-10 h-10 text-xl bg-[#222] rounded-full flex items-center justify-center"><FaFacebook /></a>
        </div>

      </div>

      <p className="text-gray-500 text-sm mt-10">
        © 2025 Spotify MBD
      </p>

    </div>
  );
};

export default Footer;
