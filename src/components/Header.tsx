import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// Remove Sparkles if no longer needed, keep Menu and X
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Add AnimatePresence

// --- 1. Import your logo ---
import astroLogo from '../assets/Astro.png'; // Adjust path if needed

// Define prop types for NavLink if using TypeScript
interface NavLinkProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  currentPath: string;
  external?: boolean;
  mobile?: boolean;
  onClick?: () => void; // Add onClick for closing mobile menu
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Use smaller threshold
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#141e30]/90 backdrop-blur-md shadow-lg shadow-purple-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* --- Logo Section --- */}
          <Link to="/" className="flex items-center gap-3 group"> {/* Slightly increased gap */}
            {/* Keep the circular background div */}
            <motion.div
              className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-gold/30 group-hover:border-gold/80 transition-all duration-300 overflow-hidden" // Added overflow-hidden
              whileHover={{ scale: 1.1, rotate: 10 }} // Keep animation on the circle
              whileTap={{ scale: 0.9 }}
            >
              {/* --- 2. Place the img tag inside --- */}
              <img
                src={astroLogo}
                alt="AstroNumeric Logo"
                // Size the image *within* the circle
                className="h-6 w-6 object-contain" // Adjust size (h-6, h-7) as needed
              />
            </motion.div>
            {/* Site Title */}
            <span className="logo-text text-xl md:text-2xl relative font-semibold"> {/* Added font-semibold */}
              AstroNumeric
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold/0 via-gold to-gold/0 group-hover:w-full transition-all duration-500"></span>
            </span>
          </Link>
          {/* --- End Logo Section --- */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
             {/* Use the refined NavLink component */}
            <NavLink to="/" currentPath={location.pathname}>
              Home
            </NavLink>
            <NavLink to="/predict" currentPath={location.pathname}>
              Predict
            </NavLink>
            <NavLink href="https://www.naukri.com/" external>
              Jobs
            </NavLink>
            <NavLink to="/contact" currentPath={location.pathname}> {/* Fixed link */}
              Support
            </NavLink>

            {/* Call to action button */}
            <Link to="/predict"> {/* Link the button */}
              <motion.button
                className="ml-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full text-sm font-medium border border-purple-500/50 hover:border-gold/50 shadow-lg shadow-purple-900/20 hover:shadow-purple-700/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white focus:outline-none bg-white/10 p-2 rounded-full backdrop-blur-sm border border-transparent hover:border-white/20 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="md:hidden bg-[#141e30]/95 backdrop-blur-md border-t border-white/10 shadow-lg absolute w-full left-0" // Absolute position
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2"> {/* Reduced space-y */}
                {/* Pass toggleMenu to close on click */}
                <NavLink to="/" currentPath={location.pathname} mobile onClick={toggleMenu}>
                  Home
                </NavLink>
                <NavLink to="/predict" currentPath={location.pathname} mobile onClick={toggleMenu}>
                  Predict
                </NavLink>
                <NavLink href="https://www.naukri.com/" external mobile onClick={toggleMenu}>
                  Jobs
                </NavLink>
                <NavLink to="/contact" currentPath={location.pathname} mobile onClick={toggleMenu}> {/* Fixed link */}
                  Support
                </NavLink>

                <div className="pt-2 border-t border-white/10 mt-2"> {/* Add separator */}
                  <Link to="/predict" onClick={toggleMenu} className="block w-full"> {/* Link the button */}
                    <motion.button
                      className="w-full py-3 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-md font-medium border border-purple-500/50 shadow-lg shadow-purple-900/20 transition-all duration-300 text-base" // Changed to rounded-md for consistency
                      whileTap={{ scale: 0.98 }} // Slightly less intense tap
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Refined NavLink component
const NavLink: React.FC<NavLinkProps> = ({ children, to, href, currentPath, external, mobile, onClick }) => {
  // Determine if the link is active
  const isActive = !external && to && currentPath === to;

  // Base classes
  const baseClasses = `group relative font-medium transition-all duration-300 rounded-md flex items-center`;

  // Desktop/Mobile specific classes
  const layoutClasses = mobile
    ? "text-lg w-full text-left px-4 py-3" // Mobile: larger text, full width, padding
    : "text-sm px-3 py-2"; // Desktop: smaller text, padding

  // Active/Inactive state classes
  const stateClasses = isActive
    ? "text-gold bg-white/5 shadow-inner" // Active: gold text, subtle background
    : "text-accent hover:text-white hover:bg-white/10"; // Inactive: accent text, hover effect

  // Combine all classes
  const combinedClasses = `${baseClasses} ${layoutClasses} ${stateClasses}`;

  // Underline effect for Desktop only
  const underline = !mobile && (
    <span
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-300 ${
        isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
      }`}
    ></span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        onClick={onClick} // Handle mobile menu close
      >
        {children}
        {underline}
      </a>
    );
  }

  return (
    <Link
      to={to!} // Use non-null assertion assuming 'to' is provided for internal links
      className={combinedClasses}
      onClick={onClick} // Handle mobile menu close
    >
      {children}
      {underline}
    </Link>
  );
};

export default Header;