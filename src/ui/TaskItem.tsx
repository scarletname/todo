import React, { useState } from 'react';
import { Task } from '../App';
import { getPriorityDisplayName } from '../utils/priorityUtils';

interface TaskItemProps {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  isValidDueDate: (date: string) => boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, updateTask, isValidDueDate }) => {
  // Состояния для редактирования задачи
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editTags, setEditTags] = useState(task.tags.join(', '));
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [error, setError] = useState('');

  // Проверка, просрочена ли задача
  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  // Сохранение изменений после редактирования
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
      tags: editTags.split(',').map((tag) => tag.trim()).filter(Boolean),
      dueDate: editDueDate || null,
    });
    setIsEditing(false);
    setError('');
  };

  return (
    <div className={`task-item ${isOverdue ? 'overdue' : ''}`}>
      {isEditing ? (
        // Режим редактирования: все поля в одну строку
        <div className="edit-row">
          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <select value={editPriority} onChange={(e) => setEditPriority(e.target.value as Task['priority'])}>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
          <input type="text" value={editTags} onChange={(e) => setEditTags(e.target.value)} placeholder="Теги (через запятую)" />
          <input type="date" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} />
          <button onClick={handleSave}>Сохранить</button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        // Режим просмотра: отображение информации о задаче
        <div className="task-content">
          <span
            onClick={() => updateTask(task.id, { completed: !task.completed })}
            className={task.completed ? 'completed' : ''}
          >
            {task.title}
          </span>
          <p>
            Статус: {task.completed ? 'Выполнено' : 'Не выполнено'} | 
            Приоритет: {getPriorityDisplayName(task.priority)} | 
            Теги: {task.tags.join(', ') || 'нет'} | 
            Срок: {task.dueDate || 'нет'}
          </p>
        </div>
      )}
      {/* Кнопки для редактирования и удаления */}
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
