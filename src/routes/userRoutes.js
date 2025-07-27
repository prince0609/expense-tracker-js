const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const expenseController = require('../controllers/expenseController');
const settingController = require('../controllers/settingController');
const reportsController = require('../controllers/reportsController');

router.post('/register', userController.register);
router.get('/register', userController.showRegisterForm);
router.post('/login', userController.login);
router.get('/login', userController.showLoginForm);
router.get('/logout', userController.logOut);


router.get('/dashboard', dashboardController.showDashboard); 
router.post('/addExpense', dashboardController.addExpense);


router.get('/expenses', expenseController.showExpenses);
router.put('/updateExpense', expenseController.updateExpense);
router.delete('/deleteExpense/:id', expenseController.deleteExpense);
router.get('/filter', expenseController.filterExpense);


router.get('/settings', settingController.showSettings);
router.post('/editPreferences', settingController.editPreferences);
router.post('/editProfile', settingController.editProfile);


router.get('/reports', reportsController.showReports);


module.exports = router;
