import React from 'react';
import { Task } from '../App';

interface TaskItemProps {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, updateTask }) => {
  return (
    <div className="task-item">
      <span
        onClick={() => updateTask(task.id, { completed: !task.completed })}
        className={task.completed ? 'completed' : ''}
      >
        {task.title}
      </span>
      <div>
        <button onClick={() => deleteTask(task.id)}>Удалить</button>
      </div>
    </div>
  );
};

export default TaskItem;
