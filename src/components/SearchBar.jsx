export default function SearchBar({
  value,
  onChange,
  onSearch,
  disabled = false,
  helperText,
  buttonLabel = "Search city",
}) {
  function handleSubmit(event) {
    event.preventDefault();

    if (!disabled && onSearch) {
      onSearch();
    }
  }

  return (
    <form className="search-card" onSubmit={handleSubmit}>
      <div className="section-tag">Live Search</div>
      <h2>Search weather by city</h2>
      <p className="card-copy">
        Find live weather data, a short hourly outlook, and a 5-day forecast.
      </p>

      <label className="search-field" htmlFor="city-search">
        <span className="search-label">City name</span>
        <input
          id="city-search"
          name="city"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          placeholder="Enter a city"
        />
      </label>

      <button type="submit" disabled={disabled}>
        {buttonLabel}
      </button>

      {helperText ? <p className="helper-text">{helperText}</p> : null}
    </form>
  );
}
