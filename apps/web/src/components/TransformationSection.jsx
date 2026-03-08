
import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const beforeItems = [
  'Manual lead follow-ups taking hours',
  'Missed opportunities during off-hours',
  'Slow response times losing customers',
  'Repetitive tasks draining productivity',
  'Disconnected tools creating chaos'
];

const afterItems = [
  'Instant AI-powered lead responses 24/7',
  'Never miss an opportunity again',
  'Lightning-fast customer engagement',
  'Automated workflows saving hours daily',
  'Seamlessly integrated systems'
];

const TransformationSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Glowing background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Transformation Is{' '}
            <span className="text-blue-400">Dramatic</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how automation transforms every aspect of your business operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-red-950/50 to-orange-950/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <X className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Before Automation</h3>
            </div>
            
            <div className="space-y-4">
              {beforeItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-red-900/20 rounded-lg border border-red-500/20"
                >
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-red-900/30 rounded-lg border border-red-500/30">
              <p className="text-red-300 font-semibold text-center">
                Result: Lost revenue, frustrated customers, burned-out team
              </p>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-950/50 to-blue-950/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 shadow-2xl glow-blue"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">After Automation</h3>
            </div>
            
            <div className="space-y-4">
              {afterItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-green-900/20 rounded-lg border border-green-500/20"
                >
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/30">
              <p className="text-green-300 font-semibold text-center">
                Result: More revenue, happy customers, empowered team
              </p>
            </div>
          </motion.div>
        </div>

        {/* Transformation arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-500/20 to-violet-500/20 backdrop-blur-sm rounded-full border border-blue-500/30">
            <span className="text-white font-semibold text-lg">The difference is automation</span>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl text-blue-400"
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationSection;
