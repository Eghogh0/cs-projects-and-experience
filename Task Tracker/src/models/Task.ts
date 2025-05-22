// TypeScript interface for Task properties
export interface TaskProps {
    id?: string;
    title: string;
    description?: string;
    dueDate?: Date | string | null;
    completed?: boolean;
    createdAt?: Date | string;
    tags?: string[]
  }
  
  // Using nanoid with TypeScript
  import { nanoid } from 'nanoid';
  
  export default class Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date | null;
    completed: boolean;
    createdAt: Date;
    tags: string[];
  
    // Constructor with typed parameters and default values
    constructor(title: string, description: string = '', dueDate: Date | null = null, tags: string[] = []) {
      this.id = nanoid(8);
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.completed = false;
      this.createdAt = new Date();
      this.tags = tags;
    }
  
    addTag(tag: string): void {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    }
  
    removeTag(tag: string): void {
      this.tags = this.tags.filter(t => t !== tag);
    }

    // Toggle completion status
    toggleComplete(): Task {
      this.completed = !this.completed;
      return this;
    }
  // Format the due date nicely (or return a fallback)
    getFormattedDueDate(): string {
      if (!this.dueDate) return 'No due date';
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium'
      }).format(new Date(this.dueDate));
    }

    // Create a Task from plain object (useful for deserialization)
    static fromObject(obj: TaskProps): Task {
      const task = new Task(
        obj.title,
        obj.description ?? '',
        obj.dueDate ? new Date(obj.dueDate) : null,
        obj.tags ?? []
      );
      if (obj.id) task.id = obj.id;
      if (obj.completed !== undefined) task.completed = obj.completed;
      if (obj.createdAt) task.createdAt = new Date(obj.createdAt);
      return task;
    }
  
    // Convert instance to a plain object (useful for saving)
    toObject(): TaskProps {
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
  