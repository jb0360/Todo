export interface Task {
  _id: number;
  taskTitle: string;
  priority: 'Low' | 'Medium' | 'High';
  progress: 'To Do' | 'In progress' | 'Done';
}

const tasks: Task[] = [
  { _id: 1, taskTitle: 'Go to gym', priority: 'High', progress: 'To Do' },
  { _id: 2, taskTitle: 'Read a book', priority: 'Low', progress: 'Done' },
  { _id: 3, taskTitle: 'Go to market', priority: 'Medium', progress: 'In progress' },
  { _id: 4, taskTitle: 'Restart learning solidworks', priority: 'High', progress: 'To Do' },
];

export default tasks;