import type React from "react"

import { motion } from "framer-motion"

interface GlowingTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function GlowingText({ children, className = "", delay = 0 }: GlowingTextProps) {
  return (
    <motion.span
      className={`glowing-text ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.span>
  )
}
