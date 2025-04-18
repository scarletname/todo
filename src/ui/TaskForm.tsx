import React, { useState } from 'react';
import { Task } from '../App';

interface TaskFormProps {
  addTask: (task: Task) => void;
  isValidDueDate: (date: string) => boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask, isValidDueDate }) => {
  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [tags, setTags] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length < 3) {
      setError('Название должно быть минимум 3 символа');
      return;
    }
    if (dueDate && !isValidDueDate(dueDate)) {
      setError('Дата не может быть раньше сегодня');
      return;
    }
    addTask({
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      dueDate: dueDate || null,
    });
    setTitle('');
    setPriority('medium');
    setTags('');
    setDueDate('');
    setError('');
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Task['priority'];
    setPriority(value);
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
      <div className="form-row">
        <div className="priority-tags-row">
          <select value={priority} onChange={handlePriorityChange}>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Теги (через запятую)"
          />
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default TaskForm;
