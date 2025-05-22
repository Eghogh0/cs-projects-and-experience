import inquirer from 'inquirer';
import chalk from 'chalk';
// Import commands
import addTask from './commands/add.js';
import listTasks from './commands/list.js';
import completeTask from './commands/complete.js';
import deleteTask from './commands/delete.js';
import showStatistics from './commands/stats.js';
import searchTasks from './commands/search.js';
import exportTasks from './commands/export.js';
import listByDueDate from './commands/due.js';
import manageTags from './commands/tag.js';
// Welcome message using template literals
console.log(chalk.blue(`
╔════════════════════════════════════╗
║ ${chalk.bold('Task Manager CLI')}  ║
║ A modern JavaScript demo project   ║
╚════════════════════════════════════╝
`));
// Main menu function using async/await
async function mainMenu() {
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    { name: 'Add a new task', value: 'add' },
                    { name: 'List all tasks', value: 'list' },
                    { name: 'Mark a task as complete', value: 'complete' },
                    { name: 'Delete a task', value: 'delete' },
                    { name: 'Show statistics', value: 'stats' },
                    { name: 'Search tasks', value: 'search' },
                    { name: 'Export tasks to CSV', value: 'export' },
                    { name: 'List tasks by due date', value: 'due' },
                    { name: 'Manage tags', value: 'tags' },
                    { name: 'Exit', value: 'exit' }
                ]
            }
        ]);
        // Exit if requested
        if (action === 'exit') {
            console.log(chalk.green('Goodbye!'));
            break;
        }
        // Execute the selected command using object literal
        const commands = {
            add: addTask,
            list: listTasks,
            complete: completeTask,
            delete: deleteTask,
            stats: showStatistics,
            search: searchTasks,
            export: exportTasks,
            due: listByDueDate,
            tags: manageTags
        };
        await commands[action]();
    }
}
// Start the application with error handling
mainMenu().catch(error => {
    console.error(chalk.red('Error:'), error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map