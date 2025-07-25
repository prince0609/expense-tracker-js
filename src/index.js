const express = require('express');
const session = require('express-session')
const app = express();
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 5000;

// Database connection
const connectDB = require('./config/db');
connectDB();

app.use(express.json()); // ✅ For parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // ✅ For form data (optional)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(session({
  secret: 'yourSecretKey',       // Change this to something secure
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }      // Set true if using HTTPS
}));


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/users/register`);
});