import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Featured from "@/components/sections/Featured"
import Writeups from "@/components/sections/Writeups"
import Projects from "@/components/sections/Projects"
import Skills from "@/components/sections/Skills"
import Currently from "@/components/sections/Currently"
import Contact from "@/components/sections/Contact"
import CommandPalette from "@/components/effects/CommandPalette"
import MiniTerminal from "@/components/effects/MiniTerminal"
import BackToTop from "@/components/effects/BackToTop"

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Featured />
        <Writeups />
        <Projects />
        <Skills />
        <Currently />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <MiniTerminal />
      <BackToTop />
    </>
  )
}
