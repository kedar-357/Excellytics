
import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = ({ onMenuToggle }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu toggle for mobile */}
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Right side - Actions and user */}
        <div className="flex items-center space-x-4">
          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <Link to="/profile" title="Profile">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-green-500 transition">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
