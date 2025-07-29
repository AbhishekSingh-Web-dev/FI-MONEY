FI-MONEY Inventory Management System
This is a full-stack inventory management application built with the MERN stack (MongoDB, Express, React, Node.js) and fully containerized with Docker for easy setup and deployment.

🚀 Running with Docker (Recommended)
This is the simplest way to get the entire application running.

Prerequisites
Docker Desktop must be installed and running on your system.

Step 1: Clone the Repository
First, clone this project from GitHub to your local machine.

git clone https://github.com/AbhishekSingh-Web-dev/FI-MONEY.git
cd FI-MONEY

Step 2: Create the Environment File
The application requires a single .env file in the root of the project to provide credentials to the backend service.

Create a new file named .env in the root directory.

Copy and paste the following example content into the file, replacing the placeholder values with your actual credentials.

# Backend Environment Variables
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_and_long_jwt_key

Step 3: Build and Run with Docker Compose
Run the application using the production Docker Compose file. This single command will build the images and start both the frontend and backend services.

docker-compose -f docker-compose.prod.yml up --build

That's it! Once the build is complete and the containers are running, you can access the application:

Application URL: http://localhost:3000

To stop the application, press Ctrl + C in the terminal, and then run docker-compose -f docker-compose.prod.yml down to remove the containers.

🛠️ Local Development Setup (Manual)
If you prefer to run the services manually without Docker, follow the steps below.

Backend Setup
First, let's get the backend server running.

Step 1: Navigate to the Backend Directory

cd backend

Step 2: Install Dependencies

npm install

Step 3: Create Environment File
Create a .env file in the backend folder and add the following, replacing placeholders with your credentials.

# The port your server will run on
PORT=5000

# Your MongoDB connection string
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# A long, random, secret string for signing JWTs
JWT_SECRET=your_super_secret_and_long_jwt_key

Step 4: Start the Backend Server

npm run dev

Frontend Setup
Step 1: Navigate to the Frontend Directory
Open a new terminal window and navigate into the frontend folder.

cd frontend

Step 2: Install Dependencies

npm install

Step 3: Create Environment File
Create a .env file in the frontend folder with the following content.

VITE_API_BASE_URL=http://localhost:5000/api

Step 4: Start the Frontend Application

npm run dev

API Documentation
Once the backend server is running (either via Docker or manually), you can view the complete interactive API documentation by navigating to:

http://localhost:5000/api-docs