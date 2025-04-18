import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import Filters from './components/Filters';
import './styles/App.css';

// Экспортируем тип для задачи
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  dueDate: string | null;
}

// Экспортируем тип для фильтров
export interface Filters {
  status: 'all' | 'completed' | 'pending';
  priority: 'all' | 'low' | 'medium' | 'high';
  date: 'all' | 'today' | 'week' | 'month' | 'overdue';
  search: string;
}

const App: React.FC = () => {
  // Инициализируем состояние tasks, загружая данные из localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Ошибка при загрузке задач из localStorage:', error);
      return [];
    }
  });

  // Состояние для фильтров
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    priority: 'all',
    date: 'all',
    search: '',
  });

  // Сохраняем задачи в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Ошибка при сохранении задач в localStorage:', error);
    }
  }, [tasks]);

  // Отладочный вывод для проверки состояния tasks
  useEffect(() => {
    console.log('Текущее состояние tasks:', tasks);
  }, [tasks]);

  // Добавление задачи и сброс фильтров
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    // Сбрасываем фильтры, чтобы новая задача точно отобразилась
    setFilters({
      status: 'all',
      priority: 'all',
      date: 'all',
      search: '',
    });
  };

  // Удаление задачи
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Обновление задачи
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Проверка даты (не раньше текущей)
  const isValidDueDate = (date: string): boolean => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  // Фильтрация задач
  const filteredTasks = tasks
    .filter((task) => {
      if (filters.status === 'completed' && !task.completed) return false;
      if (filters.status === 'pending' && task.completed) return false;
      return true;
    })
    .filter((task) => {
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      return true;
    })
    .filter((task) => {
      if (!task.dueDate) return filters.date === 'all';
      const date = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      switch (filters.date) {
        case 'today':
          return date.toDateString() === today.toDateString();
        case 'week':
          const weekLater = new Date(today);
          weekLater.setDate(today.getDate() + 7);
          return date >= today && date <= weekLater;
        case 'month':
          const monthLater = new Date(today);
          monthLater.setMonth(today.getMonth() + 1);
          return date >= today && date <= monthLater;
        case 'overdue':
          return date < today;
        default:
          return true;
      }
    })
    .filter((task) =>
      task.title.toLowerCase().includes(filters.search.toLowerCase())
    );

  // Группировка по приоритету
  const groupedTasks: { [key: string]: Task[] } = filteredTasks.reduce(
    (acc, task) => {
      const key = task.priority;
      acc[key] = acc[key] || [];
      acc[key].push(task);
      return acc;
    },
    {} as { [key: string]: Task[] }
  );

  // Простой поиск с задержкой
  let searchTimeout: NodeJS.Timeout | null = null;
  const handleSearch = (value: string) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setFilters({ ...filters, search: value });
    }, 300);
  };

  return (
    <div className="app">
      <h1>Система управления задачами</h1>
      <TaskForm addTask={addTask} isValidDueDate={isValidDueDate} />
      <Filters filters={filters} setFilters={setFilters} handleSearch={handleSearch} />
      <div>
        {Object.entries(groupedTasks).map(([priority, tasks]) => (
          <div key={priority}>
            <h2>{priority.toUpperCase()}</h2>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
                isValidDueDate={isValidDueDate}
              />
            ))}
          </div>
        ))}
        {filteredTasks.length === 0 && <p>Нет задач</p>}
      </div>
    </div>
  );
};

export default App;
