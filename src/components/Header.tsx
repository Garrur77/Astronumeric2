import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Sparkles } from "lucide-react"
import { motion } from "framer-motion"


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#141e30]/90 backdrop-blur-md shadow-lg shadow-purple-900/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-gold/30 group-hover:border-gold/80 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Sparkles className="text-gold" size={24} />
            </motion.div>
            <span className="logo-text text-xl md:text-2xl relative">
              AstroNumeric
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold/0 via-gold to-gold/0 group-hover:w-full transition-all duration-500"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" currentPath={location.pathname}>
              Home
            </NavLink>
            <NavLink to="/predict" currentPath={location.pathname}>
              Predict
            </NavLink>
            <NavLink href="https://www.naukri.com/" external>
              Jobs
            </NavLink>
            <NavLink to="/contact" currentPath={location.pathname}>
              Support
            </NavLink>

            {/* Call to action button */}
            <NavLink to="/" currentPath={location.pathname}>
            <motion.button
              className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-full font-medium border border-purple-500/50 hover:border-gold/50 shadow-lg shadow-purple-900/20 hover:shadow-purple-700/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white focus:outline-none bg-white/10 p-2 rounded-full backdrop-blur-sm"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-[#141e30]/95 backdrop-blur-md border-t border-white/10 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <NavLink to="/" currentPath={location.pathname} mobile>
                Home
              </NavLink>
              <NavLink to="/predict" currentPath={location.pathname} mobile>
                Predict
              </NavLink>
              <NavLink href="https://www.naukri.com/" external mobile>
                Jobs
              </NavLink>
              <NavLink to="#" currentPath={location.pathname} mobile>
                Support
              </NavLink>

              <motion.button
                className="mt-2 w-full py-3 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-full font-medium border border-purple-500/50 shadow-lg shadow-purple-900/20 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}

// Custom NavLink component for consistent styling
const NavLink = ({ children, to, href, currentPath, external, mobile }) => {
  const content = (
    <motion.span
      className={`relative px-4 py-2 font-medium ${mobile ? "text-lg block w-full" : ""} ${
        to && currentPath === to ? "text-gold" : "text-white hover:text-gold"
      } transition-colors duration-300`}
      whileHover={{ x: mobile ? 5 : 0 }}
    >
      {children}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gold/0 via-gold to-gold/0 ${
          to && currentPath === to ? "w-1/2" : ""
        } group-hover:w-1/2 transition-all duration-300`}
      ></span>
    </motion.span>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`group ${mobile ? "block" : ""}`}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to} className={`group ${mobile ? "block" : ""}`}>
      {content}
    </Link>
  )
}

export default Header
