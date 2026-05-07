const express = require('express');
const { createProject, getAllProjects, getProjectById } = require('../controllers/project.controller');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, getAllProjects);
router.get('/:id', authenticate, getProjectById);
router.post('/', authenticate, authorizeAdmin, createProject);

module.exports = router;
