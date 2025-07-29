Setup Instructions

The project is divided into two main folders: backend and frontend. You will need to run two separate terminals to start both the server and the client application.

Step 1: Clone the Repository
First, clone the repository from GitHub to your local machine.

git clone https://github.com/AbhishekSingh-Web-dev/FI-MONEY.git
cd FI-MONEY

1--> Backend Setup
First, let's get the backend server running.

Step 1: Navigate to the Backend Directory
Open your terminal and run the command to navigate into backend folder.

cd backend

Step 2: Install Dependencies
Run the following command to install all the necessary server-side packages.

npm install

Step 3: Create Environment File

Create a new file named .env in the root of the backend folder. This file will store your secret keys and database connection string. Copy the following into the file and replace the placeholder values with your actual credentials.


--> The port your server will run on
PORT=5000

--> Your MongoDB connection string
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

--> A long, random, secret string for signing JWTs
JWT_SECRET=your_super_secret_and_long_jwt_key


Step 4: Start the Backend Server

Run the following command to start the server with nodemon, which will automatically restart it when you make changes.

npm run dev



2--> Frontend Setup

Step 1: Navigate to the Frontend Directory
Open a new terminal window and navigate into the frontend folder.

cd frontend

Step 2: Install Dependencies
Run the following command to install all the necessary client-side packages.

npm install


Step 3: Create Environment File

Create a new file named .env in the root of the frontend folder. Vite requires environment variables to be prefixed with VITE_. Copy the following into the file.

VITE_API_BASE_URL=http://localhost:5000/api


Step 4: Start the Frontend Application
Run the following command to start the Vite development server.

npm run dev



Running the Application

To run the full application, you need to have both the backend and frontend servers active at the same time in two separate terminals.

Terminal 1 (Backend): npm run dev

Terminal 2 (Frontend): npm run dev

You can now access the frontend application in your browser and interact with your backend API.


API Documentation

Once the backend server is running, you can view the complete interactive API documentation by navigating to:

http://localhost:5000/api-docs
