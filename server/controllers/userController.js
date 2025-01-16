const User = require('../models/user');

class UserController {
    async createUser(req, res) {
        try {
            const { NickName, password, role } = req.body;

            const newUser = new User({
                NickName,
                password,
                role
            });

            await newUser.save();

            res.status(201).json({
                message: 'User created successfully',
                user: newUser
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({
                message: 'Error creating user',
                error: error.message
            });
        }
    }

    async getAllPagination(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        try {
            const users = await User.find().skip(skip).limit(limit);
            const total = await User.countDocuments();
            res.status(200).json({
                total,
                page,
                users
            });
        } catch (error) {
            console.error('Error fetching users with pagination:', error);
            res.status(500).json({
                message: 'Error fetching users',
                error: error.message
            });
        }
    }

    async getAllSort(req, res) {
        const sortField = req.query.sort || 'name'; // Поле для сортировки
        const sortOrder = req.query.order === 'desc' ? -1 : 1;

        try {
            const users = await User.find().sort({ [sortField]: sortOrder });
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users with sorting:', error);
            res.status(500).json({
                message: 'Error fetching users',
                error: error.message
            });
        }
    }

    async getAllFilter(req, res) {
        const filter = {};
        if (req.query.age) {
            filter.age = req.query.age; // Фильтр по возрасту
        }

        try {
            const users = await User.find(filter);
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users with filter:', error);
            res.status(500).json({
                message: 'Error fetching users',
                error: error.message
            });
        }
    }

    async getAllSearch(req, res) {
        const searchQuery = req.query.q;

        try {
            const users = await User.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } }
                ]
            });
            res.status(200).json(users);
        } catch (error) {
            console.error('Error searching users:', error);
            res.status(500).json({
                message: 'Error searching users',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        const userId = req.params.id;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({
                message: 'Error fetching user',
                error: error.message
            });
        }
    }

    async update(req, res) {
        const userId = req.params.id;

        try {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({
                message: 'User updated successfully',
                user: updatedUser
            });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({
                message: 'Error updating user',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        const userId = req.params.id;

        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({
                message: 'Error deleting user',
                error: error.message
            });
        }
    }
}

module.exports = new UserController();