import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import StrategyCallForm from '@/components/StrategyCallForm.jsx';

const BookCallPage = () => {
  return (
    <>
      <Helmet>
        <title>Book Your Strategy Call - Ascentum</title>
        <meta
          name="description"
          content="Schedule a free Automation Strategy Call with Ascentum. Get a custom roadmap to turn your business into a self-running machine."
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="container mx-auto px-4 pt-8 pb-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <StrategyCallForm id="strategy-form" compact={false} />
        </div>
      </div>
    </>
  );
};

export default BookCallPage;
