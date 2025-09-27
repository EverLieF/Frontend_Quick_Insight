'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export interface AnimatedListProps {
  /** Элементы списка */
  children: React.ReactNode[];
  /** Дополнительные CSS классы */
  className?: string;
  /** Задержка между анимациями элементов */
  staggerDelay?: number;
  /** Задержка начала анимации */
  initialDelay?: number;
  /** Направление анимации */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Длительность анимации */
  duration?: number;
  /** Тип анимации */
  animationType?: 'fade' | 'slide' | 'scale' | 'slideScale';
}

const directionVariants = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
};

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideScale: {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
  direction = 'up',
  duration = 0.4,
  animationType = 'slideScale',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      ...directionVariants[direction],
      opacity: 0,
      ...(animationType === 'scale' || animationType === 'slideScale' ? { scale: 0.8 } : {}),
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className={cn('w-full', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          layout
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedList;
