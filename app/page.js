import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import AntenehAI from "@/components/AntenehAI";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
    return (
        <>
            <ScrollProgress />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Achievements />
                <Contact />
            </main>
            <AntenehAI />
        </>
    );
}
