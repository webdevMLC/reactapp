// app/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import CustomCursor from "@/components/CustomCursor";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import { projects, featuredProjects } from "@/model/projects";
import MagneticButton from '@/components/MagneticButton';
import ParallaxText from '@/components/ParallaxText';
import FloatingShapes from '@/components/FloatingShapes';
import ProjectCard from '@/components/ProjectCard';
import ParticleBackground from '@/components/ParticleBackground';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
 const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

useEffect(() => {
  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    setMousePosition({ x: e.clientX, y: e.clientY }); // keep if needed elsewhere
  };
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, [mouseX, mouseY]);

  const allProjects = [...projects, ...featuredProjects];

  return (
    <SmoothScroll>
      <main ref={containerRef} className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
        <CustomCursor />
        <ParticleBackground />
        
{/* Hero Section */}
<section className="h-screen relative overflow-hidden">
  {/* Animated Grid Background */}
  <div className="absolute inset-0 z-0">
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
        backgroundSize: '50px 50px',
        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
      }}
    />

  </div>

  <FloatingShapes mousePosition={mousePosition} />

  {/* 3D Rotating Cube (optional – lightweight CSS) */}
  <div className="absolute right-[10%] top-[20%] w-32 h-32 perspective-800 hidden lg:block">
    <motion.div
      className="w-full h-full relative preserve-3d animate-rotate-cube"
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
        <div
          key={face}
          className={`absolute w-full h-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm flex items-center justify-center text-2xl font-bold text-white/50 cube-face-${face}`}
        >
          {face === 'front' && 'JS'}
          {face === 'back' && 'TS'}
          {face === 'right' && 'R'}
          {face === 'left' && 'N'}
          {face === 'top' && '▲'}
          {face === 'bottom' && '▼'}
        </div>
      ))}
    </motion.div>
  </div>

  <motion.div 
    style={{ opacity: heroOpacity, scale: heroScale }}
    className="relative z-10 h-full flex items-center justify-center"
  >
    <div className="text-center px-4">
      {/* Animated subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4 block">
          Welcome to the future
        </span>
      </motion.div>

      {/* Staggered name reveal */}
      <motion.h1 
        className="text-7xl md:text-9xl font-bold mb-6"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.3 }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {"Micho Calma".split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="inline-block hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Animated title with glitch effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative group"
      >
        <ParallaxText baseVelocity={-3}>
          Full Stack Developer & Mobile App Creator
        </ParallaxText>
        {/* Glitch overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full text-purple-400 blur-sm animate-glitch" 
               style={{ clipPath: 'inset(10% 0 30% 0)', transform: 'translateX(-2px)' }}>
            Full Stack Developer & Mobile App Creator
          </div>
          <div className="absolute top-0 left-0 w-full h-full text-blue-400 blur-sm animate-glitch-delay" 
               style={{ clipPath: 'inset(60% 0 10% 0)', transform: 'translateX(2px)' }}>
            Full Stack Developer & Mobile App Creator
          </div>
        </div>
      </motion.div>

      {/* Buttons with enhanced hover */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="mt-12 flex gap-6 justify-center"
      >
        {/* View Work Button */}
        <MagneticButton>
          <a
            href="#work"
            className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full overflow-hidden"
          >
            {/* Animated liquid gradient background */}
            <span className="absolute inset-0 bg-[length:200%_200%] animate-gradient-slow"
                  style={{
                    background: 'radial-gradient(circle at 30% 50%, rgba(139,92,246,0.8), rgba(59,130,246,0.8), rgba(236,72,153,0.8))',
                    filter: 'blur(8px) brightness(1.2)',
                  }} 
            />
            {/* Glass overlay */}
            <span className="absolute inset-[2px] bg-gray-900/90 backdrop-blur-xl rounded-full border border-white/10 group-hover:border-white/20 transition-colors" />
            
            {/* Content – now properly centered */}
            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-lg">
              View Work
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>

            {/* Cursor glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute w-32 h-32 -top-16 -left-16 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute w-32 h-32 -bottom-16 -right-16 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow" />
            </div>
          </a>
        </MagneticButton>

        {/* Contact Me Button */}
        <MagneticButton>
          <a
  href="#contact"
  className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full overflow-hidden border border-white/10 hover:border-purple-500/50 transition-colors"
>
  {/* Subtle moving gradient background */}
  <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(139,92,246,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
  
  {/* Glass background */}
  <span className="absolute inset-[1px] bg-gray-900/80 backdrop-blur-sm rounded-full" />
  
  {/* Content – now properly centered */}
  <span className="relative z-10 flex items-center gap-3 text-white font-bold text-lg">
    Contact Me
    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </span>
</a>
        </MagneticButton>
      </motion.div>
    </div>
  </motion.div>

  {/* Enhanced scroll indicator */}
  <motion.div 
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center relative">
      <div className="w-1 h-2 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full mt-2 animate-scroll" />
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 tracking-widest">
        SCROLL
      </div>
    </div>
  </motion.div>
</section>
        

        {/* Work Section */}
        <section id="work" className="py-32 px-4 relative">
          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 z-0 opacity-30"
          >
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl" />
          </motion.div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">Portfolio</span>
              <h2 className="text-5xl md:text-6xl font-bold mt-4">
                Featured{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  Projects
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-32 px-4 bg-[#0F0F15] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                  className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"
                />
                <div className="relative z-10">
                  <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">About</span>
                  <h2 className="text-5xl font-bold mt-4 mb-8">
                    Crafting Digital
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                      Experiences
                    </span>
                  </h2>
                  
                  <div className="space-y-6 text-gray-300">
                    <p className="text-lg leading-relaxed">
                      I'm a full-stack developer specializing in building comprehensive web and mobile solutions. 
                      From HR management systems to mobile apps promoting sustainability, I create applications 
                      that make a real impact.
                    </p>
                    <p className="text-lg leading-relaxed">
                      With expertise in Next.js, React Native, and real-time technologies like Socket.IO, 
                      I build scalable, performant applications that solve complex business problems.
                    </p>
                  </div>

                  <div className="mt-12 grid grid-cols-2 gap-4">
                    {['Next.js', 'React Native', 'Socket.IO', 'MySQL', 'Tailwind CSS', 'Expo Go'].map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="group relative p-4 bg-white/5 rounded-lg overflow-hidden cursor-default"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:to-blue-600/20 transition-all duration-500" />
                        <span className="relative z-10 font-medium">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[4, 3, 2, 1].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="aspect-square bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center flex-col"
                    >
                      <span className="text-4xl font-bold text-white/60">{item}+</span>
                      <span className="text-sm text-gray-400">
                        {index === 0 ? 'Years' : index === 1 ? 'Projects' : index === 2 ? 'Technologies' : 'Apps'}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold shadow-2xl">
                    {allProjects.length}+
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-purple-400 text-sm tracking-[0.3em] uppercase">Get in touch</span>
              <h2 className="text-5xl md:text-6xl font-bold mt-4">
                Let's{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  Create
                </span>
              </h2>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className="block mb-2 text-sm tracking-wider text-gray-400 group-focus-within:text-purple-400 transition-colors">
                    NAME
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-700 focus:border-purple-500 outline-none transition-all text-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block mb-2 text-sm tracking-wider text-gray-400 group-focus-within:text-purple-400 transition-colors">
                    EMAIL
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-700 focus:border-purple-500 outline-none transition-all text-lg"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="group">
                <label htmlFor="message" className="block mb-2 text-sm tracking-wider text-gray-400 group-focus-within:text-purple-400 transition-colors">
                  MESSAGE
                </label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-700 focus:border-purple-500 outline-none transition-all text-lg resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <MagneticButton>
                <button 
                  type="submit" 
                  className="group relative w-full py-5 rounded-full overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transition-transform group-hover:scale-110" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg font-medium">
                    Send Message
                    <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                </button>
              </MagneticButton>
            </motion.form>
          </div>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  );
}