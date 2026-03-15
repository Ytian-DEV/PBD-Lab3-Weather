import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle({ theme, onToggle }) {
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={label}
    >
      {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
      <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
