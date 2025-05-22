import { TaskProps } from '../models/Task.js';
interface TaskStat {
    label: string;
    value: number;
    percentage?: string;
}
export declare function taskStatistics(tasks: TaskProps[]): Generator<TaskStat>;
export {};
