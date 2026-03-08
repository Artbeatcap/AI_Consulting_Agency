
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import pb from '@/lib/pocketbaseClient';
import { useToast } from '@/hooks/use-toast';

const companySizeOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '200+', label: '200+ employees' }
];

const AutomationOpportunityScanner = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    company_name: '',
    phone: '',
    company_size: '',
    leads_per_month: 50,
    manual_tasks: 10
  });
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const calculateAutomation = () => {
    const hoursPerLead = 0.5; // 30 minutes per lead
    const hoursPerTask = 2; // 2 hours per manual task per week
    const automationEfficiency = 0.7; // 70% can be automated
    
    const leadHours = formData.leads_per_month * hoursPerLead * 4; // Monthly to weekly
    const taskHours = formData.manual_tasks * hoursPerTask;
    const totalHours = leadHours + taskHours;
    const savedHours = totalHours * automationEfficiency;
    
    setEstimatedHours(Math.round(savedHours));
  };

  React.useEffect(() => {
    calculateAutomation();
  }, [formData.leads_per_month, formData.manual_tasks]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.company_name || formData.company_name.length < 2) {
      newErrors.company_name = 'Company name is required (min 2 characters)';
    }
    
    if (!formData.company_size) {
      newErrors.company_size = 'Please select company size';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        estimated_hours_saved: estimatedHours
      };

      await pb.collection('scanner_submissions').create(submissionData, { $autoCancel: false });
      
      setIsSubmitted(true);
      toast({
        title: 'Success!',
        description: 'Your automation opportunity scan has been submitted.',
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: error.message || 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-2xl p-12 shadow-2xl border border-green-200">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Your Automation Opportunity Report
              </h3>
              
              <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl p-8 mb-6">
                <p className="text-5xl font-bold text-blue-600 mb-2">{estimatedHours} hours</p>
                <p className="text-lg text-gray-700">could be automated per week</p>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Based on your inputs, we've identified significant automation opportunities in your business. 
                Our team will review your submission and reach out with a customized automation strategy.
              </p>
              
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-violet-500 to-blue-600 hover:from-blue-600 hover:via-violet-600 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Book Your Automation Strategy Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-capture" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Calculator className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-900 font-semibold">Free Automation Opportunity Scanner</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Much Time Could You{' '}
            <span className="text-blue-600">Automate?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Answer a few quick questions to discover your automation potential and ROI.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="company_size" className="text-gray-900 font-semibold mb-2 block">
                    Company Size *
                  </Label>
                  <select
                    id="company_size"
                    value={formData.company_size}
                    onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="">Select company size</option>
                    {companySizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.company_size && <p className="text-red-500 text-sm mt-1">{errors.company_size}</p>}
                </div>

                <div>
                  <Label htmlFor="leads_per_month" className="text-gray-900 font-semibold mb-2 block">
                    Leads Per Month: {formData.leads_per_month}
                  </Label>
                  <Slider
                    id="leads_per_month"
                    min={10}
                    max={500}
                    step={10}
                    value={[formData.leads_per_month]}
                    onValueChange={(value) => setFormData({ ...formData, leads_per_month: value[0] })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="manual_tasks" className="text-gray-900 font-semibold mb-2 block">
                    Manual Tasks Per Week: {formData.manual_tasks}
                  </Label>
                  <Slider
                    id="manual_tasks"
                    min={1}
                    max={50}
                    step={1}
                    value={[formData.manual_tasks]}
                    onValueChange={(value) => setFormData({ ...formData, manual_tasks: value[0] })}
                    className="mt-2"
                  />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Get Your Results</h3>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-semibold mb-2 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="text-gray-900 bg-white"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="company_name" className="text-gray-900 font-semibold mb-2 block">
                      Company Name *
                    </Label>
                    <Input
                      id="company_name"
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      placeholder="Your Company"
                      className="text-gray-900 bg-white"
                    />
                    {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>}
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="phone" className="text-gray-900 font-semibold mb-2 block">
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-600 hover:from-blue-600 hover:via-violet-600 hover:to-blue-700 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  {isSubmitting ? 'Calculating...' : 'Calculate My Automation Potential'}
                </Button>
              </form>
            </motion.div>

            {/* Results Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-8 border border-blue-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Your Potential</h3>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
                <p className="text-gray-600 mb-2">Estimated Hours Saved Per Week</p>
                <motion.p
                  key={estimatedHours}
                  initial={{ scale: 1.2, color: '#3b82f6' }}
                  animate={{ scale: 1, color: '#1f2937' }}
                  transition={{ duration: 0.3 }}
                  className="text-6xl font-bold text-gray-900"
                >
                  {estimatedHours}
                </motion.p>
                <p className="text-gray-600 mt-2">hours per week</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <p className="text-sm text-gray-600 mb-1">Monthly Time Savings</p>
                  <p className="text-2xl font-bold text-blue-600">{estimatedHours * 4} hours</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <p className="text-sm text-gray-600 mb-1">Annual Time Savings</p>
                  <p className="text-2xl font-bold text-violet-600">{estimatedHours * 52} hours</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <p className="text-sm text-gray-600 mb-1">Potential ROI</p>
                  <p className="text-2xl font-bold text-green-600">${(estimatedHours * 52 * 50).toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Based on $50/hour value</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  💡 These are conservative estimates. Most businesses see even greater returns with full automation implementation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationOpportunityScanner;
