// src/pages/Requests.jsx
import React, {useEffect, useState} from 'react';
import { getRequests, updateRequest, deleteRequest } from '../services/requestService';

export default function Requests(){
  const [reqs, setReqs] = useState([]);
  useEffect(()=> {
    (async () => {
      try {
        const res = await getRequests();
        const data = res?.data ?? res;
        setReqs(Array.isArray(data) ? data : []);
      } catch (e) { console.error(e) }
    })();
  }, []);

  async function changeStatus(id, status){
    try {
      await updateRequest(id, { status });
      setReqs(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch(err){ console.error(err); alert('Status update failed') }
  }

  async function remove(id){
    if(!confirm('Delete request?')) return;
    try {
      await deleteRequest(id);
      setReqs(prev => prev.filter(r => r.id !== id));
    } catch(err){ console.error(err); alert('Delete failed') }
  }

  return (
    <div>
      <h1 className="colorful-title">Requests</h1>

      <div style={{marginTop:12}} className="panel">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Blood Type</th><th>Hospital ID</th><th>Notes</th><th>Requested By</th><th>Units</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {reqs.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.blood_type ?? r.bloodType ?? '—'}</td>
                <td>{r.hospital_id ?? r.hospitalId ?? '—'}</td>
                <td>{r.notes ?? '—'}</td>
                <td>{r.requested_by_user_id ?? r.requestedBy ?? '—'}</td>
                <td>{r.units ?? '—'}</td>
                <td>{r.status ?? '—'}</td>
                <td>
                  <button className="btn" onClick={()=>changeStatus(r.id, 'OPEN')}>Open</button>
                  <button className="btn" style={{marginLeft:8}} onClick={()=>changeStatus(r.id,'FULFILLED')}>Fulfill</button>
                  <button className="btn" style={{marginLeft:8, background:'#b91c1c'}} onClick={()=>remove(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
