import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand and Description */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Eventure</h2>
          <p className="text-gray-400">
            Eventor is your one-stop solution for creating and managing events with ease. From catering to venue sourcing, we have you covered.
          </p>
        </div>
        
        {/* Navigation Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-500">Home</a></li>
            <li><a href="/about-us" className="hover:text-yellow-500">About Us</a></li>
            <li><a href="/contact" className="hover:text-yellow-500">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-500">Facebook</a></li>
            <li><a href="#" className="hover:text-yellow-500">Instagram</a></li>
            <li><a href="#" className="hover:text-yellow-500">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center text-gray-600">
        <p>&copy; 2024 Eventure. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
