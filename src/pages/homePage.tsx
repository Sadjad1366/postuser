// HomePage.tsx
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white relative overflow-hidden">
      <div className="absolute bottom-0 w-full h-[200px] flex justify-center items-end animate-wave">
        <div className="w-[200px] h-[100px] bg-white rounded-full"></div>
      </div>
      <h1 className="text-6xl font-bold mb-8">Welcome to My App</h1>
      <p className="text-2xl text-center mb-12">
        Discover amazing features and explore the world of possibilities!
      </p>
      <div className="flex gap-8">
        <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
          Get Started
        </button>
        <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HomePage;
