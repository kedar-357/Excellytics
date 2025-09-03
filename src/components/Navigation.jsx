
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">Excellytics</span>
        </Link>
        
        <div className="flex items-center justify-between">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-excellytics-green-600 transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-excellytics-green-600 transition-colors duration-200">
              How It Works
            </a>
            <a href="#charts" className="text-gray-600 hover:text-excellytics-green-600 transition-colors duration-200">
              Charts
            </a>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/signin"
                className="text-gray-600 hover:text-excellytics-green-600 transition-colors duration-200 font-medium"
              >
                Sign In
              </Link>
              
              <Link
                to="/signup"
                className="bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 hover:from-excellytics-green-600 hover:to-excellytics-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              className="text-gray-600 hover:text-excellytics-green-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 border-t border-white/20"
          >
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-excellytics-green-600 transition-colors duration-200">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-excellytics-green-600 transition-colors duration-200">
                How It Works
              </a>
              <a href="#charts" className="text-gray-600 hover:text-excellytics-green-600 transition-colors duration-200">
                Charts
              </a>
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                <Link
                  to="/signin"
                  className="text-center text-gray-600 hover:text-excellytics-green-600 transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                
                <Link
                  to="/signup"
                  className="text-center bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 hover:from-excellytics-green-600 hover:to-excellytics-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
