import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="search-bar">
            <span className="search-bar__icon">⌕</span>

            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search magical creatures..."
                aria-label="Search magical creatures"
            />

            {value && (
                <button
                    type="button"
                    className="search-bar__clear"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default SearchBar;