# Expense Tracker JS

A full-featured expense tracker backend built with Node.js, Express, MongoDB, and EJS. This project allows users to register, log in, add expenses, view dashboards, and generate reports.

## Features

- User registration and authentication (with hashed passwords)
- Session management using express-session
- Add, view, and categorize expenses
- Dashboard with user-specific data
- Monthly and category-wise expense reports
- EJS templating for dynamic HTML pages
- Modular MVC folder structure



## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or cloud)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/prince0609/expense-tracker-js.git
   cd expense-tracker-js
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   SESSION_SECRET=yourSecretKey
   ```

4. Start the server:
   ```
   npm start
   ```
   or
   ```
   node src/index.js
   ```

5. Open your browser and visit:
   ```
   http://localhost:5000/api/users/register
   ```

## API Endpoints

- `GET /api/users/register` — Registration page
- `POST /api/users/register` — Register a new user
- `GET /api/users/login` — Login page
- `POST /api/users/login` — Login user
- `GET /api/users/dashboard` — User dashboard (protected)
- `POST /api/users/addExpense` — Add a new expense
- `GET /api/users/reports` — View expense reports

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS (Embedded JavaScript Templates)
- express-session
- bcrypt (for password hashing)
- Bootstrap (for frontend styling)

---

**Feel free to contribute or reach out for any queries!**
