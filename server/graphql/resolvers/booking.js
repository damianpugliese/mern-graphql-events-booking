const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { transformBooking, transformEvent } = require('./helperFunctions');

module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuthenticated) {
            throw new Error('Unauthorized!');
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuthenticated) {
            throw new Error('Unauthorized!');
        }
        const event = await Event.findOne({ _id: args.eventId });
        const newBooking = new Booking({
            user: req.userId,
            event: event
        });
        const bookingSave = await newBooking.save();
        return transformBooking(bookingSave);
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuthenticated) {
            throw new Error('Unauthorized!');
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            throw err;
        }
    }
};