import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { centers } from "../data/centers";

/* ================= ICON ================= */

const cityIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

/* ================= MAP FLY ================= */

function FlyTo({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 13, { duration: 1.2 });
    }
  }, [coords, map]);

  return null;
}

/* ================= DISTANCE ================= */

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

/* ================= COMPONENT ================= */

export default function LiveMap() {
  const navigate = useNavigate();

  const DEFAULT_CITY = {
    name: "Bengaluru",
    coords: [12.9716, 77.5946],
  };

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  /* ===== SEARCH CITY / AREA ===== */

  const handleSearch = async (e) => {
    if (e.key !== "Enter" || !search.trim()) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
        search
      )}`
    );

    const data = await res.json();
    if (!data.length) return;

    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data[0].lon);

    const addr = data[0].address || {};
    let cityName =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.county ||
      addr.state_district ||
      search;

    // 🔥 Normalize Bengaluru
    if (
      cityName.toLowerCase().includes("bengaluru") ||
      cityName.toLowerCase().includes("bangalore")
    ) {
      cityName = "Bengaluru";
    }

    setSelectedCity({
      name: cityName,
      coords: [lat, lng],
    });
  };

  /* ===== MAP: SHOW NEARBY HOSPITALS ONLY ===== */

  useEffect(() => {
    const [cityLat, cityLng] = selectedCity.coords;

    const filtered = centers.filter((h) => {
      const dist = getDistanceKm(
        cityLat,
        cityLng,
        h.lat,
        h.lng
      );
      return dist <= 10; // 10 km radius for map
    });

    setNearbyHospitals(filtered);
  }, [selectedCity]);

  /* ===== GO TO HOSPITAL LIST ===== */

  const goToHospitals = () => {
    const [lat, lng] = selectedCity.coords;

    navigate(
      `/hospitals?lat=${lat}&lng=${lng}&city=${encodeURIComponent(
        selectedCity.name
      )}`
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="map-section">
      {/* BUTTON */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn primary" onClick={goToHospitals}>
          View Hospitals
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="map-search"
        placeholder="Search city or area (e.g. Bengaluru, Kengeri)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />

      {/* MAP */}
      <div className="live-map-wrapper">
        <MapContainer
          center={selectedCity.coords}
          zoom={13}
          className="live-map"
        >
          <FlyTo coords={selectedCity.coords} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* CITY MARKER */}
          <Marker position={selectedCity.coords} icon={cityIcon} />

          {/* HOSPITAL MARKERS */}
          {nearbyHospitals.map((h) => (
            <Marker
              key={h.id}
              position={[h.lat, h.lng]}
              eventHandlers={{
                click: () => {
                  window.open(
                    `https://www.openstreetmap.org/?mlat=${h.lat}&mlon=${h.lng}#map=17/${h.lat}/${h.lng}`,
                    "_blank"
                  );
                },
              }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}