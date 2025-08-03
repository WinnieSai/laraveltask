# Hello! 👋

This is **laraveltask**, my first Laravel project — a simple **Task Management System**.

---

## 🔐 Login Page

> *insert image here*  
The user first lands on the login page.  
If they don’t have an account yet, they can click the register link.

---

## 📝 Registration Page

> *insert image here*  
New users can create an account here.  
Once registered, they are automatically redirected to the Home Page.

---

## 🏠 Home Page

> *insert image here*  
This is the main dashboard for managing tasks. Each user gets their own homepage with their tasks only.

---

### ✏️ Features on the Home Page

- **Search Tasks**  
  > *insert image here*  
  Search for a task by keyword.

- **Add a Task**  
  > *insert image here*  
  Add a new task with details like title, description, and due date.

- **Edit a Task**  
  > *insert image here*  
  Update the task information as needed.

- **Delete a Task**  
  > *insert image here*  
  Remove a task permanently.

- **View a Task**  
  > *insert image here*  
  See full details of a task.

---

## 🔐 User-Specific Pages

Each user has their own login and task list — no one else can see or edit their tasks.

---

## ⚙️ Tech Stack

- Laravel 10+
- Blade templating engine
- MySQL or SQLite (configured via `.env`)
- Bootstrap or custom CSS (optional)

---

## 📌 Note

To run this project:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
