const { transformEvent } = require('./helperFunctions');
const Event = require('../../models/event');
const User = require('../../models/user');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        };
    },
    createEvent: async (args, req) => {
        if (!req.isAuthenticated) {
            throw new Error('Unauthorized!');
        }
        const newEvent = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            createdBy: req.userId
        });
        let createdEvent;
        try {
            const event = await newEvent.save()
            createdEvent = transformEvent(event);
            const creator = await User.findById(req.userId);
            if (!creator) {
                throw new Error('User noy found')
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        } catch (err) {
            throw err;
        };
    }
};