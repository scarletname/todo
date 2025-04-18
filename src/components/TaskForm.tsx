import React, { useState } from 'react';
import { Task } from '../App';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length < 3) {
      setError('Название должно быть минимум 3 символа');
      return;
    }
    addTask({ id: Math.random().toString(), title });
    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Добавить</button>
    </form>
  );
};

export default TaskForm;
