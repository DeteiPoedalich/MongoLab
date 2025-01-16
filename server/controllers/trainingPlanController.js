const TrainingPlan = require('../models/TrainingPlan');
const { Op } = require('sequelize');

class TrainingPlanController {
    async createTrainingPlan(req, res) {
        try {
            const { title, amount, level } = req.body;

            const newTrainingPlan = new TrainingPlan({
                title,
                amount,
                level
            });

            await newTrainingPlan.save();

            res.status(201).json({
                message: 'Training plan created successfully',
                trainingPlan: newTrainingPlan
            });
        } catch (error) {
            console.error('Error creating training plan:', error);
            res.status(500).json({
                message: 'Error creating training plan',
                error: error.message
            });
        }
    }

    async getAllPagination(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        try {
            const trainingPlans = await TrainingPlan.find().skip(skip).limit(limit);
            const total = await TrainingPlan.countDocuments();
            res.status(200).json({
                total,
                page,
                trainingPlans
            });
        } catch (error) {
            console.error('Error fetching training plans with pagination:', error);
            res.status(500).json({
                message: 'Error fetching training plans',
                error: error.message
            });
        }
    }

    async getAllSort(req, res) {
        const sortField = req.query.sort || 'title'; // Поле для сортировки
        const sortOrder = req.query.order === 'desc' ? -1 : 1;

        try {
            const trainingPlans = await TrainingPlan.find().sort({ [sortField]: sortOrder });
            res.status(200).json(trainingPlans);
        } catch (error) {
            console.error('Error fetching training plans with sorting:', error);
            res.status(500).json({
                message: 'Error fetching training plans',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        const trainingPlanId = req.params.id;

        try {
            const trainingPlan = await TrainingPlan.findById(trainingPlanId);
            if (!trainingPlan) {
                return res.status(404).json({ message: 'Training plan not found' });
            }
            res.status(200).json(trainingPlan);
        } catch (error) {
            console.error('Error fetching training plan by ID:', error);
            res.status(500).json({
                message: 'Error fetching training plan',
                error: error.message
            });
        }
    }

    async update(req, res) {
        const trainingPlanId = req.params.id;
        try {
            const updatedTrainingPlan = await TrainingPlan.findByIdAndUpdate(trainingPlanId, req.body, { new: true });
            if (!updatedTrainingPlan) {
                return res.status(404).json({ message: 'Training plan not found' });
            }
            res.status(200).json({
                message: 'Training plan updated successfully',
                trainingPlan: updatedTrainingPlan
            });
        } catch (error) {
            console.error('Error updating training plan:', error);
            res.status(500).json({
                message: 'Error updating training plan',
                error: error.message
            });
        }
    }
    async delete(req, res) {
        const trainingPlanId = req.params.id;

        try {
            const deletedTrainingPlan = await TrainingPlan.findByIdAndDelete(trainingPlanId);
            if (!deletedTrainingPlan) {
                return res.status(404).json({ message: 'Training plan not found' });
            }
            res.status(200).json({ message: 'Training plan deleted successfully' });
        } catch (error) {
            console.error('Error deleting training plan:', error);
            res.status(500).json({
                message: 'Error deleting training plan',
                error: error.message
            });
        }
    }

    async search(req, res) {
        try {
            const { query } = req.query;
    
            // Если query пустой, возвращаем все тренировочные планы
            if (!query) {
                const trainingPlans = await TrainingPlan.find({});
                return res.json(trainingPlans);
            }
    
            const trainingPlans = await TrainingPlan.find({
                $or: [
                    { level: { $regex: query, $options: 'i' } }, // Регистронезависимый поиск
                    { title: { $regex: query, $options: 'i' } },
                ],
            });
    
            return res.json(trainingPlans);
        } catch (error) {
            console.error('Ошибка при поиске тренировочных планов:', error);
            return res.status(500).json({ message: 'Ошибка при поиске тренировочных планов' });
        }
    }
}

module.exports = new TrainingPlanController();