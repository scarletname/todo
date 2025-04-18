import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import Filters from './components/Filters';
import './styles/App.css';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Filters {
  status: 'all' | 'completed' | 'pending';
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<Filters>({ status: 'all' });

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, completed: false }]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filters.status === 'completed' && !task.completed) return false;
    if (filters.status === 'pending' && task.completed) return false;
    return true;
  });

  return (
    <div className="app">
      <h1>Система управления задачами</h1>
      <TaskForm addTask={addTask} />
      <Filters filters={filters} setFilters={setFilters} />
      <div>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
