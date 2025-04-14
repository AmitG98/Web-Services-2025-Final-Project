import React from "react";

const MainFooter = () => {
  return (
    <footer className="w-full bg-black/80 text-white py-10 px-6 text-sm">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="mb-2">FAQ</p>
          <p>Investor Relations</p>
        </div>
        <div>
          <p className="mb-2">Help Center</p>
          <p>Jobs</p>
        </div>
        <div>
          <p className="mb-2">Terms of Use</p>
          <p>Privacy</p>
        </div>
        <div>
          <p className="mb-2">Contact Us</p>
          <p>Legal Notices</p>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-6">© 2025 StreamX</div>
    </footer>
  );
};

export default MainFooter;