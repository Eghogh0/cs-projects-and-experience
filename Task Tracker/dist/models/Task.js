// Using nanoid with TypeScript
import { nanoid } from 'nanoid';
export default class Task {
    // Constructor with typed parameters and default values
    constructor(title, description = '', dueDate = null, tags = []) {
        this.id = nanoid(8);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
        this.createdAt = new Date();
        this.tags = tags;
    }
    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
    }
    removeTag(tag) {
        this.tags = this.tags.filter(t => t !== tag);
    }
    // Toggle completion status
    toggleComplete() {
        this.completed = !this.completed;
        return this;
    }
    // Format the due date nicely (or return a fallback)
    getFormattedDueDate() {
        if (!this.dueDate)
            return 'No due date';
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium'
        }).format(new Date(this.dueDate));
    }
    // Create a Task from plain object (useful for deserialization)
    static fromObject(obj) {
        const task = new Task(obj.title, obj.description ?? '', obj.dueDate ? new Date(obj.dueDate) : null, obj.tags ?? []);
        if (obj.id)
            task.id = obj.id;
        if (obj.completed !== undefined)
            task.completed = obj.completed;
        if (obj.createdAt)
            task.createdAt = new Date(obj.createdAt);
        return task;
    }
    // Convert instance to a plain object (useful for saving)
    toObject() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            completed: this.completed,
            createdAt: this.createdAt,
            tags: this.tags
        };
    }
}
//# sourceMappingURL=Task.js.map