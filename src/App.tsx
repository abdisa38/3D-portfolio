import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
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
      const aboutSection = document.getElementById('about');
      const skillsSection = document.getElementById('skills');
      const workSection = document.getElementById('work');
      const explorationsSection = document.getElementById('explorations');
      const contactSection = document.getElementById('contact');

      const aboutTop = aboutSection ? aboutSection.offsetTop - 250 : 500;
      const skillsTop = skillsSection ? skillsSection.offsetTop - 250 : 1100;
      const workTop = workSection ? workSection.offsetTop - 250 : 2000;
      const explorationsTop = explorationsSection ? explorationsSection.offsetTop - 250 : 3000;
      const contactTop = contactSection ? contactSection.offsetTop - 350 : 3800;

      if (scrollY >= contactTop) {
        setActiveSection('contact');
      } else if (scrollY >= explorationsTop) {
        setActiveSection('explorations');
      } else if (scrollY >= workTop) {
        setActiveSection('work');
      } else if (scrollY >= skillsTop) {
        setActiveSection('skills');
      } else if (scrollY >= aboutTop) {
        setActiveSection('about');
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
        {/* Section 1: Hero */}
        <HeroSection
          isReady={!isLoading}
          onSeeWorks={() => handleNavigate('work')}
          onReachOut={handleOpenContact}
        />

        {/* Section 2: About Me */}
        <AboutSection />

        {/* Section 3: Technical Arsenal / Tech Stack */}
        <TechStackSection />

        {/* Section 4: Selected Works */}
        <SelectedWorks
          onSelectProject={(project) => setSelectedProject(project)}
          onViewAllProjects={() => setSelectedProject(PROJECTS[0])}
        />

        {/* Section 6: Journal */}
        <JournalSection
          onSelectArticle={(article) => setSelectedArticle(article)}
          onViewAllArticles={() => setSelectedArticle(JOURNAL_ENTRIES[0])}
        />

        {/* Section 7: Verified Credentials */}
        <ExplorationsSection
          onSelectExploration={(item) => setSelectedExploration(item)}
        />

        {/* Section 8: Stats */}
        <StatsSection />

        {/* Section 9: Contact / Footer */}
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
