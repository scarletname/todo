import { Task } from '../App';

export const loadTasks = (): Task[] => {
  try {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Ошибка при загрузке задач из localStorage:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Ошибка при сохранении задач в localStorage:', error);
  }
};
