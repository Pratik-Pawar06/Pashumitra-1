import React from "react";
import backgroundImg from "../assets/farm-bg.jpg"; // Replace with your image
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div
      className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center p-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Glassy overlay (lighter) */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 bg-black/40 backdrop-blur-lg rounded-2xl p-10 max-w-2xl text-center shadow-2xl">
        <h1 className="text-5xl font-bold mb-6 text-yellow-400 drop-shadow-lg">
          Welcome to Livestock Management System
        </h1>
        <p className="text-lg mb-8 text-white/90 drop-shadow-md">
          Manage your farm efficiently: track farmers, animals, vaccinations,
          and veterinary officers all in one place.
        </p>
        <button className="bg-yellow-500 text-gray-900 px-6 py-3 font-semibold rounded hover:bg-yellow-400 transition shadow-lg">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
