export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <input
      type="text"
      placeholder="Search items..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full px-4 py-2 border rounded shadow-sm mb-4"
    />
  );
}