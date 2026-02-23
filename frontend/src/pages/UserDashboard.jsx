import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDonors } from "../services/donorService";

export default function UserDashboard() {
  const [isDonor, setIsDonor] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function checkDonor() {
      try {
        const res = await getDonors();
        const donors = res.data || [];

        const exists = donors.some(
          d => String(d.userId ?? d.user_id) === String(userId)
        );

        setIsDonor(exists);
      } catch (e) {
        console.error(e);
      }
    }

    if (userId) checkDonor();
  }, [userId]);

  return (
    <div>
      <h1 className="colorful-title">
        Welcome, {localStorage.getItem("name")}
      </h1>

      <div className="dashboard-grid">
        <Link to="/requests/new" className="dashboard-card user-card">
          Request Blood
        </Link>

        {!isDonor ? (
          <Link to="/become-donor" className="dashboard-card user-card">
            Become a Donor
          </Link>
        ) : (
          <Link to="/donors" className="dashboard-card user-card">
            My Donor Profile
          </Link>
        )}

        <Link to="/hospitals" className="dashboard-card user-card">
          View Hospitals
        </Link>

        <Link to="/deliveries" className="dashboard-card user-card">
          Track Deliveries
        </Link>
      </div>
    </div>
  );
}
