import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <div 
      className={`text-3xl font-bold cursor-pointer ${className}`}
    >
      <span className="font-black">Even</span>Ture
    </div>
  );
};

export default Logo;
