
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = [
    { icon: '📊', size: 'w-8 h-8', position: 'top-20 left-10', delay: 0 },
    { icon: '📈', size: 'w-6 h-6', position: 'top-40 right-20', delay: 0.5 },
    { icon: '💡', size: 'w-7 h-7', position: 'bottom-40 left-20', delay: 1 },
    { icon: '🎯', size: 'w-5 h-5', position: 'top-60 left-1/3', delay: 1.5 },
    { icon: '⚡', size: 'w-6 h-6', position: 'bottom-60 right-10', delay: 2 },
    { icon: '🔥', size: 'w-7 h-7', position: 'top-80 right-1/3', delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.position} bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-lg shadow-lg border border-white/20`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -20, -40, -60],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}
      
      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-12 h-12 border-2 border-excellytics-green-300 dark:border-excellytics-green-600"
        animate={{ 
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-gradient-to-br from-excellytics-blue-300 to-excellytics-blue-500 rounded-full opacity-60"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default FloatingElements;
