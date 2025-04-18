import React from 'react';

interface Filters {
  status: 'all' | 'completed' | 'pending';
}

interface FiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  return (
    <div className="filters">
      <div>
        <label>Статус:</label>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as Filters['status'] })}
        >
          <option value="all">Все</option>
          <option value="completed">Выполненные</option>
          <option value="pending">Невыполненные</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
