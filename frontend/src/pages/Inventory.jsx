// src/pages/Inventory.jsx
import React, {useEffect, useState} from 'react';
import { getInventory, deleteInventory } from '../services/inventoryService';
import { isAdmin } from '../services/authUtils'

export default function Inventory(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const admin = isAdmin()

  useEffect(()=> {
    (async () => {
      try {
        const res = await getInventory();
        const data = res?.data ?? res;
        setItems(Array.isArray(data) ? data : []);
      } catch (e) { console.error(e) }
      setLoading(false);
    })();
  }, []);

  async function handleDelete(id){
    if(!confirm('Delete inventory item?')) return;
    try {
      await deleteInventory(id);
      setItems(prev => prev.filter(x => (x.id ?? x.blood_type) !== id));
    } catch(err){
      console.error(err); alert('Delete failed');
    }
  }

  return (
    <div>
      <h1 className="colorful-title">Inventory</h1>

      {loading ? <div className="footer-muted">Loading...</div> : null}

      <div style={{marginTop:12}} className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Blood Type</th>
              <th>Units</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id ?? i.blood_type}>
                <td>{i.id ?? '-'}</td>
                <td>{i.blood_type ?? i.bloodType ?? i.type}</td>
                <td>{i.units ?? i.quantity ?? '-'}</td>
                <td>
                  <button className="btn" onClick={()=>alert(JSON.stringify(i,null,2))}>View</button>
                  {admin && (
  <button
    className="btn"
    style={{ marginLeft: 8, background: '#b91c1c' }}
    onClick={() => handleDelete(i.id ?? i.blood_type)}
  >
    Delete
  </button>
)}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
