import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const HOW_DID_YOU_HEAR_OPTIONS = [
  { value: '', label: 'Select an option...' },
  { value: 'search', label: 'Google / Search' },
  { value: 'referral', label: 'Referral' },
  { value: 'social', label: 'Social media' },
  { value: 'other', label: 'Other' }
];

const StrategyCallForm = ({ id = 'strategy-form', compact = false }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    howDidYouHear: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const apiBase = import.meta.env.VITE_POCKETBASE_URL ?? '';

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast({
        title: 'Please fix the form',
        description: 'Fill in all required fields correctly.',
        variant: 'destructive'
      });
      return;
    }
    if (!apiBase) {
      toast({
        title: 'Configuration missing',
        description: 'VITE_POCKETBASE_URL is not set. Add it to your .env file.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        message: formData.message.trim() || undefined,
        howDidYouHear: formData.howDidYouHear || undefined
      };

      const res = await fetch(`${apiBase}/api/ghl/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setIsSubmitted(true);
        toast({
          title: 'Request received',
          description: "We'll be in touch soon to schedule your strategy call."
        });
      } else {
        toast({
          title: 'Submission failed',
          description: data.error ?? res.statusText ?? 'Please try again later.',
          variant: 'destructive'
        });
      }
    } catch (err) {
      console.error('GHL proxy error:', err);
      toast({
        title: 'Something went wrong',
        description: err.message || 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 mb-6">
          <CheckCircle className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">You're all set</h3>
        <p className="text-gray-300">
          We've received your request and will reach out shortly to schedule your Automation Strategy Call.
        </p>
      </motion.div>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5" id={compact ? id : undefined}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="strategy-firstName" className="text-gray-300">
            First name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="strategy-firstName"
            type="text"
            placeholder="Jane"
            value={formData.firstName}
            onChange={update('firstName')}
            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-400"
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="text-sm text-red-400">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="strategy-lastName" className="text-gray-300">
            Last name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="strategy-lastName"
            type="text"
            placeholder="Smith"
            value={formData.lastName}
            onChange={update('lastName')}
            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-400"
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="text-sm text-red-400">{errors.lastName}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="strategy-email" className="text-gray-300">
          Email <span className="text-red-400">*</span>
        </Label>
        <Input
          id="strategy-email"
          type="email"
          placeholder="jane@company.com"
          value={formData.email}
          onChange={update('email')}
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-400"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="strategy-phone" className="text-gray-300">
          Phone
        </Label>
        <Input
          id="strategy-phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={update('phone')}
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-400"
          disabled={isSubmitting}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="strategy-company" className="text-gray-300">
          Company
        </Label>
        <Input
          id="strategy-company"
          type="text"
          placeholder="Acme Inc."
          value={formData.company}
          onChange={update('company')}
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-blue-400"
          disabled={isSubmitting}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="strategy-howDidYouHear" className="text-gray-300">
          How did you hear about us?
        </Label>
        <select
          id="strategy-howDidYouHear"
          value={formData.howDidYouHear}
          onChange={update('howDidYouHear')}
          disabled={isSubmitting}
          className="flex h-9 w-full rounded-xl border border-slate-600 bg-slate-800/50 px-3 py-1 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
        >
          {HOW_DID_YOU_HEAR_OPTIONS.map((opt) => (
            <option key={opt.value || 'empty'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="strategy-message" className="text-gray-300">
          Message
        </Label>
        <textarea
          id="strategy-message"
          placeholder="Tell us a bit about your goals..."
          value={formData.message}
          onChange={update('message')}
          rows={3}
          disabled={isSubmitting}
          className="flex w-full rounded-xl border border-slate-600 bg-slate-800/50 px-3 py-2 text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 resize-none"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-violet-500 to-blue-600 hover:from-blue-600 hover:via-violet-600 hover:to-blue-700 text-white font-semibold px-10 py-6 rounded-xl shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Book Your Automation Strategy Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </>
        )}
      </Button>
    </form>
  );

  if (compact) {
    return formContent;
  }

  return (
    <section
      id={compact ? undefined : id}
      className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Book Your Automation Strategy Call
          </h2>
          <p className="text-gray-300 mb-10">
            Free consultation • No commitment • Custom automation roadmap
          </p>
          {formContent}
        </motion.div>
      </div>
    </section>
  );
};

export default StrategyCallForm;
