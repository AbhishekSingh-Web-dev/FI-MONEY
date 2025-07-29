# 📦 FI-MONEY Inventory Management System
A full-stack inventory management application built with the MERN stack and containerized with Docker.

This project provides a complete solution for managing products, including user authentication and a clean, responsive user interface.

---

## ✨ Features
- User Authentication: Secure user registration and login using JWT (JSON Web Tokens).
- Product Management: CRUD (Create, Read, Update, Delete) functionality for inventory products.
- API Documentation: Interactive API documentation powered by Swagger.
- Containerized: Ready to run with Docker for a consistent and isolated environment.

---

## 💻 Tech Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB (with Mongoose)
- Containerization: Docker, Docker Compose

---

## 🚀 Running with Docker (Recommended)
This is the simplest way to get the entire application up and running with a single command.

### 1. Prerequisites
Docker Desktop must be installed and running on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/AbhishekSingh-Web-dev/FI-MONEY.git
cd FI-MONEY
```

### 3. Create Environment File
The application requires a single `.env` file in the root of the project to store backend credentials.

Create a new file named `.env`.

Copy the contents from the example below and replace the placeholder values with your actual credentials.

**Example .env content:**
```env
# Backend Environment Variables
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_and_long_jwt_key
```

### 4. Build and Run!
```bash
docker-compose -f docker-compose.yml up --build
```

Once the build is complete, the application will be available at http://localhost:3000.

To stop the application:
```bash
Ctrl + C
docker-compose -f docker-compose.yml down
```

---

## 🛠️ Local Development Setup (Manual)
Follow these steps if you prefer to run the services manually without Docker.

### **Backend Setup**
```bash
cd backend
npm install
```
Create `.env` file inside backend folder (use the example in the Docker section).

Start the server:
```bash
npm run dev
```

---

### **Frontend Setup**
```bash
cd frontend
npm install
```
Create `.env` file inside frontend folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the client:
```bash
npm run dev
```

---

## 📖 API Documentation
Once the backend is running, you can view the interactive API documentation here:
👉 http://localhost:5000/api-docs
