import { motion } from "framer-motion"
import Image from "../assets/Astro.png"
import { Link } from "react-router-dom"

interface LogoProps {
  size?: "small" | "medium" | "large"
  withText?: boolean
  className?: string
}

export default function Logo({ size = "medium", withText = true, className = "" }: LogoProps) {
  const sizes = {
    small: 40,
    medium: 60,
    large: 120,
  }

  const dimensions = sizes[size]

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      <motion.div className="relative" whileHover={{ rotate: 360 }} transition={{ duration: 4, ease: "linear" }}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500 blur-sm opacity-70"></div>
        <Image
          src="/assets/astro-logo.png"
          alt="AstroNumeric Logo"
          width={dimensions}
          height={dimensions}
          className="relative z-10 drop-shadow-lg"
          style={{
            filter: "drop-shadow(0 0 10px rgba(234, 179, 8, 0.5)) brightness(1.1) contrast(1.1) sepia(0.2)",
          }}
        />
      </motion.div>

      {withText && (
        <div className="flex flex-col">
          <span className="logo-text text-xl md:text-2xl lg:text-3xl relative">
            AstroNumeric
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold/0 via-gold to-gold/0 group-hover:w-full transition-all duration-500"></span>
          </span>
          <span className="text-xs text-gold/80">Cosmic Career Guidance</span>
        </div>
      )}
    </Link>
  )
}
