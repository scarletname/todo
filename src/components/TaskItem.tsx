import React, { useState } from 'react';
import { Task } from '../App';

interface TaskItemProps {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.length < 3) return;
    updateTask(task.id, { title: editTitle });
    setIsEditing(false);
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
