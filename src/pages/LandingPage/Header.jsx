import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Logo from '../../constants/logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleAdminClick = () => {
    navigate('/adminlogin'); 
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
      <Logo className='text-3xl font-bold text-blue-600' />

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 w-full bg-white md:w-auto md:bg-transparent shadow-lg md:shadow-none z-20`}>
          <ul className="flex flex-col md:flex-row items-center md:space-x-6 text-gray-600 py-4 md:py-0">
            <li><a href="/" onClick={handleHomeClick} className="hover:text-blue-600 block py-2 px-4 md:py-0">Home</a></li>
            <li><a href="#services" className="hover:text-blue-600 block py-2 px-4 md:py-0">About Us</a></li>
            <li><a href="#contact" className="hover:text-blue-600 block py-2 px-4 md:py-0">Contact</a></li>
          </ul>
        </nav>

        {/* Admin button */}
        <button
          onClick={handleAdminClick} // Attach the navigation function
          className="hidden md:block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Admin
        </button>
      </div>

      {/* Mobile admin button */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} px-6 py-4 bg-white`}>
        <button
          onClick={handleAdminClick} // Attach the navigation function
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Admin
        </button>
      </div>
    </header>
  );
};

export default Header;
