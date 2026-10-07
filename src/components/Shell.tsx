"use client";
import { MotionConfig } from "framer-motion";
import { useState } from "react";
import { About } from "./About";
import { Backdrop } from "./Backdrop";
import { CommandPalette } from "./CommandPalette";
import { Contact } from "./Contact";
import { Cursor } from "./Cursor";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Nav } from "./Nav";
import { Featured } from "./Featured";
import { Projects } from "./Projects";
import { Services } from "./Services";
import { ParticleField } from "./ParticleField";
import { Preloader } from "./Preloader";
import { ScrollProgress } from "./ScrollProgress";
import { Skills } from "./Skills";
import { Toaster } from "./Toaster";
import { Websites } from "./Websites";

export function Shell() {
  const [palette, setPalette] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <Backdrop />
      <ParticleField />
      <ScrollProgress />
      <Cursor />
      <Nav onPalette={() => setPalette(true)} />
      <CommandPalette open={palette} setOpen={setPalette} />
      <Toaster />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Featured />
        <Services />
        <Marquee reverse />
        <Projects />
        <Websites />
        <Skills />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </MotionConfig>
  );
}
