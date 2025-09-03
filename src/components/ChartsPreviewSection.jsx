
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartsPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const sampleData = [
    { name: 'Jan', sales: 4000, revenue: 2400, growth: 12 },
    { name: 'Feb', sales: 3000, revenue: 1398, growth: 8 },
    { name: 'Mar', sales: 2000, revenue: 9800, growth: 15 },
    { name: 'Apr', sales: 2780, revenue: 3908, growth: 20 },
    { name: 'May', sales: 1890, revenue: 4800, growth: 18 },
    { name: 'Jun', sales: 2390, revenue: 3800, growth: 25 }
  ];

  const pieData = [
    { name: 'Desktop', value: 45, color: '#22c55e' },
    { name: 'Mobile', value: 35, color: '#3b82f6' },
    { name: 'Tablet', value: 20, color: '#a855f7' }
  ];

  const chartTypes = [
    {
      title: "Interactive Bar Charts",
      description: "Create stunning bar charts with hover effects and customizable colors",
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Bar dataKey="sales" fill="url(#greenGradient)" radius={[4, 4, 0, 0]} />
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      )
    },
    {
      title: "Dynamic Line Graphs",
      description: "Smooth line charts perfect for showing trends and time-series data",
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    {
      title: "Beautiful Pie Charts",
      description: "Colorful pie charts with animated segments and custom legends",
      component: (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      )
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
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating chart icons */}
        <motion.div
          className="absolute top-20 left-20 text-4xl opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          📊
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-20 text-3xl opacity-20"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          📈
        </motion.div>
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
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 rgba(34, 197, 94, 0.2)",
                "0 0 0 10px rgba(34, 197, 94, 0)",
                "0 0 0 0 rgba(34, 197, 94, 0.2)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span 
              className="text-sm font-medium text-excellytics-green-700 dark:text-excellytics-green-300"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              📊 Live Preview
            </motion.span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Sample Visualizations</span>
            <br />
            <span className="text-gray-800 dark:text-white">See What You Can Create</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore the variety of professional charts and graphs you can generate from your Excel data. 
            Interactive, beautiful, and ready for presentations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {chartTypes.map((chart, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-excellytics-green-200 dark:hover:border-excellytics-green-800 overflow-hidden"
                whileHover={{ y: -8 }}
              >
                {/* Chart Container with enhanced styling */}
                <div className="relative mb-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-excellytics-green-500/5 to-excellytics-blue-500/5"
                    animate={{ 
                      background: [
                        "linear-gradient(45deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05))",
                        "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))",
                        "linear-gradient(45deg, rgba(168, 85, 247, 0.05), rgba(34, 197, 94, 0.05))"
                      ]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="relative z-10">
                    {chart.component}
                  </div>
                  
                  {/* Floating elements over chart */}
                  <motion.div
                    className="absolute top-2 right-2 w-3 h-3 bg-excellytics-green-400 rounded-full opacity-60"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </div>

                {/* Enhanced Content */}
                <div className="relative">
                  <div className="flex items-center mb-3">
                    <motion.div
                      className="w-2 h-2 bg-excellytics-green-500 rounded-full mr-3"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-excellytics-green-600 dark:group-hover:text-excellytics-green-400 transition-colors">
                      {chart.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {chart.description}
                  </p>
                </div>

                {/* Enhanced Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-excellytics-green-500/10 to-excellytics-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                {/* Corner decoration */}
                <motion.div
                  className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-excellytics-green-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{ 
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Features List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '⚡', text: 'Interactive & Responsive', color: 'text-excellytics-green-500' },
              { icon: '📥', text: 'High-Quality Exports', color: 'text-excellytics-blue-500' },
              { icon: '🎨', text: 'Customizable Styling', color: 'text-purple-500' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-3 text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(34, 197, 94, 0.05)"
                }}
                animate={{ 
                  y: [0, -3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                <motion.span 
                  className="text-2xl"
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
                  {feature.icon}
                </motion.span>
                <span className="font-medium">{feature.text}</span>
                <motion.div
                  className={`w-2 h-2 ${feature.color} rounded-full`}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.4
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChartsPreviewSection;
