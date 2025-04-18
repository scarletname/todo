import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import './styles/App.css';

export interface Task {
  id: string;
  title: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="app">
      <h1>Система управления задачами</h1>
      <TaskForm addTask={addTask} />
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default App;
