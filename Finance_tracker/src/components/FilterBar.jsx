function FilterBar({ setSearch, setCategory, setDateRange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        className="input"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)} className="input">
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Shopping">Shopping</option>
      </select>
      <input
        type="date"
        onChange={(e) =>
          setDateRange((prev) => ({ ...prev, from: e.target.value }))
        }
        className="input"
      />
      <input
        type="date"
        onChange={(e) =>
          setDateRange((prev) => ({ ...prev, to: e.target.value }))
        }
        className="input"
      />
    </div>
  );
}
export default FilterBar;
