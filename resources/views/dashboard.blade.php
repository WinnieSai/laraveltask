<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Task Tracker</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app3.css', 'resources/js/app3.js'])
</head>
<body>

    <header class="header">
        <h1>Task Tracker</h1>
        <div class="username">
            <span>{{ ucfirst(strtolower(Auth::user()->name)) }}</span>
            <span style="margin: 0 8px;">|</span>
            <a href="{{ route('logout') }}" class="logout">Logout</a>
        </div>
    </header>

    <section class="search-add">
        <input type="text" id="taskSearch" placeholder="Search task...">
        <button id="searchBtn">🔍</button>
        <button id="addTaskBtn">➕</button>
    </section>

    <table id="taskTable" class="task-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Date Created</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>

    <div id="taskModal" class="modal" style="display: none;">
        <div class="modal-content">
            <h2>Add New Task</h2>
            <form id="taskForm">
                @csrf
                <label for="taskName">Task Name:</label>
                <input type="text" id="taskName" name="name" required>

                <label for="taskDesc">Description:</label>
                <textarea id="taskDesc" name="description" rows="4" required></textarea>

                <button type="submit">Submit</button>
                <button type="button" id="closeModalBtn">Cancel</button>
            </form>
        </div>
    </div>

    <div id="editTaskModal" class="modal">
  <div class="modal-content">
    <span id="closeEditModalBtn" class="close">&times;</span>
    <h2>Edit Task</h2>
    <form id="editTaskForm">
      <input type="hidden" id="editTaskId">

      <label for="editTaskName">Task Name</label>
      <input type="text" id="editTaskName" name="name" required>

      <label for="editTaskDesc">Description</label>
      <textarea id="editTaskDesc" name="description" required></textarea>

      <div class="modal-actions">
        <button type="submit">Save</button>
        <button type="button" id="cancelEditBtn">Cancel</button>
      </div>
    </form>
    </div>
    </div>

    <script>
    </script>

</body>
</html>
