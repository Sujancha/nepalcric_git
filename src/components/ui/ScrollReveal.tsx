'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    direction?: 'up' | 'down' | 'left' | 'right'
    delay?: number
    className?: string
}

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    className
}: ScrollRevealProps) {
    const directionMap = {
        up: { y: 32, x: 0 },
        down: { y: -32, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 }
    }

    const initial = { opacity: 0, ...directionMap[direction] }
    const animate = { opacity: 1, y: 0, x: 0 }

    return (
        <motion.div
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.76, 0, 0.24, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
