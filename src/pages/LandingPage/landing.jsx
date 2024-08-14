import React from 'react';
import Header from './Header';
import Body from './Body';
import Services from './Services';
import Footer from './Footer';



const LandingPage = () => {
  return (
    <div>
      <Header />
      <Body />
      <Services />
      <Footer />
      {/* Add more sections as needed */}
    </div>
  );
};

export default LandingPage;
