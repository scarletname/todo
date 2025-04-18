import { create } from 'zustand';
import { Task, Filters } from '../App';
import { loadTasks, saveTasks } from '../storage/localStorage';
import { addTask, deleteTask, updateTask } from '../core/tasks';

interface TaskState {
  tasks: Task[];
  filters: Filters;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  setFilters: (filters: Filters) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: loadTasks(),
  filters: { status: 'all', priority: 'all', date: 'all', search: '' },
  setTasks: (tasks) => {
    set({ tasks });
    saveTasks(tasks);
  },
  addTask: (task) => {
    set((state) => {
      const newTasks = addTask(state.tasks, task);
      saveTasks(newTasks);
      return { tasks: newTasks, filters: { status: 'all', priority: 'all', date: 'all', search: '' } };
    });
  },
  deleteTask: (id) => {
    set((state) => {
      const newTasks = deleteTask(state.tasks, id);
      saveTasks(newTasks);
      return { tasks: newTasks };
    });
  },
  updateTask: (id, updatedTask) => {
    set((state) => {
      const newTasks = updateTask(state.tasks, id, updatedTask);
      saveTasks(newTasks);
      return { tasks: newTasks };
    });
  },
  setFilters: (filters) => set({ filters }),
}));
