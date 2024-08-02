const Flight = require('../models/flight');

// Get all flights
exports.getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new flight
exports.createFlight = async (req, res) => {
    const { name, path, color } = req.body;

    if (!name || !path || !color) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const flight = new Flight({
        name,
        path,
        color,
    });

    try {
        const newFlight = await flight.save();
        res.status(201).json(newFlight);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
