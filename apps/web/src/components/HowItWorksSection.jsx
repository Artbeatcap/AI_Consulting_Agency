
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Wrench, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover Automation Opportunities',
    description: 'We analyze your business processes to identify high-impact automation opportunities. From lead capture to customer service, we find where AI can make the biggest difference.',
    highlights: ['Process mapping', 'Opportunity analysis', 'ROI calculation', 'Custom strategy'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Build Intelligent Systems',
    description: 'Our team designs and implements custom automation systems tailored to your business. We integrate AI, connect your tools, and create workflows that run on autopilot.',
    highlights: ['Custom AI development', 'Tool integration', 'Workflow design', 'Testing & optimization'],
    color: 'from-violet-500 to-purple-500'
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Scale Operations with AI',
    description: 'Watch your business transform as automation handles routine tasks, AI engages customers, and your team focuses on growth. We provide ongoing support and optimization.',
    highlights: ['Continuous monitoring', 'Performance optimization', 'Team training', 'Ongoing support'],
    color: 'from-teal-500 to-green-500'
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Workflow diagram background */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="workflowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M 100 300 Q 400 200 700 300 T 1300 300"
          stroke="url(#workflowGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How We Build Your{' '}
            <span className="text-blue-400">Automation Systems</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A proven process that transforms your business operations in three strategic steps.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.number}
                    </span>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg glow-blue`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">{step.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    {step.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}></div>
                        <span className="text-sm text-gray-400">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative">
                    <div className={`bg-gradient-to-br ${step.color} rounded-2xl p-1 shadow-2xl glow-blue`}>
                      <div className="bg-slate-900 rounded-xl p-8">
                        {/* Animated workflow nodes */}
                        <div className="space-y-4">
                          {[1, 2, 3].map((node) => (
                            <motion.div
                              key={node}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: index * 0.2 + node * 0.1 }}
                              className="flex items-center gap-4"
                            >
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, delay: node * 0.3, repeat: Infinity }}
                                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                              >
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </motion.div>
                              <div className="flex-1 h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: '0%' }}
                                  whileInView={{ width: '100%' }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1.5, delay: index * 0.2 + node * 0.2 }}
                                  className={`h-full bg-gradient-to-r ${step.color}`}
                                ></motion.div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-8">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '4rem' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    className={`w-1 bg-gradient-to-b ${step.color} rounded-full`}
                  ></motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
