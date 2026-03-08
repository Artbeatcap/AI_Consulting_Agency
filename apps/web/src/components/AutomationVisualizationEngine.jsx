
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Database, Calendar, CheckCircle } from 'lucide-react';

const workflowSteps = [
  {
    icon: Mail,
    title: 'Lead Captured',
    description: 'Customer submits form',
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    icon: MessageSquare,
    title: 'AI Responds Instantly',
    description: 'Personalized message sent',
    color: 'from-violet-500 to-purple-500',
    delay: 0.5
  },
  {
    icon: Database,
    title: 'CRM Updated',
    description: 'Contact added automatically',
    color: 'from-teal-500 to-green-500',
    delay: 1
  },
  {
    icon: Calendar,
    title: 'Follow-up Scheduled',
    description: 'Next steps automated',
    color: 'from-orange-500 to-red-500',
    delay: 1.5
  },
  {
    icon: CheckCircle,
    title: 'Sale Completed',
    description: 'Deal closed automatically',
    color: 'from-pink-500 to-rose-500',
    delay: 2
  }
];

const AutomationVisualizationEngine = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
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
            See Automation in{' '}
            <span className="text-blue-400">Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how a single lead transforms into a completed sale through automated workflows.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Workflow visualization */}
          <div className="relative">
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="25%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#14b8a6" />
                  <stop offset="75%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              
              {workflowSteps.map((_, index) => {
                if (index === workflowSteps.length - 1) return null;
                const y = 150 + index * 200;
                return (
                  <motion.line
                    key={index}
                    x1="50%" y1={y}
                    x2="50%" y2={y + 200}
                    stroke="url(#flowGradient)"
                    strokeWidth="3"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Workflow steps */}
            <div className="space-y-12 relative z-10">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: step.delay }}
                  className="flex items-center justify-center"
                >
                  <div className="max-w-2xl w-full">
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-2xl glow-blue">
                      <div className="flex items-center gap-6">
                        {/* Icon */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              '0 0 20px rgba(59, 130, 246, 0.5)',
                              '0 0 40px rgba(59, 130, 246, 0.8)',
                              '0 0 20px rgba(59, 130, 246, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, delay: step.delay, repeat: Infinity }}
                          className={`w-20 h-20 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                        >
                          <step.icon className="w-10 h-10 text-white" />
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-gray-300">{step.description}</p>
                        </div>

                        {/* Step number */}
                        <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-30`}>
                          {(index + 1).toString().padStart(2, '0')}
                        </div>
                      </div>

                      {/* Progress bar */}
                      <motion.div
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: step.delay + 0.3 }}
                        className="mt-6 h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full overflow-hidden"
                      >
                        <div className={`h-full bg-gradient-to-r ${step.color}`}></div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="mt-16 relative rounded-2xl overflow-hidden shadow-2xl glow-blue"
          >
            <img
              src="https://images.unsplash.com/photo-1646649320401-40358af9a209"
              alt="Automated workflow visualization showing connected systems and data flow"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white text-xl font-semibold">
                Every step happens automatically, in seconds, without human intervention.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AutomationVisualizationEngine;
