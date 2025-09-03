
import ParticleBackground from './ParticleBackground';
import FloatingElements from './FloatingElements';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-excellytics-green-50 to-excellytics-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <ParticleBackground />
      <FloatingElements />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-32 relative z-10">
        {/* Left Side: Hero Text */}
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-excellytics-green-100 to-excellytics-blue-100 dark:from-excellytics-green-900/30 dark:to-excellytics-blue-900/30 rounded-full border border-excellytics-green-200 dark:border-excellytics-green-700 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-excellytics-green-500 rounded-full mr-3"
              />
              <span className="text-sm font-medium text-excellytics-green-700 dark:text-excellytics-green-300">
                Transform Excel Data into Insights
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="gradient-text">Excellytics:</span>
            <br />
            <span className="text-gray-800 dark:text-white">
              Turn Excel into 
              <motion.span
                className="inline-block ml-3 text-excellytics-green-600"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                Magic ✨
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Upload your spreadsheets and watch them transform into stunning, interactive visualizations with AI-powered insights in seconds.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 text-white font-bold rounded-full shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                initial={false}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center justify-center">
                Get Started Free
                <motion.svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-excellytics-green-400 hover:text-excellytics-green-600 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-green-500 rounded-full mr-2"
              />
              Free Forever
            </div>
            <div className="flex items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="w-3 h-3 bg-blue-500 rounded-full mr-2"
              />
              No Setup Required
            </div>
            <div className="flex items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-3 h-3 bg-purple-500 rounded-full mr-2"
              />
              Secure & Private
            </div>
          </motion.div>
        </div>

        {/* Right Side: Hero Graphic */}
        <div className="md:w-1/2 flex justify-center relative">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main Dashboard Mockup */}
            <motion.div
              className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6"
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Mock Chart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-gradient-to-r from-excellytics-green-400 to-excellytics-blue-400 rounded-full w-32"></div>
                  <div className="w-8 h-8 bg-excellytics-green-100 dark:bg-excellytics-green-900 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-excellytics-green-500 border-t-transparent rounded-full"
                    />
                  </div>
                </div>
                
                {/* Mock Bar Chart */}
                <div className="grid grid-cols-5 gap-2 h-32 items-end">
                  {[60, 80, 45, 90, 70].map((height, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-t from-excellytics-green-500 to-excellytics-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    />
                  ))}
                </div>
                
                {/* Mock Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {['📊', '📈', '🎯'].map((emoji, index) => (
                    <motion.div
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-center"
                      whileHover={{ scale: 1.05 }}
                      animate={{ 
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      <div className="text-2xl mb-1">{emoji}</div>
                      <motion.div 
                        className="h-2 bg-gradient-to-r from-excellytics-green-300 to-excellytics-blue-300 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Elements around Dashboard */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-excellytics-green-400 to-excellytics-green-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              📊
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-excellytics-blue-400 to-excellytics-blue-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg"
              animate={{ 
                rotate: [0, -10, 10, 0],
                y: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
