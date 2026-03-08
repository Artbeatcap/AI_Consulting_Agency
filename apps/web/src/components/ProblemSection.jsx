
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, TrendingDown, Zap } from 'lucide-react';

const problems = [
  {
    icon: AlertCircle,
    title: 'Missed Leads',
    description: 'Potential customers slip through the cracks while you sleep or handle other tasks.',
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: Clock,
    title: 'Slow Responses',
    description: 'Hours or days to respond to inquiries while competitors reply instantly.',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    icon: TrendingDown,
    title: 'Repetitive Tasks',
    description: 'Your team wastes hours on manual data entry, follow-ups, and routine processes.',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Zap,
    title: 'Disconnected Systems',
    description: 'Tools that don\'t talk to each other, creating data silos and workflow bottlenecks.',
    color: 'from-amber-500 to-red-500'
  }
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-teal-500"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Most Businesses Are Still Running on{' '}
            <span className="text-red-600">Manual Work.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            While your competitors automate and scale, manual processes are holding you back.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-4 shadow-lg`}>
                <problem.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Transformation animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold mb-4">
                  Before
                </div>
                <div className="space-y-3">
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-white rounded-lg p-4 shadow-md border-l-4 border-red-500"
                  >
                    <p className="text-sm text-gray-700 font-medium">📧 Manual email responses</p>
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                    className="bg-white rounded-lg p-4 shadow-md border-l-4 border-orange-500"
                  >
                    <p className="text-sm text-gray-700 font-medium">📋 Spreadsheet chaos</p>
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                    className="bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-500"
                  >
                    <p className="text-sm text-gray-700 font-medium">⏰ Missed opportunities</p>
                  </motion.div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-6xl text-blue-500"
                >
                  →
                </motion.div>
              </div>

              {/* After */}
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold mb-4">
                  After
                </div>
                <div className="space-y-3">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500"
                  >
                    <p className="text-sm text-gray-700 font-medium">🤖 AI instant responses</p>
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                    className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500"
                  >
                    <p className="text-sm text-gray-700 font-medium">⚡ Automated workflows</p>
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                    className="bg-white rounded-lg p-4 shadow-md border-l-4 border-violet-500"
                  >
                    <p className="text-sm text-gray-700 font-medium">📈 Scalable systems</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
