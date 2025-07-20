// src/pages/Landing.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center px-6">
      <motion.div
        className="max-w-3xl w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 mb-6 leading-tight">
          Connect Skills to Real Startups 🚀
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Discover meaningful startup projects where your skills matter. Build your portfolio, grow your network, and make real-world impact.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-lg hover:bg-indigo-700 transition-all duration-300"
          >
            <Rocket size={20} /> Get Started
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
