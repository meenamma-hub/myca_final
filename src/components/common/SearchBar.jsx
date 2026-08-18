function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="mb-5">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

export default SearchBar;