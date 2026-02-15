import React, { useEffect, useState } from 'react'
import CircleStat from '../components/CircleStat'
import { getInventory } from '../services/inventoryService'
import { getDonors } from '../services/donorService'

import LiveMap from "../components/LiveMap"
import { centers } from "../data/centers"

export default function Dashboard() {
  const [inventory, setInventory] = useState([])
  const [donors, setDonors] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const r = await getInventory()
        setInventory(r.data || r)
      } catch (e) {
        console.error(e)
      }

      try {
        const d = await getDonors()
        setDonors(d.data || d)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const bloods = [
  { label: 'A+', percent: 60 },
  { label: 'O+', percent: 55 },
  { label: 'AB+', percent: 15, critical: true },
  { label: 'A-', percent: 60 },
  { label: 'B+', percent: 40 },
  { label: 'B-', percent: 10 },     // ✅ ADDED
  { label: 'AB-', percent: 40 },
  { label: 'O-', percent: 20 },
]

  return (
    <div>

      {/* ================= TOP GRID ================= */}
      <div className="top-grid">

        {/* ===== LEFT COLUMN ===== */}
        <div className="left-stack">

          {/* HERO / MISSION CARD */}
          <div className="panel hero-panel">
            <h2 className="hero-title">
  Saving Lives Starts With Availability
</h2>


            <p className="hero-tagline">
  Every unit of blood is a second chance at life.
  Monitor inventory in real time, respond faster in emergencies,
  and ensure no request goes unanswered.
</p>


            <div style={{
              marginTop: 16,
              display: 'flex',
              gap: 32
            }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>
                  {donors.length}
                </div>
                <div className="footer-muted">Active Donors</div>
              </div>

              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>
                  {inventory.length}
                </div>
                <div className="footer-muted">Blood Records</div>
              </div>

              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>
                  {centers.length}
                </div>
                <div className="footer-muted">Donation Centers</div>
              </div>
            </div>
          </div>

          {/* BLOOD INVENTORY LEVELS */}
          <div className="panel">
            <h2 style={{ margin: 0, marginBottom: 12 }}>
              BLOOD INVENTORY LEVELS
            </h2>

            <div className="stats">
              {bloods.map(b => (
                <CircleStat key={b.label} {...b} />
              ))}
            </div>
          </div>

        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <aside className="right-stack">

          <div className="card-small">
            <h3 style={{ margin: 0 }}>RECENT DONATIONS</h3>
            <div style={{ marginTop: 8 }}>
              {donors && donors.length ? donors.slice(0, 4).map(d => (
                <div
                  key={d.id || d.email}
                  style={{
                    padding: 8,
                    borderTop: '1px solid rgba(255,255,255,0.12)'
                  }}
                >
                  {d.name || d.fullName} — {d.bloodType || d.type}
                </div>
              )) : (
                <div className="footer-muted">No donations</div>
              )}
            </div>
          </div>

          <div className="card-small">
            <h3 style={{ margin: 0 }}>NEARBY DONATION CENTERS</h3>
            <div style={{ height: 200, marginTop: 8 }}>
              <LiveMap centers={centers} />
            </div>
          </div>

          
        </aside>
      </div>

      {/* ================= BOTTOM TABLE ================= */}
      <div style={{ marginTop: 16 }} className="panel">
        <h3 style={{ margin: 0, marginBottom: 8 }}>
          UPCOMING BLOOD DRIVES
        </h3>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Event</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>City General Hospital</td>
              <td>Hall A</td>
              <td>2025-12-05</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}
