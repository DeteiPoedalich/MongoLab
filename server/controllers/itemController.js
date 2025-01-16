const Item = require("../models/Item")

class ItemController{
    async create(req,res){
        try{
            const {ItemName,ItemDescription,ItemType,ItemType2,ItemImg}=req.body
            const newItem = new Item({
                ItemName,
                ItemDescription,
                ItemType,
                ItemType2,
                ItemImg
                        });
            await newItem.save();
            res.status(201).json({
                message: 'item created successfully',
                item: newItem
            });
        }
        catch (error) {
            console.error('Error creating item:', error);
            res.status(500).json({
                message: 'Error creating item',
                error: error.message
            });
        }
        
    }

    async getAll(req,res){
        let items
        items=await Item.find()
        return res.json(items)
    }
    async getOne(req,res){
         const itemId = req.params;
        
                try {
                    const item = await Item.findById(itemId);
                    if (!item) {
                        return res.status(404).json({ message: 'Item not found' });
                    }
                    res.status(200).json(item);
                } catch (error) {
                    console.error('Error fetching item by ID:', error);
                    res.status(500).json({
                        message: 'Error fetching item',
                        error: error.message
                    });
                }
    }
     async getAllPagination(req, res) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
    
            try {
                const items = await Item.find().skip(skip).limit(limit);
                const total = await Item.countDocuments();
                res.status(200).json({
                    total,
                    page,
                    items
                });
            } catch (error) {
                console.error('Error fetching recipes with pagination:', error);
                res.status(500).json({
                    message: 'Error fetching recipes',
                    error: error.message
                });
            }
        }
    async update(req, res) {
            const ItemId = req.params;
        
            try {
                const updatedItem = await Item.findByIdAndUpdate(ItemId, req.body, { new: true });
                if (!updatedItem) {
                    return res.status(404).json({ message: 'Training plan not found' });
                }
                res.status(200).json({
                    message: 'Training plan updated successfully',
                    item: updatedItem
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
                const items = await Item.find().sort({ [sortField]: sortOrder });
                res.status(200).json(items);
            } catch (error) {
                console.error('Error fetching items with sorting:', error);
                res.status(500).json({
                    message: 'Error fetching items',
                    error: error.message
                });
            }
        }
        async delete(req, res) {
                const itemId = req.params;
        
                try {
                    const deletedItem = await Item.findByIdAndDelete(itemId);
                    if (!deletedItem) {
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
                        const items = await Item.find({});
                        return res.json(items);
                    }
            
                    const items = await Item.find({
                        $or: [
                            { title: { $regex: query, $options: 'i' } },
                        ],
                    });
            
                    return res.json(items);
                } catch (error) {
                    console.error('Ошибка при поиске тренировочных планов:', error);
                    return res.status(500).json({ message: 'Ошибка при поиске тренировочных планов' });
                }
            }
}

module.exports=new ItemController()