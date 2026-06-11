# Task Manager API & Frontend

Backend Developer Internship Assignment

## Project Overview

This project is a full-stack task management application built using Node.js, Express.js, MongoDB, and React.

The application provides secure user authentication, role-based access control, and CRUD operations for task management.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcryptjs

### Authorization

- Protected Routes
- Role-Based Access Control (User/Admin)

### Task Management

- Create Task
- View Tasks
- Update Task
- Delete Task

### API Features

- RESTful API Design
- API Versioning
- Swagger Documentation
- Error Handling
- Input Validation

### Frontend

- Register Page
- Login Page
- Protected Dashboard
- Task CRUD Interface

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- express-validator
- Swagger

### Frontend

- React
- Axios
- React Router DOM

---

## Project Structure

Backend

```text
src
├── config
├── controllers
├── docs
├── middleware
├── models
├── routes
├── services
├── validators
├── app.js
```

Frontend

```text
src
├── api
├── components
├── pages
├── App.jsx
├── main.jsx
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in Backend:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

## API Documentation

Swagger Documentation:

```text
http://localhost:5000/api-docs
```

---

## API Endpoints

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Tasks

```http
POST   /api/v1/tasks
GET    /api/v1/tasks
GET    /api/v1/tasks/:id
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

---

## Future Improvements

- Redis Caching
- Docker Deployment
- Rate Limiting
- Refresh Tokens
- Email Verification
- CI/CD Pipeline
- Microservices Architecture

---

## Author

Shaurya Rao