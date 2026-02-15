// src/pages/Donors.jsx
import React, { useEffect, useState } from 'react';
import { getDonors, deleteDonor } from '../services/donorService';

export default function Donors(){
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDonors();
        const data = res?.data ?? res;
        // if backend returns an array directly, keep it
        setDonors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('load donors', err);
        setDonors([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id){
    if(!confirm('Delete donor?')) return;
    try {
      await deleteDonor(id);
      setDonors(prev => prev.filter(d => d && d.id !== id));
    } catch(e){
      console.error(e);
      alert('Delete failed');
    }
  }

  function handleView(d){
    // simple quick view popup — you can replace with modal
    alert(JSON.stringify(d, null, 2));
  }

  if(loading) return <div className="panel">Loading donors…</div>;
  if(!donors || !donors.length) return <div className="panel">No donors found</div>;

  return (
    <div>
      <h1 className="colorful-title">Donors</h1>

      <div style={{marginTop:12}}>
        {donors.filter(Boolean).map(d => {
          // defensive fallbacks for missing fields
          const name = d?.name || d?.fullName || d?.email || 'Unknown';
          const initial = String(name).charAt(0).toUpperCase() || 'U';
          const phone = d?.phone || '—';
          const blood = d?.blood_type || d?.bloodType || '—';
          const available = (d?.available === 0 || d?.available === false) ? false : Boolean(d?.available);
          const city = d?.city || '—';
          const address = d?.address || '-';
          const userId = d?.user_id ?? d?.userId ?? '—';
          const key = d?.id ?? d?.email ?? Math.random();

          return (
            <div key={key} className="panel" style={{display:'flex',gap:16,alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <div style={{
                  width:56,height:56,borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center',
                  background:'linear-gradient(135deg,#6ee7b7,#60a5fa)',color:'#fff',fontWeight:700,fontSize:20
                }}>
                  {initial}
                </div>

                <div>
                  <div style={{fontWeight:700,color:'#dbeafe'}}>{name}</div>
                  <div style={{color:'#cbd5e1', marginTop:6}}>• {phone}</div>
                  <div style={{marginTop:8}}>
                    <span style={{display:'inline-block',background:'#7f1d1d',color:'#fff',padding:'3px 8px',borderRadius:6,fontWeight:700,marginRight:8}}>
                      {blood}
                    </span>
                    <span style={{color:'#94a3b8'}}>Available: {available ? 'Yes' : 'No'}</span>
                    <span style={{color:'#94a3b8', marginLeft:12}}>City: {city}</span>
                  </div>
                  <div style={{color:'#94a3b8', marginTop:6}}>Address: {address}</div>
                  <div style={{color:'#94a3b8'}}>Linked User ID: {userId}</div>
                </div>
              </div>

              <div style={{display:'flex',gap:8}}>
                <button className="btn" onClick={() => handleView(d)}>View</button>
                <button className="btn" style={{background:'#b91c1c'}} onClick={() => handleDelete(d.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
