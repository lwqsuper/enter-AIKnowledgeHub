import HeroSection from "@/components/HeroSection";
import AINewsSection from "@/components/AINewsSection";
import AIKnowledgeSection from "@/components/AIKnowledgeSection";
import AIToolsSection from "@/components/AIToolsSection";
import AgentTutorialSection from "@/components/AgentTutorialSection";
import RAGTutorialSection from "@/components/RAGTutorialSection";
import AIResourcesSection from "@/components/AIResourcesSection";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there is a hash or state indicating scroll target
    if (location.state && location.state.scrollTo) {
      const element = document.querySelector(location.state.scrollTo);
      if (element) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <Layout>
      <HeroSection />
      <AINewsSection />
      <AIKnowledgeSection />
      <AIToolsSection />
      <AgentTutorialSection />
      <RAGTutorialSection />
      <AIResourcesSection />
    </Layout>
  );
};

export default Index;
