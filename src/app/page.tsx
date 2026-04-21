import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import InvertCursor from "@/components/InvertCursor";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <InvertCursor />
      <Navbar />
      <main
        className="relative z-10 bg-bone"
        style={{ marginBottom: "var(--footer-h, 0px)" }}
      >
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
