import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, DollarSign, Award } from 'lucide-react';
import { JobDetails } from '../types';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobDetails: JobDetails;
}

const JobModal = ({ isOpen, onClose, jobDetails }: JobModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-[#141e30]/95 backdrop-blur-md rounded-xl w-full max-w-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={jobDetails.image}
                alt={jobDetails.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-cinzel text-gold mb-4">{jobDetails.title}</h3>
              <p className="text-accent/90 mb-6">{jobDetails.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <DollarSign className="text-gold mt-1" size={20} />
                  <div>
                    <h4 className="font-medium mb-1">Salary Range</h4>
                    <p className="text-sm text-accent/80">{jobDetails.salary}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="text-gold mt-1" size={20} />
                  <div>
                    <h4 className="font-medium mb-1">Growth Potential</h4>
                    <p className="text-sm text-accent/80">{jobDetails.growth}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="text-gold" size={20} />
                  <h4 className="font-medium">Key Skills Required</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {jobDetails.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  href="https://www.naukri.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-sm"
                >
                  Find {jobDetails.title} Jobs
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;