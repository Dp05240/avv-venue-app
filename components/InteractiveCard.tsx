'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface InteractiveCardProps {
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  delay?: number
}

export default function InteractiveCard({ title, description, icon, gradient, delay = 0 }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY
    
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className="interactive-card group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, z: 50 }}
    >
      <motion.div
        className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center mb-6`}
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.div
          className="text-white"
          animate={{
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {icon}
        </motion.div>
      </motion.div>
      
      <motion.h3
        className="text-2xl font-bold text-white mb-4"
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {title}
      </motion.h3>
      
      <motion.p
        className="text-white/70 leading-relaxed"
        animate={{
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>
      
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
} 