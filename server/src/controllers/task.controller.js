const prisma = require('../utils/db');

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, projectId } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and projectId are required' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedTo: assignedTo || null,
        projectId
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { projectId, status } = req.query;
    let whereClause = {};

    if (req.user.role === 'MEMBER') {
      whereClause.assignedTo = req.user.id;
    }

    if (projectId) whereClause.projectId = projectId;
    if (status) whereClause.status = status;

    const tasks = await prisma.task.findMany({
      where: whereClause,
      include: {
        project: { select: { title: true } },
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role === 'MEMBER' && existingTask.assignedTo !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your assigned tasks' });
    }

    const task = await prisma.task.update({
      where: { id },
      data: { status }
    });

    res.status(200).json(task);
  } catch (error) {
    console.error('Update task status error:', error);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: { assignedTo: assignedTo || null }
    });

    res.status(200).json(task);
  } catch (error) {
    console.error('Assign task error:', error);
    res.status(500).json({ message: 'Server error assigning task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};
