export interface TaskProps {
    id?: string;
    title: string;
    description?: string;
    dueDate?: Date | string | null;
    completed?: boolean;
    createdAt?: Date | string;
    tags?: string[];
}
export default class Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date | null;
    completed: boolean;
    createdAt: Date;
    tags: string[];
    constructor(title: string, description?: string, dueDate?: Date | null, tags?: string[]);
    addTag(tag: string): void;
    removeTag(tag: string): void;
    toggleComplete(): Task;
    getFormattedDueDate(): string;
    static fromObject(obj: TaskProps): Task;
    toObject(): TaskProps;
}
