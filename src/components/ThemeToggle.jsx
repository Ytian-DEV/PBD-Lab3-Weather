export default function ThemeToggle({ theme, onToggle }) {
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={label}
    >
      <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
