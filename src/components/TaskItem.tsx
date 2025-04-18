import React from 'react';

interface Task {
  id: string;
  title: string;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="task-item">
      <span>{task.title}</span>
    </div>
  );
};

export default TaskItem;
