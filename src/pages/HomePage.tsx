import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-cinzel mb-8 font-bold tracking-wider"
      >
        <span className="text-white">LETS PREDICT YOUR</span>
        <br />
        <span className="text-gold animate-glow">LUCKY JOB</span>
      </motion.h1>
      
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl max-w-2xl mb-10 text-accent/90"
      >
        Discover your cosmic career path through ancient numerology. Your birth date holds the secret to your professional destiny.
      </motion.p>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <Link to="/predict">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary flex items-center justify-center space-x-2"
          >
            <Sparkles size={18} />
            <span>Start Prediction</span>
          </motion.button>
        </Link>
        <a 
          href="https://www.naukri.com/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline"
          >
            Explore Jobs
          </motion.button>
        </a>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-16 max-w-4xl"
      >
        <h2 className="text-2xl font-cinzel mb-6 text-gold">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="bg-primary-dark w-10 h-10 flex items-center justify-center rounded-full mb-4">
              <span className="font-bold">1</span>
            </div>
            <h3 className="text-xl mb-2 font-medium">Enter Your Details</h3>
            <p className="text-white/80">Provide your name and date of birth to unlock your career destiny.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="bg-primary-dark w-10 h-10 flex items-center justify-center rounded-full mb-4">
              <span className="font-bold">2</span>
            </div>
            <h3 className="text-xl mb-2 font-medium">Cosmic Calculation</h3>
            <p className="text-white/80">Our ancient numerology algorithm analyzes your unique birth numbers.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="bg-primary-dark w-10 h-10 flex items-center justify-center rounded-full mb-4">
              <span className="font-bold">3</span>
            </div>
            <h3 className="text-xl mb-2 font-medium">Reveal Your Path</h3>
            <p className="text-white/80">Discover the career fields where you're destined to excel and find fulfillment.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;