import type React from "react"

import { motion } from "framer-motion"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "outline" | "glow"
  className?: string
  icon?: React.ReactNode
}

export default function Button({ children, onClick, variant = "primary", className = "", icon }: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300"

  const variantClasses = {
    primary: "btn-primary",
    outline: "btn-outline",
    glow: "glow-button",
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  )
}
