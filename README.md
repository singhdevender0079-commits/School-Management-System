# 🏫 School Management System

A simple **School Management System** built using **Node.js, Express.js, EJS, HTML, CSS, and SQL**.
This project demonstrates how a backend application can perform basic **CRUD (Create, Read, Update, Delete)** operations with a SQL database.

## 🚀 Features

* 👨‍🎓 Student Management
* 👨‍🏫 Teacher Management
* 🏫 Class Management
* ➕ Create/Add Records
* 📋 View Records
* ✏️ Update/Edit Records
* 🗑️ Delete Records
* 🗄️ SQL Database Integration
* 📄 Dynamic pages using EJS
* 🌐 Express.js routing
* 🎨 HTML & CSS based interface

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* EJS

### Backend

* Node.js
* Express.js

### Database

* SQL
* MySQL

### Tools

* VS Code
* Git
* GitHub
* MySQL Workbench

## 📂 Project Structure

```text
School-Management-System/
│
├── public/
│   └── style.css
│
├── views/
│   ├── students/
│   ├── teachers/
│   ├── classes/
│   └── layouts/
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> The exact folder structure may vary depending on the current version of the project.

## 🔄 CRUD Operations

This project implements the four basic database operations:

| Operation | Description                            |
| --------- | -------------------------------------- |
| Create    | Add new students, teachers, or classes |
| Read      | Display stored records                 |
| Update    | Edit existing records                  |
| Delete    | Remove records                         |

## 🗄️ Database

The project uses **MySQL** as the database.

Example entities include:

* Students
* Teachers
* Classes
* Class-Teacher relationships

SQL queries are used to insert, retrieve, update, and delete data.

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/School-Management-System.git
```

### 2. Navigate to the Project

```bash
cd School-Management-System
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure MySQL

Create the required database in MySQL and configure the database connection according to your local environment.

Example:

```text
Database: school_management
```

Make sure MySQL is running before starting the application.

### 5. Start the Server

```bash
node app.js
```

Or, if you are using Nodemon:

```bash
npx nodemon app.js
```

### 6. Open in Browser

```text
http://localhost:8080
```

## 🎯 Learning Objectives

This project was created to practice and understand:

* Node.js fundamentals
* Express.js
* EJS templating
* Routing
* HTTP requests
* CRUD operations
* SQL queries
* MySQL database connectivity
* Backend development
* MVC-style project organization
* Git and GitHub workflow

## 📌 Future Improvements

Possible improvements for future versions:

* 🔐 User authentication and authorization
* 👤 Admin dashboard
* 🔎 Search and filtering
* 📊 Student performance dashboard
* 📱 Better responsive design
* 🔒 Environment variables for database credentials
* ✅ Form validation
* ⚠️ Better error handling
* 📄 Pagination
* 🔗 REST API integration

## 👨‍💻 Author

**Devender Singh**

BTech CSE Student | Web Development & Programming Enthusiast

## ⭐ Project Status

🚧 **Learning Project**

This project was developed to strengthen backend development and database concepts using Node.js, Express.js, EJS, and MySQL.

---

⭐ If you find this project useful, consider giving the repository a star!
