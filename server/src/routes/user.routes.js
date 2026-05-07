const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

const { authenticate } = require('../middleware/auth');

// Get all users
router.get(
  '/',
  authenticate,
  userController.getUsers
);

module.exports = router;