# Hello! 👋

This is **laraveltask**, my first Laravel project — a simple **Task Management System**.

---

## 🔐 Login Page

> ![Login](https://media.discordapp.net/attachments/1401584516140630026/1401584533056262184/image.png?ex=6890ced0&is=688f7d50&hm=79aab74e975f8281ce273ad71fe9c19b6b2cc3134443430e4688704fa34809e9&=&format=webp&quality=lossless&width=1460&height=686)
The user first lands on the login page.  
If they don’t have an account yet, they can click the register link.

---

## 📝 Registration Page

> ![Register](https://media.discordapp.net/attachments/1401584516140630026/1401584569978978385/image.png?ex=6890ced9&is=688f7d59&hm=c0145be91a824e27e66327bd51eab934d763a2102d478fbd03741873d0673390&=&format=webp&quality=lossless&width=1457&height=686)
New users can create an account here.  
Once registered, they are automatically redirected to the Home Page.

---

## 🏠 Home Page

> ![Home](https://media.discordapp.net/attachments/1401584516140630026/1401584691500286006/image.png?ex=6890cef6&is=688f7d76&hm=f340c7acb1018b452de99c15d21a39fb39a8e92d75ebf0020dabf2ed6982e114&=&format=webp&quality=lossless&width=1463&height=686)
This is the main dashboard for managing tasks. Each user gets their own homepage with their tasks only.

---

### ✏️ Features on the Home Page

- **View a Task**  
  > ![View](https://media.discordapp.net/attachments/1401584516140630026/1401584691500286006/image.png?ex=6890cef6&is=688f7d76&hm=f340c7acb1018b452de99c15d21a39fb39a8e92d75ebf0020dabf2ed6982e114&=&format=webp&quality=lossless&width=1463&height=686)
  See full details of a task.

- **Search Tasks**  
  > ![Search](https://media.discordapp.net/attachments/1401584516140630026/1401584927824154735/image.png?ex=6890cf2e&is=688f7dae&hm=8b9760a88165e8c064cfb3774b533bb49099b0a8d8548775434bce88bdd704a0&=&format=webp&quality=lossless&width=1468&height=686)  
  Search for a task by keyword.

- **Add a Task**  
  > ![Add](https://media.discordapp.net/attachments/1401584516140630026/1401584971210293309/image.png?ex=6890cf39&is=688f7db9&hm=71a575e2328437fd70171aa6992ca7e0f6f8e8b772cf6bda0e1effb98dde9950&=&format=webp&quality=lossless&width=1470&height=686) 
  Add a new task with details like title, description, and due date.

- **Edit a Task**  
  > ![Edit](https://media.discordapp.net/attachments/1401584516140630026/1401584831506284655/image.png?ex=6890cf18&is=688f7d98&hm=b051e1ddf3f88a757d5244639669e94a6e06c2071e80dcc691e6fe32874114e2&=&format=webp&quality=lossless&width=1466&height=686)
  Update the task information as needed.

- **Delete a Task**  
  > ![Delete](https://media.discordapp.net/attachments/1401584516140630026/1401586196257308712/image.png?ex=6890d05d&is=688f7edd&hm=5cc2886bd24b222413684d4c3acb4ca13ba77a54d6f023873a1ecbe3451b4bdd&=&format=webp&quality=lossless&width=1486&height=686)
  Remove a task permanently.

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
