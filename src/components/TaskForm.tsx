import React, { useState } from 'react';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Добавлена задача:', title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default TaskForm;
