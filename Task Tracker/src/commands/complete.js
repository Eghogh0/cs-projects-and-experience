import inquirer from 'inquirer';
import chalk from 'chalk';
import { loadTasks, saveTasks } from '../utils/storage.js';
import { formatTaskList } from '../utils/formatters.js';
import Task from '../models/Task.js';

export default async function completeTask() {
  try {
    // Load existing tasks
    const tasks = await loadTasks();

    if (tasks.length === 0) {
      console.log(chalk.yellow('No tasks to complete.'));
      return;
    }

    // Display task list
    console.log(chalk.blue('\nSelect a task to mark as complete:'));
    console.log(formatTaskList(tasks));

    // Prompt for task number
    const { taskIndex } = await inquirer.prompt([
      {
        type: 'number',
        name: 'taskIndex',
        message: 'Enter task number:',
        validate: input => {
          const index = Number(input) - 1;
          return (index >= 0 && index < tasks.length)
            ? true
            : 'Please enter a valid task number';
        },
      },
    ]);

    const index = taskIndex - 1;

    // Toggle task completion
    const task = Task.fromObject(tasks[index]);
    task.toggleComplete();
    tasks[index] = task.toObject();

    // Save updated tasks
    await saveTasks(tasks);

    const status = task.completed ? 'completed' : 'incomplete';
    console.log(chalk.green(`✓ Task marked as ${status}!`));
  } catch (error) {
    console.error(chalk.red('Error completing task:'), error);
  }
}
