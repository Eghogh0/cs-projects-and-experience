import inquirer from 'inquirer';
import chalk from 'chalk';
import { loadTasks, saveTasks } from '../utils/storage.js';
import Task from '../models/Task.js';
export default async function manageTags() {
    const tasks = (await loadTasks()).map(Task.fromObject);
    const { taskId } = await inquirer.prompt({
        type: 'input',
        name: 'taskId',
        message: 'Enter Task ID to modify tags:'
    });
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        console.log(chalk.red('Task not found.'));
        return;
    }
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to do with tags?',
        choices: ['Add Tag', 'Remove Tag', 'View Tags']
    });
    if (action === 'Add Tag') {
        const { tag } = await inquirer.prompt({
            type: 'input',
            name: 'tag',
            message: 'Enter tag to add:'
        });
        task.addTag(tag);
        console.log(chalk.green(`Tag "${tag}" added.`));
    }
    else if (action === 'Remove Tag') {
        const { tag } = await inquirer.prompt({
            type: 'list',
            name: 'tag',
            message: 'Select tag to remove:',
            choices: task.tags
        });
        task.removeTag(tag);
        console.log(chalk.yellow(`Tag "${tag}" removed.`));
    }
    else {
        console.log(chalk.blue('Tags:'), task.tags.join(', ') || 'No tags');
    }
    await saveTasks(tasks.map(t => t.toObject()));
}
//# sourceMappingURL=tag.js.map