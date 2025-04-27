"use client"

import type React from "react"

import { motion } from "framer-motion"

interface CardProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export default function Card({ title, description, icon, className = "", children }: CardProps) {
  return (
    <motion.div
      className={`highlight-card p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex flex-col space-y-4">
        {icon && (
          <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center text-gold">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-white/80">{description}</p>
        {children}
      </div>
    </motion.div>
  )
}
