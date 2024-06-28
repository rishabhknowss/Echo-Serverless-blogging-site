import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [glitchText, setGlitchText] = useState("ECHO");

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let newText = "";
      for (let i = 0; i < 4; i++) {
        if (Math.random() < 0.7) {
          newText += "ECHO"[i];
        } else {
          newText += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setGlitchText(newText);
    }, 100);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="text-center">
        <h1 className="font-mono text-8xl text-white mb-8 relative">
          <span className="absolute top-0 left-0 text-red-500 opacity-70 animate-pulse">{glitchText}</span>
          <span className="absolute top-0 left-0 text-blue-500 opacity-70 animate-pulse" style={{clipPath: 'inset(0 33% 0 0)'}}>{glitchText}</span>
          <span className="relative">{glitchText}</span>
        </h1>
        <p className="font-mono text-xl text-green-500 mb-12">UNLEASH YOUR DIGITAL VOICE</p>
        <div className="space-x-4">
          <button
            className="bg-transparent text-white px-8 py-3 font-mono border border-white hover:bg-white hover:text-black transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
          <button
            className="bg-white text-black px-8 py-3 font-mono hover:bg-green-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/signin")}
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};