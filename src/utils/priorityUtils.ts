export const getPriorityDisplayName = (priority: string): string => {
    const priorityMap: Record<string, string> = {
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      all: 'Все',
    };
    return priorityMap[priority] || priority;
  };
