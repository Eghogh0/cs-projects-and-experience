import chalk from 'chalk';
import { loadTasks } from '../utils/storage.js';
import { TaskProps } from '../models/Task.js';

export default async function listByDueDate() {
  try {
    const tasks = await loadTasks();

    // Sort by due date (nulls go to the bottom)
    const sorted = tasks.slice().sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

    if (sorted.length === 0) {
      console.log(chalk.dim('No tasks found.'));
      return;
    }

    console.log(chalk.blue.bold('\nTasks by Due Date:'));
    console.log('====================');

    for (const task of sorted) {
      const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';
      const status = task.completed ? chalk.green('✓') : chalk.yellow('○');
      const title = task.completed ? chalk.dim(task.title) : chalk.white(task.title);
      console.log(`${status} ${title} - Due: ${chalk.cyan(due)} [${task.id}]`);
    }

    console.log('====================');
  } catch (err) {
    console.error(chalk.red('Error listing tasks by due date:'), err);
  }
}
