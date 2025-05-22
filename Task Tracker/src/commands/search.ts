import inquirer from 'inquirer';
import chalk from 'chalk';
import { loadTasks } from '../utils/storage.js';
import { formatTask } from '../utils/formatters.js';
import { TaskProps } from '../models/Task.js';

export default async function searchTasks() {
  try {
    const { keyword } = await inquirer.prompt([
      {
        type: 'input',
        name: 'keyword',
        message: 'Enter a keyword to search (title/description):',
        validate: input => input.trim() ? true : 'Keyword cannot be empty.'
      }
    ]);

    const tasks: TaskProps[] = await loadTasks();
    const lowerKeyword = keyword.toLowerCase();

    const filteredTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(lowerKeyword) ||
      (task.description && task.description.toLowerCase().includes(lowerKeyword))
    );

    console.log(chalk.blue.bold('\nSearch Results:'));
    console.log('====================');
    if (filteredTasks.length === 0) {
      console.log(chalk.dim('No tasks matched your search.'));
    } else {
      filteredTasks.forEach((task, index) => {
        console.log(`${chalk.blue(index + 1)}. ${formatTask(task)}`);
      });
    }
    console.log('====================');
  } catch (error) {
    console.error(chalk.red('Error searching tasks:'), error);
  }
}
