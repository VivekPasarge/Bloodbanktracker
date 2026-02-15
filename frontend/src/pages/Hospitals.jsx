// src/pages/Hospitals.jsx
import React, {useEffect, useState} from 'react';
import { getHospitals } from '../services/hospitalService';

export default function Hospitals(){
  const [hosp, setHosp] = useState([]);
  useEffect(()=> {
    (async () => {
      try {
        const res = await getHospitals();
        const data = res?.data ?? res;
        setHosp(Array.isArray(data) ? data : []);
      } catch(e){ console.error(e) }
    })();
  }, []);

  return (
    <div>
      <h1 className="colorful-title">Hospitals</h1>

      <div style={{marginTop:12}} className="panel">
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Address</th><th>City</th><th>Phone</th><th>Lat</th><th>Lng</th><th>Map</th></tr></thead>
          <tbody>
            {hosp.map(h => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.name ?? '—'}</td>
                <td>{h.address ?? '—'}</td>
                <td>{h.city ?? '—'}</td>
                <td>{h.phone ?? '—'}</td>
                <td>{h.latitude ?? '—'}</td>
                <td>{h.longitude ?? '—'}</td>
                <td><a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${h.latitude || 0},${h.longitude || 0}`}>Map</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
