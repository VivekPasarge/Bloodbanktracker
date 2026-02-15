import { useEffect, useState } from "react";

export default function ThemeSwitcher() {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || ""
  );

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  return (
    <select
      className="theme-select"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="">Default</option>
      <option value="green">Green</option>
      <option value="sunset">Sunset</option>
      <option value="purple">Purple</option>
      <option value="earth">Earth</option>
      <option value="ai-blue">AI Blue</option>
      <option value="nature">Nature</option>
      <option value="night">Night</option>
      <option value="neon">Neon</option>
      <option value="gold">Gold</option>
      <option value="light">Light</option>
    </select>
  );
}