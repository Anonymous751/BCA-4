import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function FooterShared() {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-8 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">BlogContent</h2>
          <p className="text-sm opacity-80">
            Share your stories, read inspiring blogs, and connect with authors around the world.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-300 transition cursor-pointer">Home</li>
            <li className="hover:text-yellow-300 transition cursor-pointer">Blogs</li>
            <li className="hover:text-yellow-300 transition cursor-pointer">Authors</li>
            <li className="hover:text-yellow-300 transition cursor-pointer">About</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <FaFacebookF className="cursor-pointer hover:text-yellow-300 transition text-xl" />
            <FaTwitter className="cursor-pointer hover:text-yellow-300 transition text-xl" />
            <FaInstagram className="cursor-pointer hover:text-yellow-300 transition text-xl" />
            <FaGithub className="cursor-pointer hover:text-yellow-300 transition text-xl" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm mt-8 opacity-75">
        © {new Date().getFullYear()} BlogContent. All rights reserved.
      </div>
    </footer>
  );
}
