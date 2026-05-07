const prisma = require('../utils/db');

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Get users error:', error);

    res.status(500).json({
      message: 'Server error fetching users',
    });
  }
};