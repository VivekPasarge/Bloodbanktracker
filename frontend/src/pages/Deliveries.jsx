// src/pages/Deliveries.jsx
import React, { useEffect, useState } from 'react';
import { getDeliveries, updateDeliveryStatus, deleteDelivery } from '../services/deliveryService';
import { isAdmin } from '../services/authUtils'

export default function Deliveries(){
  const [items, setItems] = useState(null); // null = loading, [] = loaded-empty
  const [error, setError] = useState(null);
  const admin = isAdmin()

  useEffect(() => {
    (async () => {
      try {
        const res = await getDeliveries();
        console.log('[Deliveries] raw response:', res);

        const body = res?.data ?? res;

        // tolerate different API shapes
        let list = [];
        if (Array.isArray(body)) {
          list = body;
        } else if (body && typeof body === 'object') {
          list = body.items || body.deliveries || body.data || body.results || [];
          if (!list.length) {
            for (const k of Object.keys(body)) {
              if (Array.isArray(body[k])) { list = body[k]; break; }
            }
          }
        }
        if (!Array.isArray(list) && body && typeof body === 'object') list = [body];
        console.log('[Deliveries] parsed list:', list);
        setItems(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error('[Deliveries] load error', err);
        setError(err);
        setItems([]); // show "no deliveries found" UI
      }
    })();
  }, []);

  async function setStatus(id, status){
    try {
      await updateDeliveryStatus(id, status);
      setItems(prev => prev.map(x => x.id === id ? {...x, status} : x));
    } catch(err){
      console.error(err);
      alert('Update failed');
    }
  }

  async function remove(id){
    if(!confirm('Delete this delivery?')) return;
    try {
      await deleteDelivery(id);
      setItems(prev => prev.filter(x => x.id !== id));
    } catch(err){
      console.error(err);
      alert('Delete failed');
    }
  }

  // helper to read multiple field name styles
  function field(x, ...names){
    for (const n of names) {
      if (x == null) return undefined;
      if (n.includes('.')) {
        const parts = n.split('.');
        let cur = x;
        for (const p of parts) { if (cur == null) { cur = undefined; break; } cur = cur[p]; }
        if (cur !== undefined) return cur;
      } else {
        if (x[n] !== undefined && x[n] !== null) return x[n];
      }
    }
    return undefined;
  }

  if (items === null) return <div className="panel">Loading deliveries…</div>;
  if (error) return <div className="panel">Error loading deliveries — check console</div>;

  if (!items.length) {
    return (
      <div>
        <h1 className="colorful-title">Deliveries</h1>
        <div className="panel">No deliveries found</div>
        <div style={{marginTop:12,fontSize:13,color:'#94a3b8'}}>
          Debug: open the browser console and run:
          <div style={{marginTop:6,background:'#0b1320',color:'#cbd5e1',padding:8,borderRadius:6,display:'inline-block'}}>
            <code>{`fetch(\`${window.location.protocol}//${window.location.hostname}:8080/api/deliveries\`).then(r=>r.json()).then(console.log).catch(console.error)`}</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="colorful-title">Deliveries</h1>

      <div className="panel" style={{overflowX:'auto', marginTop:12}}>
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Contact</th><th>Phone</th><th>Pickup</th><th>Drop</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map(x => {
              const id = field(x,'id','Id');
              const contact = field(x,'contact_name','contactName','name','contact');
              const phone = field(x,'contact_phone','contactPhone','phone','mobile');
              const pickup = field(x,'pickup_address','pickupAddress','pickup','pick_up_address');
              const drop = field(x,'drop_address','dropAddress','drop','drop_off_address');
              const status = field(x,'status','state');

              return (
                <tr key={id ?? JSON.stringify(x).slice(0,40)}>
                  <td>{id ?? '—'}</td>
                  <td>{contact ?? '—'}</td>
                  <td>{phone ?? '—'}</td>
                  <td>{pickup ?? '—'}</td>
                  <td>{drop ?? '—'}</td>
                  <td>{status ?? '—'}</td>
                  <td style={{ display: 'flex', gap: '8px' }}>
  {admin && (
  <>
    <button className="btn" onClick={() => setStatus(id,'IN_TRANSIT')}>In transit</button>
    <button className="btn" onClick={() => setStatus(id,'DELIVERED')}>Delivered</button>
    <button className="btn" style={{background:'#b91c1c'}} onClick={() => remove(id)}>Delete</button>
  </>
)}

</td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
