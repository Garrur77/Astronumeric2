import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { calculateDestinyNumber, getPrediction } from '../utils/calculations';
import { UserData, PredictionResult, JobDetails } from '../types';
import { BookOpen, Briefcase, Share2 } from 'lucide-react';
import { jobDetails } from '../utils/jobData';
import JobModal from '../components/JobModal';

const ResultPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUserData = sessionStorage.getItem('userData');
    
    if (!storedUserData) {
      // If no data, redirect to predict page
      navigate('/predict');
      return;
    }

    try {
      const parsedData = JSON.parse(storedUserData) as UserData;
      setUserData(parsedData);

      // Simulate loading for effect
      setTimeout(() => {
        const destinyNumber = calculateDestinyNumber(
          parsedData.day,
          parsedData.month,
          parsedData.year
        );
        setPrediction(getPrediction(destinyNumber));
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/predict');
    }
  }, [navigate]);

  const handleJobClick = (job: string) => {
    const details = jobDetails[job];
    if (details) {
      setSelectedJob(details);
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 relative">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-transparent border-r-gold border-b-transparent border-l-transparent rounded-full animate-spin animation-delay-500"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-gold animate-pulse">
          Consulting the cosmic energies...
        </p>
      </div>
    );
  }

  if (!userData || !prediction) {
    return null;
  }

  const jobList = prediction.jobs.split(', ');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto prediction-container"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-cinzel mb-4">
          <span className="text-gold">Destiny Revealed</span>
        </h1>
        <p className="text-xl text-accent/90">
          Hello <span className="font-medium text-white">{userData.name}</span>, here is your cosmic career guidance
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20 mb-12"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-full md:w-1/3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="aspect-square bg-primary-dark/50 rounded-full flex items-center justify-center border-4 border-gold p-2"
            >
              <div className="text-center">
                <h2 className="text-7xl font-bold text-gold">{prediction.number}</h2>
                <p className="text-sm uppercase tracking-wider mt-1">Your Destiny Number</p>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-cinzel text-gold mb-4">Your Cosmic Career Profile</h2>
            <p className="mb-6 text-accent/90">
              Based on your birthdate ({userData.day}/{userData.month}/{userData.year}), 
              your destiny number is <strong>{prediction.number}</strong>. 
              This number resonates with specific career energies that align with your life path.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-gold" size={20} />
              <h3 className="text-xl font-medium">Your Lucky Professions</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {jobList.map((job, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm hover:bg-white/10 hover:border-gold transition-all cursor-pointer"
                  onClick={() => handleJobClick(job.trim())}
                >
                  {job.trim()}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <h2 className="text-2xl font-cinzel text-gold mb-6 text-center">Career Visualization</h2>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 overflow-hidden">
          <img 
            src={prediction.image} 
            alt="Career visualization" 
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="text-center">
            <p className="text-accent/90 mb-4">
              This visual representation embodies the essence of your cosmic career path.
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline py-2 px-4 text-sm flex items-center gap-2"
                onClick={() => window.open('https://www.naukri.com/', '_blank')}
              >
                <BookOpen size={16} />
                <span>Explore Jobs</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline py-2 px-4 text-sm flex items-center gap-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Cosmic Career Prediction',
                      text: `According to AstroNumeric, my destiny number is ${prediction.number} and my lucky jobs are: ${prediction.jobs}`,
                      url: window.location.href,
                    });
                  }
                }}
              >
                <Share2 size={16} />
                <span>Share Result</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-accent/80 text-sm">
            <strong className="text-gold">Reminder:</strong> The calculations are based on your destiny number, and since everyone's date of birth is unique, 
            the results may vary from person to person. Your complete date of birth guides us in determining your ideal profession.
          </p>
          <p className="mt-4 text-accent/80 text-sm">
            God Bless You 🙏. Believe in your luck and your hard work.
          </p>
        </div>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary mt-8"
          onClick={() => navigate('/predict')}
        >
          Try Another Prediction
        </motion.button>
      </motion.div>

      {selectedJob && (
        <JobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          jobDetails={selectedJob}
        />
      )}
    </motion.div>
  );
};

export default ResultPage;