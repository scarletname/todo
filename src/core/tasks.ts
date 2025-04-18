import { Task } from '../App';

export const addTask = (tasks: Task[], newTask: Task): Task[] => {
  return [...tasks, newTask];
};

export const deleteTask = (tasks: Task[], id: string): Task[] => {
  return tasks.filter((task) => task.id !== id);
};

export const updateTask = (
  tasks: Task[],
  id: string,
  updatedTask: Partial<Task>
): Task[] => {
  return tasks.map((task) =>
    task.id === id ? { ...task, ...updatedTask } : task
  );
};

export const filterTasks = (
  tasks: Task[],
  filters: { status: string; priority: string; date: string; search: string }
): Task[] => {
  return tasks
    .filter((task) => {
      if (filters.status === 'completed' && !task.completed) return false;
      if (filters.status === 'pending' && task.completed) return false;
      return true;
    })
    .filter((task) => {
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
      return true;
    })
    .filter((task) => {
      if (!task.dueDate) return filters.date === 'all';
      const date = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      switch (filters.date) {
        case 'today':
          return date.toDateString() === today.toDateString();
        case 'week':
          const weekLater = new Date(today);
          weekLater.setDate(today.getDate() + 7);
          return date >= today && date <= weekLater;
        case 'month':
          const monthLater = new Date(today);
          monthLater.setMonth(today.getMonth() + 1);
          return date >= today && date <= monthLater;
        case 'overdue':
          return date < today;
        default:
          return true;
      }
    })
    .filter((task) =>
      task.title.toLowerCase().includes(filters.search.toLowerCase())
    );
};

export const groupTasksByPriority = (tasks: Task[]): { [key: string]: Task[] } => {
  const grouped = tasks.reduce(
    (acc, task) => {
      const key = task.priority;
      acc[key] = acc[key] || [];
      acc[key].push(task);
      return acc;
    },
    {} as { [key: string]: Task[] }
  );

  Object.keys(grouped).forEach((priority) => {
    grouped[priority].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  });

  return grouped;
};
