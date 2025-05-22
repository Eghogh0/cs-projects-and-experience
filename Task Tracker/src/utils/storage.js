// ES6 module with promises and async/await for file operations
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../data.json');

// Load tasks from data file
export async function loadTasks() {
  try {
    // Check if file exists
    await fs.access(DATA_FILE);

    // Read and parse data
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Return empty array if file doesn't exist
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Save tasks to data file
export async function saveTasks(tasks) {
  const dir = path.dirname(DATA_FILE);

  // Create directory if it doesn't exist
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }

  // Write tasks to file
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  return true;
}
