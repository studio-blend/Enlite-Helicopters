"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const comparisonData = [
  {
    feature: "Payload Capacity",
    truck: "High (Tons)",
    drone: "Very Low (2-5 kg)",
    manned: "High (Tons)",
    enlite: "Optimal (70-100 kg)",
    highlight: true,
  },
  {
    feature: "Operational Range",
    truck: "Unlimited",
    drone: "Short (5-15 km)",
    manned: "Long (500+ km)",
    enlite: "Long (500 km)",
    highlight: true,
  },
  {
    feature: "Average Speed",
    truck: "Slow (40 km/h)",
    drone: "Medium (60 km/h)",
    manned: "Fast (250 km/h)",
    enlite: "Fast (200 km/h)",
    highlight: false,
  },
  {
    feature: "Operating Cost / Hour",
    truck: "Low",
    drone: "Very Low",
    manned: "Extremely High",
    enlite: "Low",
    highlight: true,
  },
  {
    feature: "Infrastructure Needed",
    truck: "Road Network",
    drone: "Minimal",
    manned: "Helipad & ATC",
    enlite: "Minimal (VTOL)",
    highlight: true,
  },
  {
    feature: "Terrain Independence",
    truck: false,
    drone: true,
    manned: true,
    enlite: true,
    highlight: false,
  },
  {
    feature: "Weather Tolerance",
    truck: true,
    drone: false,
    manned: true,
    enlite: true,
    highlight: false,
  },
];

export function ComparisonTable() {
  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <Check className="w-5 h-5 mx-auto text-emerald-500" />
      ) : (
        <X className="w-5 h-5 mx-auto text-red-500" />
      );
    }
    return val;
  };

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="min-w-[800px]">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 mb-6 px-6">
          <div className="col-span-1"></div>
          <div className="col-span-1 text-center font-semibold text-text-secondary uppercase tracking-wider text-xs">
            Road Transport
          </div>
          <div className="col-span-1 text-center font-semibold text-text-secondary uppercase tracking-wider text-xs">
            Battery Drone
          </div>
          <div className="col-span-1 text-center font-semibold text-text-secondary uppercase tracking-wider text-xs">
            Manned Heli
          </div>
          <div className="col-span-1 text-center font-bold text-brand-red uppercase tracking-wider text-sm bg-brand-red/10 py-2 rounded-t-xl">
            Enlite
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-3">
          {comparisonData.map((row, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
              className="grid grid-cols-5 gap-4 items-center bg-bg-card border border-border-default rounded-xl px-6 py-4 hover:border-brand-red/30 transition-colors group relative overflow-hidden"
            >
              {/* Highlight background for Enlite column */}
              <div className="absolute top-0 bottom-0 right-0 w-[20%] bg-brand-red/[0.03] border-x border-brand-red/10 pointer-events-none" />

              <div className="col-span-1 font-medium text-sm md:text-base">
                {row.feature}
              </div>
              <div className="col-span-1 text-center text-text-secondary text-sm">
                {renderValue(row.truck)}
              </div>
              <div className="col-span-1 text-center text-text-secondary text-sm">
                {renderValue(row.drone)}
              </div>
              <div className="col-span-1 text-center text-text-secondary text-sm">
                {renderValue(row.manned)}
              </div>
              <div className="col-span-1 text-center font-bold text-text-primary text-sm relative z-10">
                {renderValue(row.enlite)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
