import "./index.css";

export default function SearchBar({
  username,
  setUsername,
  handleSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search GitHub Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}