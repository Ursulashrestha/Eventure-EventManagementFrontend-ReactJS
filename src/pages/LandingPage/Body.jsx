import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import eventImage from '../../assets/event-illustration.jpg'; 

const Body = () => {
  return (
    <section className="bg-white py-10 md:py-20">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Create Beautiful <span className="text-blue-600">Memories</span><br /> At Every Event
          </h1>
          <p className="text-gray-600 mb-8">
            Watch your visions of the perfect event come to life with Eventure. From meticulous planning, we ensure your event gets everything it needs with top priority.
          </p>
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-full hover:bg-yellow-600 transition duration-300 flex items-center justify-center mx-auto md:mx-0 w-full md:w-auto max-w-xs md:max-w-none">
            <span>Create Event</span>
            <FiArrowRight className="ml-2" />
          </button>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src={eventImage} alt="Event Management" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};

export default Body;
