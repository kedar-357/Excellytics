
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section className="py-16 bg-gradient-to-br from-excellytics-green-500 via-excellytics-green-600 to-excellytics-blue-600 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 left-1/4 text-3xl text-white/30"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚀
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 right-1/4 text-2xl text-white/30"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          ⭐
        </motion.div>
      </div>
      
      {/* Enhanced Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Transform Your 
            <br />
            <motion.span 
              className="relative inline-block"
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Excel Data?
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of users who have already transformed their data analysis workflow. 
            Start creating stunning visualizations today - completely free to try!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              className="group px-8 py-4 bg-white text-excellytics-green-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden min-w-[220px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gray-50"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center">
                <motion.span
                  className="mr-2"
                  animate={{ 
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity
                  }}
                >
                  🚀
                </motion.span>
                Start Analyzing Now
                <motion.svg 
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-excellytics-green-600 transition-all duration-300 min-w-[200px] group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center">
                <motion.span
                  className="mr-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity
                  }}
                >
                  📺
                </motion.span>
                Schedule Demo
              </span>
            </motion.button>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 text-white/80 mb-12"
          >
            {[
              { icon: '✅', text: 'No credit card required' },
              { icon: '🆓', text: 'Free forever plan' },
              { icon: '⚡', text: 'Setup in 2 minutes' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2"
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {item.icon}
                </motion.span>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {[
              { number: '10K+', label: 'Charts Created', icon: '📊' },
              { number: '5K+', label: 'Happy Users', icon: '😊' },
              { number: '99.9%', label: 'Uptime', icon: '⚡' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                animate={{ 
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.4
                }}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
