import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

export default function ProjectModal({ activeProject, onClose }) {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none" style={{ zIndex: 99999 }}>
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-lg pointer-events-auto"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 shadow-2xl text-left"
            >
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="mb-4">
                <span className="text-red-500 text-sm tracking-[0.2em] uppercase font-bold">{activeProject.role}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                {activeProject.title}
              </h2>
              
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-3xl">
                {activeProject.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-12">
                {activeProject.tech.map((t, idx) => (
                  <span key={idx} className="px-4 py-2 border border-white/20 text-xs tracking-widest uppercase text-gray-300 bg-white/5">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-6 border-t border-white/10 pt-8 mt-auto">
                {activeProject.github && (
                  <a href={activeProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-red-400 transition-colors cursor-pointer pointer-events-auto">
                    <Github className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-sm font-bold">View Source</span>
                  </a>
                )}
                {activeProject.demo && (
                  <a href={activeProject.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-red-400 transition-colors cursor-pointer pointer-events-auto">
                    <ExternalLink className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-sm font-bold">Live System</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
