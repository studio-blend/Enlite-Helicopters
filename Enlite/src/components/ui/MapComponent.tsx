"use client";

import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search, MapPin, Target } from "lucide-react";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  const citiesInRange = useMemo(() => {
    return CITIES.map(city => ({
      ...city,
      distance: getDistance(center[0], center[1], city.lat, city.lng)
    })).filter(city => city.distance <= 500).sort((a, b) => a.distance - b.distance);
  }, [center]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const city = CITIES.find(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (city) {
      setCenter([city.lat, city.lng]);
    } else {
      alert("City not found in our simplified demo database.");
    }
  };

  if (!mounted) return <div className="w-full h-full bg-bg-tertiary animate-pulse" />;

  return (
    <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-80px)] mt-20 border-t border-border-default">
      {/* Sidebar */}
      <div className="w-full lg:w-[400px] h-[400px] lg:h-full bg-bg-secondary flex flex-col border-b lg:border-b-0 lg:border-r border-border-default z-10 shadow-xl">
        <div className="p-6 border-b border-border-default">
          <h2 className="text-2xl font-bold mb-2">Operational Range</h2>
          <p className="text-text-secondary text-sm mb-6">
            Drag the pin or click anywhere on the map to set a launch point and visualize the 500 km delivery radius.
          </p>

          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search major city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-primary border border-border-default rounded-lg pl-10 pr-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-text-muted" />
          </form>
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
              <p className="text-sm">No major cities found in this radius.<br/>Try moving the pin closer to urban centers.</p>
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative h-full min-h-[400px]">
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
        
        {/* Map Overlay Badge */}
        <div className="absolute bottom-8 right-8 z-[400] bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl pointer-events-none">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-brand-red animate-pulse" />
            <span className="text-white font-bold tracking-widest uppercase text-xs">Radar Active</span>
          </div>
          <p className="text-gray-400 text-xs max-w-[200px] leading-relaxed">
            Displaying theoretical maximum operational envelope (500 km) for Enlite platforms.
          </p>
        </div>
      </div>
    </div>
  );
}
