"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dynamic Gradient Base */}
      <div className="absolute inset-0 bg-bg-primary transition-colors duration-700" />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-red/10 blur-[120px] dark:bg-brand-red/20"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-brand-navy/10 blur-[100px] dark:bg-brand-navy/30"
      />

      {/* 3D Motion Grid */}
      <div className="absolute inset-0 perspective-[1000px]">
        <motion.div
          initial={{ rotateX: 60, y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 origin-center"
        >
          <div 
            className="w-full h-[200%] bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
            style={{
              transform: "translateZ(-100px) rotateX(15deg)",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </motion.div>
      </div>

      {/* Additional Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary" />
      
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translateZ(-100px) rotateX(15deg) translateY(0); }
          100% { transform: translateZ(-100px) rotateX(15deg) translateY(40px); }
        }
      `}</style>
    </div>
  );
}
