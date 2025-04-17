import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

function MainFooter() {
  return (
    <footer className="w-full bg-black text-gray-400 py-10 px-6 mt-40">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Footer Links + Icons */}
        <div className="flex flex-col space-y-6 border-t border-gray-700 pt-8">
          {/* Social Icons - מיושרים לפי הקו של הלינקים */}
          <div className="flex gap-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2 rounded-full hover:bg-[#1877F2] transition"
            >
              <FaFacebook className="text-white text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2 rounded-full hover:bg-[#E1306C] transition"
            >
              <FaInstagram className="text-white text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2 rounded-full hover:bg-[#1DA1F2] transition"
            >
              <FaTwitter className="text-white text-xl" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2 rounded-full hover:bg-[#FF0000] transition"
            >
              <FaYoutube className="text-white text-xl" />
            </a>
          </div>

          {/* Grid of Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Column 1 */}
            <div className="flex flex-col gap-3 text-sm text-left">
              <Link to="/" className="hover:text-white">
                Audio Description
              </Link>
              <Link to="/" className="hover:text-white">
                Investor Relations
              </Link>
              <Link to="/" className="hover:text-white">
                Privacy
              </Link>
              <Link to="/" className="hover:text-white">
                Contact Us
              </Link>

              <div className="mt-6 border border-gray-500 text-center py-2 w-36 text-sm cursor-pointer hover:border-white transition">
                Service Code
              </div>
              <div className="text-xs mt-4">© 1997 - 2024 Netflix, Inc.</div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3 text-sm text-left">
              <Link to="/" className="hover:text-white">
                Help Center
              </Link>
              <Link to="/" className="hover:text-white">
                Jobs
              </Link>
              <Link to="/" className="hover:text-white">
                Legal Notices
              </Link>
              <Link to="/" className="hover:text-white">
                Do not sell my
                <div>personal information</div>
              </Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3 text-sm text-left">
              <Link to="/" className="hover:text-white">
                Gift Cards
              </Link>
              <Link to="/" className="hover:text-white">
                Netflix Shop
              </Link>
              <Link to="/" className="hover:text-white">
                Cookie Preferences
              </Link>
              <Link to="/" className="hover:text-white">
                Ad Choices
              </Link>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-3 text-sm text-left">
              <Link to="/" className="hover:text-white">
                Media Center
              </Link>
              <Link to="/" className="hover:text-white">
                Terms of Use
              </Link>
              <Link to="/" className="hover:text-white">
                Corporate Information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
