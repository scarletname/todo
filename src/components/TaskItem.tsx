import React, { useState } from 'react';
import { Task } from '../App';

interface TaskItemProps {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  isValidDueDate: (date: string) => boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, updateTask, isValidDueDate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editTags, setEditTags] = useState(task.tags.join(', '));
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (editTitle.length < 3) {
      setError('Название должно быть минимум 3 символа');
      return;
    }
    if (editDueDate && !isValidDueDate(editDueDate)) {
      setError('Дата не может быть раньше сегодня');
      return;
    }
    updateTask(task.id, {
      title: editTitle,
      priority: editPriority,
      tags: editTags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
      dueDate: editDueDate || null,
    });
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <div className="form-row">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Task['priority'])}
            >
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
            <input
              type="text"
              value={editTags}
              onChange={(e) => setEditTags(e.target.value)}
              placeholder="Теги (через запятую)"
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button onClick={handleSave}>Сохранить</button>
        </div>
      ) : (
        <div className="task-content">
          <span
            onClick={() => updateTask(task.id, { completed: !task.completed })}
            className={task.completed ? 'completed' : ''}
          >
            {task.title}
          </span>
          <p>
            Статус: {task.completed ? 'Выполнено' : 'Не выполнено'} | 
            Приоритет: {task.priority} | 
            Теги: {task.tags.join(', ') || 'нет'} | 
            Срок: {task.dueDate || 'нет'}
          </p>
        </div>
      )}
      <div>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Отмена' : 'Редактировать'}
        </button>
        <button onClick={() => deleteTask(task.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default TaskItem;
