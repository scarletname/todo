import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import './styles/App.css';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, completed: false }]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  return (
    <div className="app">
      <h1>Система управления задачами</h1>
      <TaskForm addTask={addTask} />
      <div>
        {tasks.map((task) => (
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
