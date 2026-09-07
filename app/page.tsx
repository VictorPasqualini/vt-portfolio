import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="mx-auto max-w-content px-6">
        <Hero />
        <Experience />
      </div>
      <Projects />
      <div className="mx-auto max-w-content px-6">
        <Skills />
        <Education />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
