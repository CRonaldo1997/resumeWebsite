"use client";

import { useState } from "react";
import { FileText, Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DownloadPdfButton() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <motion.button
        className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPreviewOpen(true)}
      >
        <FileText className="w-4 h-4" />
        <span className="font-light">Download Resume</span>
      </motion.button>

      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-6"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
              onClick={() => setIsPreviewOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full glass rounded-3xl p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
              
              <FileText className="w-20 h-20 mx-auto text-blue-400 mb-6 opacity-80" />
              <h2 className="text-3xl font-light text-white mb-4">Generating High-Quality PDF</h2>
              <p className="text-white/50 mb-10 max-w-md mx-auto">
                Preparing the elite edition of Jiang Dong's professional resume.
              </p>
              
              <div className="flex justify-center gap-4">
                <button 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  onClick={() => {
                    alert("Simulated PDF Download triggered.");
                    setIsPreviewOpen(false);
                  }}
                >
                  <Download className="w-5 h-5" />
                  Confirm Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
