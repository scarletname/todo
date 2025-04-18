import React from 'react';
import { Filters as FiltersType } from '../App';

interface FiltersProps {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
  handleSearch: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, handleSearch }) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Поиск задач..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="filter-row">
        <div>
          <label>Статус:</label>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value as FiltersType['status'] })
            }
          >
            <option value="all">Все</option>
            <option value="completed">Выполненные</option>
            <option value="pending">Невыполненные</option>
          </select>
        </div>
        <div>
          <label>Приоритет:</label>
          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value as FiltersType['priority'] })
            }
          >
            <option value="all">Все</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>
        <div>
          <label>Дата:</label>
          <select
            value={filters.date}
            onChange={(e) =>
              setFilters({ ...filters, date: e.target.value as FiltersType['date'] })
            }
          >
            <option value="all">Все</option>
            <option value="today">Сегодня</option>
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="overdue">Просроченные</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
