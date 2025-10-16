# 🗓️ Event Management System (Backend)

This is a backend API built using **Node.js**, **Express**, and **PostgreSQL** for managing events and user registrations.

## 🚀 Features
- Create, read, update, and delete (CRUD) events  
- Register users for events  
- Cancel event registrations  
- Connects to PostgreSQL (Cloud SQL / Supabase)  
- Organized project structure with controllers and routes  

---

## 🏗️ Project Structure
Event_Management/
│
├── server.js
├── .env
├── package.json
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   ├── eventController.js
│   │   ├── registrationController.js
│   │   └── userRegistrationController.js
│   └── routes/
│       ├── eventRoutes.js
│       ├── registrationRoutes.js
│       └── userRoutes.js
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
git clone https://github.com/your-username/Event_Management.git

### 2️⃣ Navigate to the folder
cd Event_Management

### 3️⃣ Install dependencies
npm install

### 4️⃣ Set up environment variables  
Create a `.env` file in the project root:
DB_USER=your_db_user  
DB_HOST=your_db_host  
DB_NAME=your_db_name  
DB_PASSWORD=your_db_password  
DB_PORT=5432  

### 5️⃣ Start the server
npm run dev

Server will start on **http://localhost:3000**

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| **GET** | `/events` | Get all events |
| **POST** | `/events` | Create a new event |
| **PUT** | `/events/:id` | Update an existing event |
| **DELETE** | `/events/:id` | Delete an event |
| **POST** | `/events/:id/register` | Register a user for an event |
| **DELETE** | `/events/:id/register/:userId` | Cancel registration |
| **POST** | `/users/register` | Create/register a new user |

---

## 🧰 Tech Stack
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Dotenv** for environment variables
- **Nodemon** for auto-restart during development

---

## 🧑‍💻 Author
**Anshu Mehra**  
BCA Student at Pal College of Management and Technology  
Passionate about web development and backend systems 🚀
