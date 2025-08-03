document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const taskForm = document.getElementById('taskForm');
    const taskTableBody = document.querySelector('#taskTable tbody');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('taskSearch');

    // Title-case conversion
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, txt =>
            txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        );
    }

    // Show modal
    addTaskBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Hide modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function renderTasks(tasks) {
        taskTableBody.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${toTitleCase(task.name)}</td>
                <td>${task.description}</td>
                <td>${formatDate(task.created_at)}</td>
                <td>
                    <button class="edit-btn" data-id="${task.id}">✏️</button>
                    <button class="delete-btn" data-id="${task.id}" data-name="${task.name}">🗑️</button>
                </td>
            `;
            taskTableBody.appendChild(row);
        });
    }

    function fetchTasks() {
        fetch('/dashboard/firsttask/public/tasks')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch tasks');
                return res.json();
            })
            .then(data => {
                data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                renderTasks(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                alert('Failed to load tasks');
            });
    }

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = toTitleCase(document.getElementById('taskName').value);
        const description = document.getElementById('taskDesc').value;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        fetch('/dashboard/firsttask/public/tasks', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: formData
        })
            .then(res => {
                if (!res.ok) throw new Error('Request failed');
                return res.json();
            })
            .then(() => {
                modal.style.display = 'none';
                this.reset();
                fetchTasks();
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Something went wrong.');
            });
    });

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        fetch(`/dashboard/firsttask/public/tasks/search?q=${encodeURIComponent(query)}`, {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Search failed');
                return res.json();
            })
            .then(data => renderTasks(data))
            .catch(err => {
                console.error('Search error:', err);
                alert('Failed to search tasks');
            });
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    searchInput.addEventListener('input', function () {
        if (this.value.trim() === '') {
            fetchTasks(); // Reload all tasks when search is cleared
        }
    });

    fetchTasks();

    const editModal = document.getElementById('editTaskModal');
    const editTaskForm = document.getElementById('editTaskForm');
    const closeEditModalBtn = document.getElementById('closeEditModalBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-btn')) {
            const taskId = e.target.dataset.id;

            fetch(`/dashboard/firsttask/public/tasks/${taskId}`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch task data');
                    return res.json();
                })
                .then(task => {
                    document.getElementById('editTaskId').value = task.id;
                    document.getElementById('editTaskName').value = task.name;
                    document.getElementById('editTaskDesc').value = task.description;
                    editModal.style.display = 'flex';
                })
                .catch(err => {
                    console.error('Error loading task:', err);
                    alert('Failed to load task for editing.');
                });
        }

        // Delete with confirmation
        if (e.target.classList.contains('delete-btn')) {
            const taskId = e.target.dataset.id;
            const taskName = e.target.dataset.name;

            const confirmed = confirm(`Are you sure you want to delete the task: "${taskName}"?`);
            if (!confirmed) return;

            fetch(`/dashboard/firsttask/public/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error('Delete failed');
                    return res.json();
                })
                .then(() => {
                    alert('Task deleted successfully.');
                    fetchTasks();
                })
                .catch(err => {
                    console.error('Delete error:', err);
                    alert('Failed to delete task.');
                });
        }
    });

    editTaskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskId = document.getElementById('editTaskId').value;
        const name = toTitleCase(document.getElementById('editTaskName').value);
        const description = document.getElementById('editTaskDesc').value;

        fetch(`/dashboard/firsttask/public/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ name, description })
        })
            .then(res => {
                if (!res.ok) throw new Error('Update failed');
                return res.json();
            })
            .then(() => {
                alert('Task updated successfully!');
                editModal.style.display = 'none';
                fetchTasks();
            })
            .catch(err => {
                console.error('Update error:', err);
                alert('Failed to update task.');
            });
    });

    closeEditModalBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    cancelEditBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });

});
