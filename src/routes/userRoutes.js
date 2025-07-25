const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.get('/register', userController.showRegisterForm);

router.post('/login', userController.login);
router.get('/login', userController.showLoginForm);

router.get('/dashboard', userController.showDashboard); 
router.post('/addExpense', userController.addExpense);

module.exports = router;
