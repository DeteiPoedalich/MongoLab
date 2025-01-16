const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
        ItemImg:{ type: String,  required: true },
        ItemName: { type: String,  required: true },
        ItemDescription:{ type: String,  required: true },
        ItemType:{ type: String,  required: true },
        ItemType2:{ type: String,  required: true },
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;