import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SelectedWorks } from './components/SelectedWorks';
import { JournalSection } from './components/JournalSection';
import { ExplorationsSection } from './components/ExplorationsSection';
import { StatsSection } from './components/StatsSection';
import { ContactFooter } from './components/ContactFooter';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { ArticleModal } from './components/ArticleModal';
import { ExplorationModal } from './components/ExplorationModal';
import { ImmersiveVideoBackground } from './components/ImmersiveVideoBackground';
import { Project, JournalEntry, ExplorationItem } from './types';
import { PROJECTS, JOURNAL_ENTRIES } from './data/portfolioData';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Modals state
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalEntry | null>(null);
  const [selectedExploration, setSelectedExploration] = useState<ExplorationItem | null>(null);

  // Monitor scroll for active section highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const workSection = document.getElementById('work');
      const contactSection = document.getElementById('contact');

      const workTop = workSection ? workSection.offsetTop - 200 : 800;
      const contactTop = contactSection ? contactSection.offsetTop - 300 : 3000;

      if (scrollY >= contactTop) {
        setActiveSection('contact');
      } else if (scrollY >= workTop) {
        setActiveSection('work');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary antialiased font-body overflow-x-hidden selection:bg-[#4E85BF]/30 selection:text-white">
      {/* Immersive Video Background — Fixed behind everything */}
      {!isLoading && <ImmersiveVideoBackground />}
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={handleOpenResume}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 2: Hero */}
        <HeroSection
          isReady={!isLoading}
          onSeeWorks={() => handleNavigate('work')}
          onReachOut={handleOpenContact}
        />

        {/* Section 3: Selected Works */}
        <SelectedWorks
          onSelectProject={(project) => setSelectedProject(project)}
          onViewAllProjects={() => setSelectedProject(PROJECTS[0])}
        />

        {/* Section 4: Journal */}
        <JournalSection
          onSelectArticle={(article) => setSelectedArticle(article)}
          onViewAllArticles={() => setSelectedArticle(JOURNAL_ENTRIES[0])}
        />

        {/* Section 5: Explorations (Parallax Gallery) */}
        <ExplorationsSection
          onSelectExploration={(item) => setSelectedExploration(item)}
        />

        {/* Section 6: Stats */}
        <StatsSection />

        {/* Section 7: Contact / Footer */}
        <ContactFooter />
      </main>

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ArticleModal
        entry={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ExplorationModal
        item={selectedExploration}
        onClose={() => setSelectedExploration(null)}
      />
    </div>
  );
}
