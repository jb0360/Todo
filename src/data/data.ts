export interface Task {
  id: number;
  task: string;
  priority: 'Low' | 'Medium' | 'High';
  progress: 'To Do' | 'In progress' | 'Done';
}

const tasks: Task[] = [
  { id: 1, task: 'Go to gym', priority: 'High', progress: 'To Do' },
  { id: 2, task: 'Read a book', priority: 'Low', progress: 'Done' },
  { id: 3, task: 'Go to market', priority: 'Medium', progress: 'In progress' },
  { id: 4, task: 'Restart learning solidworks', priority: 'High', progress: 'To Do' },
];

export default tasks;