const express = require('express');
const { createTask, getTasks, updateTaskStatus, assignTask, deleteTask } = require('../controllers/task.controller');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, getTasks);
router.post('/', authenticate, authorizeAdmin, createTask);
router.put('/:id/status', authenticate, updateTaskStatus);
router.put('/:id/assign', authenticate, authorizeAdmin, assignTask);
router.delete('/:id', authenticate, authorizeAdmin, deleteTask);

module.exports = router;
