import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-white text-lg font-bold">Sportopia</h1>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="text-white hover:text-slate">Home</a>
        <a href="#" className="text-white hover:text-slate">Instructors</a>
        <a href="#" className="text-white hover:text-slate">Class</a>
        <a href="#" className="text-white hover:text-slate">Dashboard</a>
      </div>

      <div className="flex items-center">
        <button
          className="text-white hover:text-slate mr-4 md:hidden"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <button className="bg-sky text-black px-4 py-2 rounded-md">
          Logout
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black mt-2 py-2 px-4">
          <a href="#" className="block text-white py-2">Home</a>
          <a href="#" className="block text-white py-2">Instructors</a>
          <a href="#" className="block text-white py-2">Class</a>
          <a href="#" className="block text-white py-2">Dashboard</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
