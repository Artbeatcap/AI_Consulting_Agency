
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Clock, Users, Zap } from 'lucide-react';
import { useRef } from 'react';

const metrics = [
  {
    icon: Zap,
    value: 95,
    suffix: '%',
    label: 'Faster Response Times',
    description: 'AI responds to leads and customers instantly, 24/7',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    value: 3,
    suffix: 'x',
    label: 'Higher Lead Conversion',
    description: 'Automated follow-ups and nurturing increase conversions',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: Clock,
    value: 40,
    suffix: 'hrs',
    label: 'Less Manual Work Per Week',
    description: 'Automation handles repetitive tasks and workflows',
    color: 'from-teal-500 to-green-500'
  },
  {
    icon: Users,
    value: 10,
    suffix: 'x',
    label: 'Scalable Operations',
    description: 'Handle 10x more customers without hiring more staff',
    color: 'from-orange-500 to-red-500'
  }
];

const AnimatedCounter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="text-5xl md:text-6xl font-bold">
      {count}{suffix}
    </span>
  );
};

const ResultsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Impact of{' '}
            <span className="text-blue-600">Automation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from businesses that automated their operations with AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="w-7 h-7 text-white" />
              </div>

              <div className={`bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-4`}>
                <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={inView} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{metric.label}</h3>
              <p className="text-gray-600 leading-relaxed">{metric.description}</p>

              <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-500`}></div>
            </motion.div>
          ))}
        </div>

        {/* Visual graph representation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Revenue Growth with Automation
            </h3>
            
            <div className="relative h-64">
              {/* Graph bars */}
              <div className="flex items-end justify-around h-full gap-4">
                {[
                  { label: 'Month 1', height: '30%', color: 'from-gray-400 to-gray-500' },
                  { label: 'Month 2', height: '45%', color: 'from-blue-400 to-blue-500' },
                  { label: 'Month 3', height: '65%', color: 'from-blue-500 to-violet-500' },
                  { label: 'Month 4', height: '85%', color: 'from-violet-500 to-purple-500' },
                  { label: 'Month 5', height: '95%', color: 'from-purple-500 to-pink-500' }
                ].map((bar, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: bar.height }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`w-full bg-gradient-to-t ${bar.color} rounded-t-lg shadow-lg relative`}
                    >
                      {index === 0 && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                          Before Automation
                        </div>
                      )}
                      {index === 4 && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-purple-600 font-semibold whitespace-nowrap">
                          After Automation
                        </div>
                      )}
                    </motion.div>
                    <span className="text-sm text-gray-600 mt-2">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
