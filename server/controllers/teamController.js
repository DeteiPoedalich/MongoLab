const Team = require('../models/Team');
const uuid =require("uuid")
const path=require("path")

class TeamController{
    async create(req, res) {
        try {
            const { TeamName,TeamImg } = req.body;
             const newTeam = new Team({
                TeamName,
                TeamImg,
            });
            await newTeam.save();
            res.status(201).json({
                message: 'Team created successfully',
                team: newTeam
            }); // Use fileName (which might be null)
        } catch (error) {
            console.error('Error creating team:', error);
            res.status(500).json({
                message: 'Error creating team',
                error: error.message
            });
        }
    }
    

    async getAll(req,res){
        let teams
        teams=await Team.find()
        return res.json(teams)
    }
    async getOne(req,res){
        const teamId = req.params;
        
        try {
            const team = await Team.findById(teamId);
            if (!team) {
                return res.status(404).json({ message: 'team not found' });
            }
            res.status(200).json(team);
        } catch (error) {
            console.error('Error fetching team by ID:', error);
            res.status(500).json({
                message: 'Error fetching team',
                error: error.message
            });
        }
    }
    async getAllPagination(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        try {
            const teams = await Team.find().skip(skip).limit(limit);
            const total = await Team.countDocuments();
            res.status(200).json({
                total,
                page,
                teams
            });
        } catch (error) {
            console.error('Error fetching recipes with pagination:', error);
            res.status(500).json({
                message: 'Error fetching teams',
                error: error.message
            });
        }
    }
async update(req, res) {
        const teamsId = req.params;
    
        try {
            const updatedteam = await Team.findByIdAndUpdate(teamsId, req.body, { new: true });
            if (!updatedteam) {
                return res.status(404).json({ message: 'Training plan not found' });
            }
            res.status(200).json({
                message: 'Training plan updated successfully',
                team: updatedteam
            });
        } catch (error) {
            console.error('Error updating training plan:', error);
            res.status(500).json({
                message: 'Error updating training plan',
                error: error.message
            });
        }
    }
    async getAllSort(req, res) {
        const sortField = req.query.sort || 'title'; // Поле для сортировки
        const sortOrder = req.query.order === 'desc' ? -1 : 1;

        try {
            const teams = await Team.find().sort({ [sortField]: sortOrder });
            res.status(200).json(teams);
        } catch (error) {
            console.error('Error fetching teams with sorting:', error);
            res.status(500).json({
                message: 'Error fetching teams',
                error: error.message
            });
        }
    }
    async delete(req, res) {
            const teamId = req.params;
    
            try {
                const deletedTeam = await Team.findByIdAndDelete(teamId);
                if (!deletedTeam) {
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
                    const teams = await Team.find({});
                    return res.json(teams);
                }
        
                const teams = await Team.find({
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                    ],
                });
        
                return res.json(teams);
            } catch (error) {
                console.error('Ошибка при поиске тренировочных планов:', error);
                return res.status(500).json({ message: 'Ошибка при поиске тренировочных планов' });
            }
        }
}

module.exports=new TeamController()