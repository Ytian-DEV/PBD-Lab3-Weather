export default function SearchBar({
  value,
  onChange,
  onSearch,
  disabled = false,
  helperText,
}) {
  function handleSubmit(event) {
    event.preventDefault();

    if (!disabled && onSearch) {
      onSearch();
    }
  }

  return (
    <form className="search-card" onSubmit={handleSubmit}>
      <div className="section-tag">Framework Starter</div>
      <h2>Search weather by city</h2>
      <p className="card-copy">
        The API-powered search flow is introduced in the next feature branch.
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
        Search city
      </button>

      {helperText ? <p className="helper-text">{helperText}</p> : null}
    </form>
  );
}
