import React from 'react';
import TaskForm from './components/TaskForm';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Система управления задачами</h1>
      <TaskForm />
    </div>
  );
};

export default App;
