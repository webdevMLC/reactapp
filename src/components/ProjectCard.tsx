'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    link?: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const getGradient = () => {
    const colors = [
      'from-purple-600 to-blue-600',
      'from-pink-600 to-purple-600',
      'from-blue-600 to-cyan-600',
      'from-green-600 to-teal-600',
      'from-orange-600 to-red-600',
      'from-indigo-600 to-purple-600',
    ];
    return colors[index % colors.length];
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  // Background content: image or gradient
  const backgroundContent = project.image ? (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-300 group-hover:scale-110"
      // Add a background color in case the image has transparency or fails to load
      style={{ backgroundColor: '#1f2937' }} // gray-800
    />
  ) : (
    <motion.div
      animate={hovered ? { scale: 1.1 } : { scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-20`}
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
    </motion.div>
  );

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-colors duration-300"
      >
        {/* Image / Background Area */}
        <div className="relative h-48 overflow-hidden bg-gray-800">
          {backgroundContent}

          {/* Dark gradient overlay for title readability (only when image exists) */}
          {project.image && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          )}

          {/* Clickable "View Project" Overlay */}
          <motion.button
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 w-full h-full cursor-pointer"
            onClick={openModal}
            aria-label={`View details for ${project.title}`}
          >
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm border border-white/20">
              View Project
            </span>
          </motion.button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent z-10">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Description & Technologies */}
        <div className="p-6">
          <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>

          <div className="flex gap-2 flex-wrap">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-xs px-3 py-1 bg-white/5 rounded-full border border-white/10"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              Click to Visit
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.a>
          )}
        </div>

        {/* Glow effect on hover */}
        <motion.div
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          className={`absolute -inset-0.5 bg-gradient-to-r ${getGradient()} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}
        />
      </motion.div>

      {/* Modal Portal */}
      {modalOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer z-0"
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal Content */}
              <motion.div
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 shadow-2xl z-10"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Image */}
                {project.image && (
                  <div className="relative h-64 w-full bg-gray-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover rounded-t-2xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                      style={{ backgroundColor: '#1f2937' }}
                    />
                  </div>
                )}

                {/* Details */}
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {project.title}
                  </h2>
                  <p className="text-gray-300 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Technologies
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors cursor-pointer"
                    >
                      Click to Visit
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}