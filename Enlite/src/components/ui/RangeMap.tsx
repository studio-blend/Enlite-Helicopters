"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export function RangeMap() {
  return (
    <div className="relative w-full aspect-square md:aspect-[16/9] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-border-default shadow-2xl flex items-center justify-center">
      {/* Abstract Map Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Radar Rings (500km radius visualization) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-[80%] h-[80%] md:w-[60vh] md:h-[60vh] rounded-full border border-brand-red/20 bg-brand-red/[0.02]"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute w-[50%] h-[50%] md:w-[35vh] md:h-[35vh] rounded-full border border-brand-red/40 bg-brand-red/[0.04]"
        />

        {/* Radar Sweep Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-[40%] h-[40%] md:w-[30vh] md:h-[30vh] origin-bottom-right bottom-1/2 right-1/2 border-r-2 border-brand-red/50"
          style={{
            background: "linear-gradient(to right, transparent, rgba(220, 38, 38, 0.1))"
          }}
        />

        {/* Center Point */}
        <div className="absolute w-4 h-4 bg-brand-red rounded-full shadow-[0_0_20px_rgba(220,38,38,0.8)] z-10 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>

      {/* Floating Info Cards */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 bg-black/60 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl max-w-[200px] md:max-w-[280px] z-20"
      >
        <div className="flex items-center gap-3 mb-2 text-brand-red">
          <Navigation className="w-5 h-5" />
          <h4 className="font-bold tracking-wider text-sm">OPERATIONAL RADIUS</h4>
        </div>
        <p className="text-3xl md:text-5xl font-bold text-white mb-1">500<span className="text-xl md:text-2xl text-white/50">km</span></p>
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
          Sufficient to cover major intercity routes bypassing all surface traffic.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-black/60 backdrop-blur-md border border-white/10 p-4 md:p-5 rounded-2xl flex items-center gap-4 z-20"
      >
        <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Example Route</p>
          <p className="text-sm md:text-base font-semibold text-white">Chennai ↔ Bangalore</p>
        </div>
      </motion.div>
    </div>
  );
}
