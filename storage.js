// IndexedDB configuration
const DB_NAME = 'TodoListDB';
const DB_VERSION = 1;
const STORE_NAME = 'tasks';

let db = null;

// Initialize IndexedDB
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            
            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                objectStore.createIndex('completed', 'completed', { unique: false });
            }
        };
    });
}

// Load all tasks from IndexedDB
function loadTasks() {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error('Database not initialized'));
            return;
        }

        const transaction = db.transaction([STORE_NAME], 'readonly');
        const objectStore = transaction.objectStore(STORE_NAME);
        const request = objectStore.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Save all tasks to IndexedDB
function saveTasks(tasks) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error('Database not initialized'));
            return;
        }

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const objectStore = transaction.objectStore(STORE_NAME);

        // Clear existing tasks
        objectStore.clear();

        // Add all tasks
        tasks.forEach(task => {
            objectStore.add(task);
        });

        transaction.oncomplete = () => {
            console.log('Tasks saved to IndexedDB');
            resolve();
        };
        transaction.onerror = () => reject(transaction.error);
    });
}

// Hook into beforeFirstRender event to restore data
window.addEventListener('beforeFirstRender', function(event) {
    initDB()
        .then(function() {
            return loadTasks();
        })
        .then(function(savedTasks) {
            if (savedTasks && savedTasks.length > 0) {
                // Replace the tasks array in script.js
                tasks.length = 0;
                tasks.push(...savedTasks);
            }
        })
        .catch(function(error) {
            console.error('Error loading tasks from IndexedDB:', error);
        });
});

// Hook into afterRender event to save data
window.addEventListener('afterRender', function(event) {
    const tasksToSave = event.detail.tasks;
    
    saveTasks(tasksToSave);
});
