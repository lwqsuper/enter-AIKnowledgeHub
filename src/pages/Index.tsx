import HeroSection from "@/components/HeroSection";
import AINewsSection from "@/components/AINewsSection";
import AIKnowledgeSection from "@/components/AIKnowledgeSection";
import AIToolsSection from "@/components/AIToolsSection";
import AgentTutorialSection from "@/components/AgentTutorialSection";
import RAGTutorialSection from "@/components/RAGTutorialSection";
import AIResourcesSection from "@/components/AIResourcesSection";
import Layout from "@/components/Layout";

const Index = () => {
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
