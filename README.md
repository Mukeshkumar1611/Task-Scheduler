# Task Scheduler API

1. [Overview](#overview)
2. [Essential Features](#essential-features)
3. [Salient Features](#salient-features)
4. [Technologies Used](#technologies-used)
5. [API Endpoints](#api-endpoints)
6. [Live Links](#live-links)
7. [Contributor](#contributor)

## Overview

Welcome to the Task Scheduler service! This application serves as a service for scheduling your tasks, allowing users to perform their tasks after a specified delay time. Tasks will be specified by users as the api endpoints.

### Essential Features

1. **User Registration and Login:**
   - Users can register a new account.
   - Users can log into an existing account.
   - Users will be provided with a bearer token on successful login.

2. **Credential Validation:**
   - Users credentials are validated by storing hash value of password in the database and validated when required.

3. **Token validation:**
   - Users need to have a valid token to use our service.

4. **Schedule a task:**
   - Users can schedule a task by using our api. 
   - The endpoint for task must be specified by the user.
   - Users can also specify a delay after which the task must be performed (considered 0 by default).

5. **View all tasks:**
   - Users can view all the tasks that were scheduled by our service.

6. **View tasks by status:**
   - Users can view all the tasks with a status: complete/queued/failed.

### Salient Features

1. **Activity logging:**
   - All of the activity of our service will be stored in a log file.

2. **Hashing and Salt:**
    - System uses hashing and adding salt method to store user creds into database as a best practiced security protocol

## Technologies Used
- Backend: ![Node.js](https://img.shields.io/badge/-Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
- Deployment: ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) 
- Database: ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- Version Control: ![Git](https://img.shields.io/badge/-Git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-%23181717.svg?style=for-the-badge&logo=github&logoColor=%23FFFFFF)

## Live Links
- The api service is live on [https://task-scheduler-32tc.onrender.com](https://task-scheduler-32tc.onrender.com)

## Database Design

<!-- #### Entity Relationship (ER) Diagram

![ER Diagram](./Docs/images/ER_Diagram.svg) -->

### Tables

#### User Table

- **id**: primary key, int
- **name**: string
- **email**: string
- **password**: string

#### Task Table

- **id**: primary key, int
- **endpoint**: string
- **bearerToken**: string
- **delay**: int
- **status**:

## API Endpoints

#### 1. Register User
- **Endpoint**: `/api/user/register`
- **Method**: `POST`
- **Description**: Register a user.
- **Request Body**:
  ```json
  {
    "name": "name",
    "email": "email",
    "password": "password",
  }
  ```


#### 2. Login User
- **Endpoint**: `/api/user/login`
- **Method**: `POST`
- **Description**: Log a User in.
- **Request Body**:
  ```json
  {
    "email": "email",
    "password": "password",
  }
  ```
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "bearerToken": "jwt token for this user"
  }
  ```
  - **Error**: Status Code 400 or 500
  ```json
  {
    "error": "Error message"
  }
  ```

#### 3. Add a task
- **Endpoint**: `/api/add-task`
- **Method**: `POST`
- **Description**: Adds a task to the task scheduler and sets its status to queued
- **Request Body**:
  ```json
  {
    "delay": "delay",
  }
  ```

- **Query Parameters**:
  ```json
  {
    "endpoint": "endpoint_to_the_task",
  }
  ```
- **Authentication**: `Bearer Token`
  
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "message": "Task added to the queue"
  }
  ```
  - **Error**: Status Code 401
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

#### 4. Get all tasks
- **Endpoint**: `/api/tasks`
- **Method**: `GET`
- **Description**: Gets all the tasks from the database
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "message": "All the tasks",
    "Tasks": "array_of_tasks"
  }
  ```
  - **Error**: Status Code 500
  ```json
  {
    "error": "Error message"
  }
  ```

#### 5. Get all tasks with a status
- **Endpoint**: `/api/tasks/:status`
- **Method**: `GET`
- **Description**: Gets all the tasks from the database with the status `status`
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "message": "All the tasks with status `status`",
    "Tasks": "array_of_tasks"
  }
  ```
  - **Error**: Status Code 500
  ```json
  {
    "error": "Error message"
  }
  ```
  
### Installation for backend

To run the backend locally, follow these steps:

1. Create an `.env` file in the `task-handler-backend` directory.

    ```env
    # .env
    DB_URL="postgresql://user:password@localhost:8000/your-database-name"
    PORT=8000
    ACCESS_TOKEN_SECRET="your_access_token_string"
    ```

    Replace `user` and `password` with your PostgreSQL credentials and `your_access_token_string` with your token string for token signing and validation.

2. Run the following commands:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    npm run start
    ```

Now, the backend will be accessible at [http://localhost:8000](http://localhost:8000).

Note: Ensure that you have a PostgreSQL server running locally/on the cloud with the specified credentials.

<!-- ## Demo GIFs

Below are visual demonstrations of key functionalities within the Flex Yoga Admission Portal.
###  Creating a User

![Create User](./Docs/gifs/CreatingUser.gif)

### Logging In, Paying Dues, Making batch change request, persisting user data on reload

![Login](./Docs/gifs/UserLogin.gif) -->

## Contributor

[Rohit2593](https://github.com/Rohit2593)
    - Email: [ragarwal2593@gmail.com](ragarwal2593@gmail.com)
