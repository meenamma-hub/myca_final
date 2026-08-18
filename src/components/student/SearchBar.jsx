import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center gap-3 bg-white shadow rounded-lg px-4 py-2 w-full">
      <Search size={20} className="text-gray-500" />

      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full outline-none text-gray-700"
      />
    </div>
  );
};

export default SearchBar;