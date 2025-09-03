import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-2 font-semibold">Page Not Found</p>
        <p className="text-gray-500 mb-4">Sorry, the page you are looking for doesn’t exist or has been moved.</p>
        <a href="/" className="text-blue-600 hover:text-blue-800 underline font-medium">Return to Home</a>
        <div className="mt-4">
          <a href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 underline mr-2">Go to Dashboard</a>
          <a href="/" className="text-sm text-gray-600 hover:text-blue-600 underline">Try a Search</a>
        </div>
        <div className="mt-8 text-xs text-gray-400">If you believe this is an error, please contact support.</div>
      </div>
    </div>
  );
};

export default NotFound;
