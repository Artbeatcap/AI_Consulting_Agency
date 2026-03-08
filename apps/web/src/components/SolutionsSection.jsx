
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, MessageSquare, TrendingUp, Workflow, Bot } from 'lucide-react';

const solutions = [
  {
    icon: Zap,
    title: 'Lead Capture Automation',
    description: 'Automatically capture, qualify, and route leads from every channel. Never miss an opportunity again.',
    features: ['24/7 lead capture', 'Instant qualification', 'Smart routing', 'CRM integration'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: MessageSquare,
    title: 'Customer Communication Automation',
    description: 'AI-powered responses that engage customers instantly, answer questions, and schedule appointments.',
    features: ['Instant responses', 'Multi-channel support', 'Smart scheduling', 'Personalized messaging'],
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    icon: TrendingUp,
    title: 'Sales Pipeline Automation',
    description: 'Automate follow-ups, nurture leads, and move deals forward without manual intervention.',
    features: ['Automated follow-ups', 'Lead nurturing', 'Deal tracking', 'Performance analytics'],
    gradient: 'from-teal-500 to-green-500'
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Connect your tools and automate repetitive tasks. From data entry to reporting, let AI handle it.',
    features: ['Tool integration', 'Process automation', 'Data synchronization', 'Custom workflows'],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Bot,
    title: 'AI Assistants and Agents',
    description: 'Deploy intelligent AI agents that handle complex tasks, make decisions, and learn from interactions.',
    features: ['Intelligent decision-making', 'Continuous learning', 'Task automation', 'Natural language processing'],
    gradient: 'from-pink-500 to-rose-500'
  }
];

const SolutionsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Automation Systems Built for{' '}
            <span className="text-blue-600">Your Business</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive automation solutions that transform how you work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <solution.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {solution.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {solution.description}
              </p>

              <div className="space-y-2">
                {solution.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${solution.gradient}`}></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${solution.gradient} rounded-full transition-all duration-500`}></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Every solution is customized to your specific business needs and goals.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-violet-50 rounded-full border border-blue-200">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="text-blue-900 font-semibold">Fully integrated, fully automated</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
