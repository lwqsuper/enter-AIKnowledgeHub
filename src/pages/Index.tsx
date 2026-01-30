import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AIKnowledgeSection from "@/components/AIKnowledgeSection";
import AIToolsSection from "@/components/AIToolsSection";
import AgentTutorialSection from "@/components/AgentTutorialSection";
import RAGTutorialSection from "@/components/RAGTutorialSection";
import Footer from "@/components/Footer";

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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
