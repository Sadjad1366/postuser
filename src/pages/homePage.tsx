import React from "react";

const HomePage: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
      bg-[linear-gradient(to_right,rgba(96,165,250,0.7),rgba(139,92,246,0.7)),url('https://i.tribune.com.pk/media/images/1616036-cover_playbuzz-1516703815/1616036-cover_playbuzz-1516703815.jpg')]
      bg-center bg-cover text-white relative overflow-hidden"
    >
      {/* Optional overlay to darken the background for better contrast */}
      <div className="absolute bg-black opacity-10 pointer-events-none"></div>

      <div className="relative z-10 -top-60">
        <h1 className="text-6xl font-bold mb-8">Welcome to My Gamble App</h1>
        <p className="text-2xl text-center mb-12">
          "If You're Good at Something Never Do That for Free"
        </p>
        <div className="flex justify-center gap-8">
          <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
            Get Started
          </button>
          <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
{/*
      <div className="absolute bottom-0 w-full h-[200px] flex justify-center items-end animate-wave">
        <div className="w-[200px] h-[100px] bg-white rounded-full"></div>
      </div> */}
    </div>
  );
};

export default HomePage;
