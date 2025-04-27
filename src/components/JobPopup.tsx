import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { JobDetails } from '../types';

interface JobPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobDetails: JobDetails;
}

const JobPopup = ({ isOpen, onClose, jobDetails }: JobPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
        >
          <div className="bg-[#141e30]/95 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 shadow-xl">
            <div className="relative">
              <img
                src={jobDetails.image}
                alt={jobDetails.title}
                className="w-full h-40 object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-cinzel text-gold mb-2">{jobDetails.title}</h3>
              <p className="text-sm text-accent/90 mb-3">{jobDetails.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {jobDetails.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-full text-xs bg-white/10 border border-white/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-accent/80">
                <span>{jobDetails.salary}</span>
                <a
                  href="https://www.naukri.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  View Jobs →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobPopup;