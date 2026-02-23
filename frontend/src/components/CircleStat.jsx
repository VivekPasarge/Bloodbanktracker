export default function CircleStat({ label, percent, critical = false }) {
  const angle = Math.round(percent * 3.6);

  return (
    <div
      className="circle"
      style={{ "--value": `${angle}deg` }}
    >
      <div className="inner">
        <div className="circle-value">{percent}%</div>
        <div className="circle-label">{label}</div>
      </div>

      {critical && <span className="critical">CRITICAL</span>}
    </div>
  );
}
