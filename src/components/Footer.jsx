import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-white border-t border-gray-200">
      <footer className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
        {/* Left */}
        <p>© {new Date().getFullYear()} DevTinder. All rights reserved.</p>

        {/* Right */}
        <div className="flex items-center gap-4">
          <a className="hover:text-gray-700 transition cursor-pointer">
            Twitter
          </a>
          <a className="hover:text-gray-700 transition cursor-pointer">
            YouTube
          </a>
          <a className="hover:text-gray-700 transition cursor-pointer">
            Facebook
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
