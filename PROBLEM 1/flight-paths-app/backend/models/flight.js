const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: { type: Array, required: true },
    color: { type: String, required: true },
});

module.exports = mongoose.model('Flight', flightSchema);
