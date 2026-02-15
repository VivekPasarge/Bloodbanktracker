import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icons for Leaflet
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LiveMap({ centers = [] }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Location error:", err);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const defaultCity = [12.9716, 77.5946]; // Bengaluru fallback

  return (
    <div style={{ height: "250px", width: "100%", borderRadius: "10px", overflow: "hidden" }}>

      <MapContainer
        center={position || defaultCity}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {position && (
          <Marker position={position}>
            <Popup>You are here (live location)</Popup>
          </Marker>
        )}

        {centers.map((c, idx) => (
          <Marker key={idx} position={[c.latitude, c.longitude]}>
            <Popup>
              <strong>{c.name}</strong> <br />
              {c.address} <br />
              {c.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
