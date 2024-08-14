import React from 'react';

const Services = () => {
  return (
    <section id="services" className="bg-blue-600 py-20 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Everything An Event Needs</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Task Management</h3>
              <p>Get the best resources and food for your event.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Real Time Updates</h3>
              <p>We'll book the perfect venue for your event.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Invite Participants</h3>
              <p>The final event will be a foolproof success.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
