const Recipe = require('../models/Recipe');

class RecipeController {
    async createRecipe(req, res) {
        try {
            const { title, time, instructions } = req.body;

            const newRecipe = new Recipe({
                title,
                time,
                instructions
            });

            await newRecipe.save();

            res.status(201).json({
                message: 'Recipe created successfully',
                recipe: newRecipe
            });
        } catch (error) {
            console.error('Error creating recipe:', error);
            res.status(500).json({
                message: 'Error creating recipe',
                error: error.message
            });
        }
    }

    async getAllPagination(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        try {
            const recipes = await Recipe.find().skip(skip).limit(limit);
            const total = await Recipe.countDocuments();
            res.status(200).json({
                total,
                page,
                recipes
            });
        } catch (error) {
            console.error('Error fetching recipes with pagination:', error);
            res.status(500).json({
                message: 'Error fetching recipes',
                error: error.message
            });
        }
    }

    async getAllSort(req, res) {
        const sortField = req.query.sort || 'title'; // Поле для сортировки
        const sortOrder = req.query.order === 'desc' ? -1 : 1;

        try {
            const recipes = await Recipe.find().sort({ [sortField]: sortOrder });
            res.status(200).json(recipes);
        } catch (error) {
            console.error('Error fetching recipes with sorting:', error);
            res.status(500).json({
                message: 'Error fetching recipes',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        const recipeId = req.params.id;

        try {
            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.status(200).json(recipe);
        } catch (error) {
            console.error('Error fetching recipe by ID:', error);
            res.status(500).json({
                message: 'Error fetching recipe',
                error: error.message
            });
        }
    }

    async update(req, res) {
        const recipeId = req.params.id;

        try {
            const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });
            if (!updatedRecipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.status(200).json({
                message: 'Recipe updated successfully',
                recipe: updatedRecipe
            });
        } catch (error) {
            console.error('Error updating recipe:', error);
            res.status(500).json({
                message: 'Error updating recipe',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        const recipeId = req.params.id;

        try {
            const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
            if (!deletedRecipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.status(200).json({ message: 'Recipe deleted successfully' });
        } catch (error) {
            console.error('Error deleting recipe:', error);
            res.status(500).json({
                message: 'Error deleting recipe',
                error: error.message
            });
        }
    }

    async search(req, res) {
        try {
            const { query } = req.query;
    
            // Если query пустой, возвращаем все тренировочные планы
            if (!query) {
                const recipes = await Recipe.find({});
                return res.json(recipes);
            }
    
            const recipes = await Recipe.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                ],
            });
    
            return res.json(recipes);
        } catch (error) {
            console.error('Ошибка при поиске тренировочных планов:', error);
            return res.status(500).json({ message: 'Ошибка при поиске тренировочных планов' });
        }
    }
}

module.exports = new RecipeController();