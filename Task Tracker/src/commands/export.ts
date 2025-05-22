import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { loadTasks } from '../utils/storage.js';
import { TaskProps } from '../models/Task.js';

export default async function exportTasks() {
  try {
    const tasks = await loadTasks();
    if (tasks.length === 0) {
      console.log(chalk.yellow('No tasks to export.'));
      return;
    }

    // Prepare CSV header
    const headers = ['ID', 'Title', 'Description', 'Due Date', 'Completed', 'Created At'];
    const rows = tasks.map(task => [
      task.id,
      task.title.replace(/"/g, '""'),
      (task.description || '').replace(/"/g, '""'),
      task.dueDate ? new Date(task.dueDate).toISOString() : '',
      task.completed ? 'Yes' : 'No',
      new Date(task.createdAt!).toISOString()
    ]);

    // Combine into CSV string
    const csvContent =
      headers.join(',') +
      '\n' +
      rows.map(row => row.map(val => `"${val}"`).join(',')).join('\n');

    // Write to file
    const outputPath = path.resolve('tasks.csv');
    await fs.writeFile(outputPath, csvContent, 'utf8');

    console.log(chalk.green(`Tasks exported successfully to ${outputPath}`));
  } catch (error) {
    console.error(chalk.red('Failed to export tasks:'), error);
  }
}
