// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import CircleStat from "../components/CircleStat";
import { getInventory } from "../services/inventoryService";
import { getDonors } from "../services/donorService";
import { getMlPrediction } from "../services/mlService";
import LiveMap from "../components/LiveMap";
import { centers } from "../data/centers";
import "./Home.css";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [donors, setDonors] = useState([]);
  const [mlResult, setMlResult] = useState(null);

  /* LOAD DATA */
  useEffect(() => {
    async function load() {
      try {
        const inv = await getInventory();
        setInventory(inv?.data ?? []);
      } catch {}

      try {
        const d = await getDonors();
        setDonors(d?.data ?? []);
      } catch {}
    }
    load();
  }, []);

  /* ML LOGIC */
  useEffect(() => {
    if (!inventory.length) return;

    const total = inventory.reduce((s, i) => s + Number(i.units || 0), 0);
    const avg = Math.max(1, Math.ceil(total / 30));

    getMlPrediction(total, avg)
      .then(res => setMlResult(res.data))
      .catch(() =>
        setMlResult({
          risk: "SAFE",
          predictedDaysLeft: Math.max(1, Math.floor(total / avg))
        })
      );
  }, [inventory]);

  /* INVENTORY STATS */
  const bloodGroups = ["A+","O+","AB+","A-","B+","B-","AB-","O-"];
  const stats = bloodGroups.map(bg => {
    const rec = inventory.find(i => i.bloodType === bg);
    const units = rec?.units ?? 0;
    return {
      label: bg,
      percent: Math.min(100, Math.round((units / 100) * 100)),
      critical: units <= 20
    };
  });

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="home-hero">
        <h1 className="hero-title-main">Blood Inventory Overview</h1>

        <p className="hero-subtitle">
          Live monitoring of blood availability, donation activity,
          and predictive supply risk across centers.
        </p>

        <div className="hero-cards">
          <div className="hero-card">
            <strong>{donors.length}</strong>
            <span>Active Donors</span>
          </div>

          <div className="hero-card">
            <strong>{inventory.length}</strong>
            <span>Blood Records</span>
          </div>

          <div className="hero-card">
            <strong>{centers.length}</strong>
            <span>Donation Centers</span>
          </div>
        </div>
      </section>

      {/* INVENTORY — 🔴 FIX IS HERE */}
      <section className="section-box inventory-section">
        <h2>Blood Inventory Levels</h2>

        <div className="inventory-grid">
          {stats.map(b => (
            <CircleStat key={b.label} {...b} />
          ))}
        </div>
      </section>

      {/* STATUS */}
      <section className="status-grid">
        <div className={`section-box ml-risk ${mlResult?.risk?.toLowerCase()}`}>
          <h2>ML Stock Risk</h2>

          {mlResult && (
            <>
              <div className="risk">{mlResult.risk}</div>
              <p className="muted">
                Estimated days remaining: <b>{mlResult.predictedDaysLeft}</b>
              </p>
            </>
          )}
        </div>

        <div className="section-box">
          <h2>Recent Donations</h2>
          {donors.slice(0, 4).map(d => (
            <div key={d.id || d.email} className="row-divider">
              {d.name || d.fullName} — {d.bloodType}
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="section-box">
        <h2>Nearby Donation Centers</h2>
        <div className="map-wrap">
          <LiveMap centers={centers} />
        </div>
      </section>

      {/* EVENTS */}
      <section className="section-box">
        <h2>Upcoming Blood Drives</h2>
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
              <td>City Blood Donation Camp</td>
              <td>Community Hall</td>
              <td>
                {new Date(Date.now() + 7 * 86400000)
                  .toISOString()
                  .slice(0, 10)}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

    </div>
  );
}