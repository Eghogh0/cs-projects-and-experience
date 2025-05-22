import chalk from 'chalk';

// Arrow function to format a single task for display
export const formatTask = (task) => {
  // Template literals for status and title
  const status = task.completed
    ? chalk.green('✓')
    : chalk.yellow('○');

  const title = task.completed
    ? chalk.dim(task.title)
    : chalk.white(task.title);

  // Format creation date using Intl API
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const created = dateFormatter.format(new Date(task.createdAt));

  // Final formatted string
  return `${status} ${title} ${chalk.dim(`[${task.id}] - Created: ${created}`)}`;
};

// Format tasks as a numbered list
export const formatTaskList = (tasks) => {
  if (tasks.length === 0) {
    return chalk.dim('No tasks found.');
  }

  return tasks
    .map((task, index) => `${chalk.blue(index + 1)}. ${formatTask(task)}`)
    .join('\n');
};
