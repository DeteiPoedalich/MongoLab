const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    TeamImg:{ type: String,  required: true },
    TeamName: { type: String,  required: true },
});

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team;