
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const features = [
    {
      icon: "🔐",
      title: "Secure JWT Authentication",
      description: "Advanced user and admin authentication with JWT tokens ensuring your data stays protected and access is controlled.",
      color: "from-excellytics-green-500 to-excellytics-green-600"
    },
    {
      icon: "📊",
      title: "Excel File Processing",
      description: "Upload and process .xls and .xlsx files seamlessly with intelligent parsing and data structure recognition.",
      color: "from-excellytics-blue-500 to-excellytics-blue-600"
    },
    {
      icon: "🎯",
      title: "Dynamic Column Mapping",
      description: "Intuitive interface for selecting X and Y axes with smart suggestions based on your data types and patterns.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "📈",
      title: "Interactive 2D/3D Charts",
      description: "Generate stunning visualizations including bar charts, line graphs, pie charts, scatter plots, and 3D representations.",
      color: "from-excellytics-green-500 to-excellytics-blue-500"
    },
    {
      icon: "💾",
      title: "Export & Download",
      description: "Save your charts as high-quality PNG or PDF files for presentations, reports, and sharing with stakeholders.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "🤖",
      title: "AI-Powered Insights",
      description: "Get intelligent summaries and insights from your data with our advanced AI analysis and trend detection.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: "📋",
      title: "Dashboard & History",
      description: "Personal dashboard with visualization history, project management, and quick access to your recent charts.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: "⚡",
      title: "Real-time Processing",
      description: "Lightning-fast data processing and chart generation with real-time preview as you configure your visualizations.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Enhanced Background Graphics */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-excellytics-green-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 bg-excellytics-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-excellytics-green-200/5 to-excellytics-blue-200/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-excellytics-green-100 to-excellytics-blue-100 dark:from-excellytics-green-900/30 dark:to-excellytics-blue-900/30 rounded-full border border-excellytics-green-200 dark:border-excellytics-green-700 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-medium text-excellytics-green-700 dark:text-excellytics-green-300">
              🚀 Powerful Features
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Everything You Need</span>
            <br />
            <span className="text-gray-800 dark:text-white">for Data Visualization</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Professional-grade tools and AI-powered insights to transform your Excel data 
            into stunning, interactive visualizations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-excellytics-green-200 dark:hover:border-excellytics-green-800 overflow-hidden"
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              {/* Animated Background */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-2xl`}
                initial={false}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating Icon */}
              <motion.div 
                className="relative z-10 mb-4"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-50 dark:bg-gray-700 rounded-xl group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors duration-200 shadow-sm">
                  <motion.span
                    animate={{ 
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    {feature.icon}
                  </motion.span>
                </div>
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-excellytics-green-600 dark:group-hover:text-excellytics-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Particles */}
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-excellytics-green-400 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            { number: '10K+', label: 'Files Processed', icon: '📄' },
            { number: '50K+', label: 'Charts Created', icon: '📊' },
            { number: '99.9%', label: 'Uptime', icon: '⚡' },
            { number: '24/7', label: 'Support', icon: '🛟' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-excellytics-green-600 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
