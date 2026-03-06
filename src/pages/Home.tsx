import ContactSection from '../components/sections/ContactSection';
import HeroSection from '../components/sections/HeroSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import StackSection from '../components/sections/StackSection';

export default function Home() {
  return (
    <div className="onepage compact-page">
      <HeroSection />
      <ProjectsSection />
      <StackSection />
      <ContactSection />
    </div>
  );
}
