import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AIKnowledgeSection from "@/components/AIKnowledgeSection";
import AIToolsSection from "@/components/AIToolsSection";
import AgentTutorialSection from "@/components/AgentTutorialSection";
import RAGTutorialSection from "@/components/RAGTutorialSection";
import AIResourcesSection from "@/components/AIResourcesSection";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AIKnowledgeSection />
        <AIToolsSection />
        <AgentTutorialSection />
        <RAGTutorialSection />
        <AIResourcesSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
