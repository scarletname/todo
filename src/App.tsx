import React from 'react';
import TaskForm from './ui/TaskForm';
import TaskItem from './ui/TaskItem';
import Filters from './ui/Filters';
import { useTaskStore } from './store/taskStore';
import { filterTasks, groupTasksByPriority } from './core/tasks';
import { isValidDueDate } from './utils/dateUtils';
import { getPriorityDisplayName } from './utils/priorityUtils';
import './styles/App.css';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  dueDate: string | null;
}


export interface Filters {
  status: 'all' | 'completed' | 'pending';
  priority: 'all' | 'low' | 'medium' | 'high';
  date: 'all' | 'today' | 'week' | 'month' | 'overdue';
  search: string;
}

const App: React.FC = () => {
  // Получаем задачи и фильтры из Zustand store
  const { tasks, filters, addTask, deleteTask, updateTask, setFilters } = useTaskStore();

  // Задержка для поиска (debounce), чтобы избежать частых обновлений фильтров
  let searchTimeout: NodeJS.Timeout | null = null;
  const handleSearch = (value: string) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setFilters({ ...filters, search: value });
    }, 300);
  };

  // Фильтруем и группируем задачи по приоритету
  const filteredTasks = filterTasks(tasks, filters);
  const groupedTasks = groupTasksByPriority(filteredTasks);

  return (
    <div className="app">
      <h1>Система управления задачами</h1>
      {/* Компонент для добавления новой задачи */}
      <TaskForm addTask={addTask} isValidDueDate={isValidDueDate} />
      {/* Компонент для фильтрации задач */}
      <Filters filters={filters} setFilters={setFilters} handleSearch={handleSearch} />
      <div>
        {/* Показываем сообщение, если задач нет */}
        {Object.entries(groupedTasks).length === 0 && <p>Нет задач</p>}
        {/* Отображаем задачи, сгруппированные по приоритету */}
        {Object.entries(groupedTasks).map(([priority, tasks]) => (
          <div key={priority}>
            <h2>{getPriorityDisplayName(priority).toUpperCase()}</h2>
            {tasks.length === 0 ? (
              <p>Нет задач в этой категории</p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  isValidDueDate={isValidDueDate}
                />
              ))
            )}
          </div>
        ))}
        </div>
    </div>
  );
};

export default App;
