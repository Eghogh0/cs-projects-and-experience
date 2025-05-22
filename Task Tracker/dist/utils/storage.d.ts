import { TaskProps } from '../models/Task.js';
export declare function loadTasks(): Promise<TaskProps[]>;
export declare function saveTasks(tasks: TaskProps[]): Promise<boolean>;
export declare function exportTasksToCSV(tasks: TaskProps[], filePath: string): Promise<void>;
