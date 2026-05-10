"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/ui/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[calc(100vh-80px)] mt-20 bg-bg-primary text-text-muted">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
        <p className="text-sm uppercase tracking-widest font-bold">Initializing Radar Systems...</p>
      </div>
    </div>
  ),
});

export default function InteractiveMapClient() {
  return <MapComponent />;
}
