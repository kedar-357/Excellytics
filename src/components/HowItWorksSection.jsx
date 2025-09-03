
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const steps = [
    {
      number: "01",
      title: "Upload Excel File",
      description: "Simply drag and drop your .xls or .xlsx file into our secure upload area. We support files up to 50MB.",
      icon: "📄",
      color: "from-excellytics-green-500 to-excellytics-green-600"
    },
    {
      number: "02", 
      title: "Parse & Preview Data",
      description: "Our intelligent parser automatically detects columns, data types, and structure. Preview your data before visualization.",
      icon: "🔍",
      color: "from-excellytics-blue-500 to-excellytics-blue-600"
    },
    {
      number: "03",
      title: "Select Axes & Chart Type", 
      description: "Choose X and Y axes from your columns with smart suggestions. Select from bar, line, pie, scatter, or 3D charts.",
      icon: "🎯",
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "04",
      title: "Generate Visualization",
      description: "Watch as your data transforms into beautiful, interactive charts with smooth animations and professional styling.",
      icon: "✨",
      color: "from-pink-500 to-rose-500"
    },
    {
      number: "05",
      title: "Customize & Export",
      description: "Fine-tune colors, labels, and styling. Export as high-quality PNG or PDF for presentations and reports.",
      icon: "💾",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-10 w-32 h-32 bg-excellytics-green-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-40 h-40 bg-excellytics-blue-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            x: [0, -30, 0],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 3 }}
        />
        
        {/* Connecting Line Graphics */}
        <motion.div
          className="absolute left-1/2 top-1/4 w-1 h-1/2 bg-gradient-to-b from-excellytics-green-300/20 to-excellytics-blue-300/20"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 2, delay: 1 }}
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
            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-excellytics-green-200 dark:border-excellytics-green-700 mb-6 shadow-sm"
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(34, 197, 94, 0)",
                "0 0 0 10px rgba(34, 197, 94, 0.1)",
                "0 0 0 0 rgba(34, 197, 94, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span 
              className="text-sm font-medium text-excellytics-green-700 dark:text-excellytics-green-300"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⚡ Simple Process
            </motion.span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-800 dark:text-white">How</span>
            <span className="gradient-text"> Excellytics </span>
            <span className="text-gray-800 dark:text-white">Works</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transform your Excel data into stunning visualizations in just 5 simple steps. 
            Our intuitive process makes data visualization accessible to everyone.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Enhanced Connecting Line */}
            <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-excellytics-green-500 via-excellytics-blue-500 to-purple-500 hidden lg:block">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-excellytics-green-500 via-excellytics-blue-500 to-purple-500 origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </div>

            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex items-start mb-8 last:mb-0"
              >
                {/* Enhanced Step Number Circle */}
                <div className="flex-shrink-0 relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-white dark:border-gray-900`}
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(34, 197, 94, 0.4)",
                        "0 0 0 20px rgba(34, 197, 94, 0)",
                        "0 0 0 0 rgba(34, 197, 94, 0)"
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {step.number}
                  </motion.div>
                </div>

                {/* Enhanced Content */}
                <div className="ml-8 flex-1">
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group relative overflow-hidden"
                    whileHover={{ y: -4 }}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-2xl`}
                      initial={false}
                      whileHover={{ opacity: 0.1 }}
                    />

                    <div className="flex items-start relative z-10">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <motion.span 
                            className="text-3xl mr-4"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.5
                            }}
                          >
                            {step.icon}
                          </motion.span>
                          <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white group-hover:text-excellytics-green-600 dark:group-hover:text-excellytics-green-400 transition-colors">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-excellytics-green-400 to-excellytics-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '100%' } : { width: 0 }}
                      transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-12"
        >
          <motion.button
            className="group px-8 py-4 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              initial={false}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10 flex items-center justify-center">
              Try It Now - It's Free!
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🚀
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
