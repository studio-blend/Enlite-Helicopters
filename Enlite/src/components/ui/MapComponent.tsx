"use client";

import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search, MapPin, Target, ChevronUp, ChevronDown, List, Crosshair } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Fix for default marker icons in react-leaflet
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom pin icon for our marker
const CustomPin = L.divIcon({
  className: "custom-pin",
  html: `<div style="width: 24px; height: 24px; background-color: #ef4444; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const CITIES = [
  { name: "New Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Chandigarh", lat: 30.7333, lng: 76.7794 },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
  { name: "Patna", lat: 25.5941, lng: 85.1376 },
  { name: "Kochi", lat: 9.9312, lng: 76.2673 },
  { name: "Guwahati", lat: 26.1445, lng: 91.7362 },
  { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
  { name: "Indore", lat: 22.7196, lng: 75.8577 },
  { name: "Surat", lat: 21.1702, lng: 72.8311 },
  { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185 },
  { name: "Vadodara", lat: 22.3072, lng: 73.1812 },
  { name: "Srinagar", lat: 34.0837, lng: 74.7973 },
  { name: "Bhubaneswar", lat: 20.2961, lng: 85.8245 },
  { name: "Dehradun", lat: 30.3165, lng: 78.0322 },
  { name: "Raipur", lat: 21.2514, lng: 81.6296 },
  { name: "Ranchi", lat: 23.3441, lng: 85.3096 },
  { name: "Amritsar", lat: 31.6340, lng: 74.8723 },
  { name: "Agra", lat: 27.1767, lng: 78.0081 },
  { name: "Varanasi", lat: 25.3176, lng: 83.0034 },
  { name: "Madurai", lat: 9.9252, lng: 78.1198 },
  { name: "Mysore", lat: 12.2958, lng: 76.6394 },
  { name: "Jodhpur", lat: 26.2389, lng: 73.0243 },
];

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function MapEvents({ setCenter }: { setCenter: (pos: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      setCenter([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapComponent() {
  // Default center: India (Nagpur approx center)
  const [center, setCenter] = useState<[number, number]>([21.1458, 79.0882]);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [locationName, setLocationName] = useState("India (Center)");
  const [showCities, setShowCities] = useState(false);

  // Reverse geocoding to get location name from coordinates
  useEffect(() => {
    const getName = async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${center[0]}&lon=${center[1]}&zoom=10`);
        const data = await res.json();
        if (data.display_name) {
          const parts = data.display_name.split(',');
          setLocationName(parts[0] + (parts[1] ? `, ${parts[1]}` : ''));
        }
      } catch (err) {
        console.error("Reverse geocoding error:", err);
      }
    };
    if (mounted) getName();
  }, [center, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const citiesInRange = useMemo(() => {
    return CITIES.map(city => ({
      ...city,
      distance: getDistance(center[0], center[1], city.lat, city.lng)
    })).filter(city => city.distance <= 500).sort((a, b) => a.distance - b.distance);
  }, [center]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=in`);
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setCenter([parseFloat(lat), parseFloat(lon)]);
        setSearchQuery("");
      } else {
        alert("Location not found. Please try a different name.");
      }
    } catch (err) {
      console.error("Search error:", err);
      alert("Error searching for location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  if (!mounted) return <div className="w-full h-full bg-bg-tertiary animate-pulse" />;

  return (
    <div className="relative flex flex-col lg:flex-row w-full h-[calc(100vh-80px)] mt-20 overflow-hidden bg-bg-primary">
      {/* Mobile Header / Search Bar Overlay */}
      <div className="lg:hidden absolute top-4 left-4 right-4 z-[500] flex flex-col gap-2">
        <div className="bg-bg-secondary/90 backdrop-blur-md border border-border-default rounded-2xl shadow-2xl p-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
              className="w-full bg-bg-primary/50 border border-border-default rounded-xl pl-10 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red transition-all"
            />
            <Search className={cn("absolute left-3 top-3.5 w-4 h-4 text-text-muted", isSearching && "animate-pulse")} />
            <div className="absolute right-2 top-2 flex gap-1">
              <button
                type="submit"
                disabled={isSearching}
                className="p-1.5 text-brand-red hover:bg-brand-red/10 rounded-lg transition-colors"
              >
                {isSearching ? <div className="w-4 h-4 border-2 border-brand-red border-t-transparent rounded-full animate-spin" /> : <Target className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleLocateMe}
                className="p-1.5 text-text-secondary hover:text-brand-red rounded-lg transition-colors"
              >
                <Crosshair className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-text-muted">Radar:</span>
              <span className="text-[10px] font-semibold text-text-accent truncate max-w-[150px]">{locationName}</span>
            </div>
            <button
              onClick={() => setShowCities(true)}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter text-brand-red"
            >
              <List className="w-3 h-3" /> {citiesInRange.length} Cities
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar (Hidden on mobile) */}
      <div className="hidden lg:flex w-[400px] h-full bg-bg-secondary flex-col border-r border-border-default z-10 shadow-xl">
        <div className="p-6 border-b border-border-default">
          <h2 className="text-2xl font-bold mb-2">Operational Range</h2>
          <div className="flex items-center gap-2 mb-4 p-3 bg-bg-primary border border-border-default rounded-lg">
            <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Launch Point:</span>
            <span className="text-xs font-semibold text-text-primary truncate">{locationName}</span>
          </div>
          <p className="text-text-secondary text-sm mb-6">
            Search for any city in India or drag the pin to visualize the 500 km delivery radius.
          </p>

          <form onSubmit={handleSearch} className="relative mb-3">
            <input
              type="text"
              placeholder="Search any city or town..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
              className="w-full bg-bg-primary border border-border-default rounded-lg pl-10 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors disabled:opacity-50"
            />
            <Search className={`absolute left-3 top-3.5 w-4 h-4 text-text-muted ${isSearching ? 'animate-pulse' : ''}`} />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-3 top-2.5 p-1 text-brand-red hover:bg-brand-red/10 rounded transition-colors"
            >
              {isSearching ? <div className="w-4 h-4 border-2 border-brand-red border-t-transparent rounded-full animate-spin" /> : <Target className="w-4 h-4" />}
            </button>
          </form>

          <button
            onClick={handleLocateMe}
            className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-text-secondary hover:text-brand-red transition-colors border border-dashed border-border-default rounded-lg hover:border-brand-red/50"
          >
            <MapPin className="w-3 h-3" /> Use My Current Location
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-text-primary">
              Destinations within 500km
            </h3>
            <span className="bg-brand-red/10 text-brand-red px-2 py-0.5 rounded text-xs font-bold">
              {citiesInRange.length}
            </span>
          </div>

          {citiesInRange.length > 0 ? (
            <div className="space-y-3">
              {citiesInRange.map((city, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-bg-primary border border-border-default hover:border-brand-red/30 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-brand-red" />
                    <span className="font-medium text-text-primary">{city.name}</span>
                  </div>
                  <span className="text-sm font-bold text-text-secondary group-hover:text-brand-red transition-colors">
                    {Math.round(city.distance)} km
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-text-muted">
              <MapPin className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No major cities found in this radius.<br />Try moving the pin closer to urban centers.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative h-full">
        <MapContainer
          center={center}
          zoom={5}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Marker
            position={center}
            icon={CustomPin}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                setCenter([position.lat, position.lng]);
              },
            }}
          />
          <Circle
            center={center}
            radius={500000} // 500km in meters
            pathOptions={{
              color: '#ef4444',
              fillColor: '#ef4444',
              fillOpacity: 0.1,
              weight: 2,
              dashArray: '5, 10'
            }}
          />
          <MapEvents setCenter={setCenter} />
        </MapContainer>

        {/* Map Overlay Badge - Repositioned for mobile */}
        <div className="absolute bottom-24 lg:bottom-auto lg:top-8 right-4 lg:right-8 z-[400] bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl pointer-events-none max-w-[200px] lg:max-w-none">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-brand-red animate-pulse" />
            <span className="text-white font-bold tracking-widest uppercase text-[10px] lg:text-xs">Radar Active</span>
          </div>
          <p className="text-gray-400 text-[10px] lg:text-xs leading-relaxed">
            500 km operational envelope for Enlite platforms.
          </p>
        </div>

        {/* Mobile Floating Locate Button */}
        <div className="lg:hidden absolute bottom-6 right-4 z-[400] flex flex-col gap-3">
          <button
            onClick={handleLocateMe}
            className="w-12 h-12 bg-brand-red text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <Crosshair className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Cities Drawer */}
      <AnimatePresence>
        {showCities && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCities(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[600]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 h-[70vh] bg-bg-secondary rounded-t-[32px] z-[601] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border-default">
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg text-text-primary">Destinations</h3>
                  <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Within 500km Range</p>
                </div>
                <button
                  onClick={() => setShowCities(false)}
                  className="w-10 h-10 rounded-full bg-bg-primary flex items-center justify-center border border-border-default"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {citiesInRange.length > 0 ? (
                  <div className="space-y-4">
                    {citiesInRange.map((city, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-bg-primary border border-border-default active:border-brand-red/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center">
                            <Target className="w-5 h-5 text-brand-red" />
                          </div>
                          <span className="font-bold text-text-primary text-lg">{city.name}</span>
                        </div>
                        <span className="text-base font-black text-brand-red">
                          {Math.round(city.distance)} <span className="text-[10px] uppercase">km</span>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-text-muted">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium">No major cities found.</p>
                    <p className="text-sm opacity-60">Try moving the map pin.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
