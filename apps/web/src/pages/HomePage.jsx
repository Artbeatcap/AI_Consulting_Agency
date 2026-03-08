
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection.jsx';
import ProblemSection from '@/components/ProblemSection.jsx';
import TransformationSection from '@/components/TransformationSection.jsx';
import SolutionsSection from '@/components/SolutionsSection.jsx';
import HowItWorksSection from '@/components/HowItWorksSection.jsx';
import ResultsSection from '@/components/ResultsSection.jsx';
import AutomationVisualizationEngine from '@/components/AutomationVisualizationEngine.jsx';
import AutomationOpportunityScanner from '@/components/AutomationOpportunityScanner.jsx';
import FinalCTASection from '@/components/FinalCTASection.jsx';
import StrategyCallForm from '@/components/StrategyCallForm.jsx';
import Footer from '@/components/Footer.jsx';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Ascentum - Turn Your Business Into a Self-Running Machine with AI Automation</title>
        <meta 
          name="description" 
          content="AI-powered automation systems that capture leads, respond to customers, and run business workflows automatically. Transform your business with intelligent automation solutions from Ascentum." 
        />
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        <ProblemSection />
        <TransformationSection />
        <SolutionsSection />
        <HowItWorksSection />
        <ResultsSection />
        <AutomationVisualizationEngine />
        <AutomationOpportunityScanner />
        <FinalCTASection />
        <StrategyCallForm id="strategy-form" />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
