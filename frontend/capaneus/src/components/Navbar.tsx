import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
      <div className="text-3xl font-semibold text-black">Capaneus</div>
      <a
        href="https://github.com/averyiorio/capaneus"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold px-6 py-2 text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
      >
        GitHub
      </a>
    </nav>
  );
};

export default Navbar;