const Booking = require('mongoose').model('Booking');
const Event = require('mongoose').model('Event');

// Book a ticket
const bookTicket = async (req, res) => {
  try {
    const { numberOfTickets } = req.body;
    const eventId = req.params.id;
    const tickets = Number(numberOfTickets);

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).render('event-detail', {
        event: null,
        error: 'Event not found',
        success: null,
        user: req.session.user || null
      });
    }

    // Check capacity
    if (tickets > event.ticketsAvailable) {
      return res.render('event-detail', {
        event,
        error: `Only ${event.ticketsAvailable} tickets available`,
        success: null,
        user: req.session.user || null
      });
    }

    // Create booking
    await Booking.create({
      user: req.session.user.id,
      event: eventId,
      numberOfTickets: tickets
    });

    // Reduce available tickets
    event.ticketsAvailable -= tickets;
    await event.save();

    res.redirect('/dashboard?success=Booking confirmed!');

  } catch (err) {
    console.error(err);
    res.redirect('/dashboard?error=Booking failed');
  }
};

// User dashboard — booking history
const getUserDashboard = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.session.user.id })
      .populate('event')
      .sort({ createdAt: -1 });

    res.render('dashboard', {
      bookings,
      user: req.session.user,
      success: req.query.success || null,
      error: req.query.error || null
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading dashboard');
  }
};

// Admin dashboard — analytics
const getAdminDashboard = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalEvents = await Event.countDocuments();

    // Most booked events
    const popularEvents = await Booking.aggregate([
      { $group: { _id: '$event', count: { $sum: '$numberOfTickets' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'events', localField: '_id', foreignField: '_id', as: 'event' } },
      { $unwind: '$event' }
    ]);

    // All events with capacity usage
    const events = await Event.find().sort({ date: 1 });

    res.render('admin-dashboard', {
      totalBookings,
      totalEvents,
      popularEvents,
      events,
      user: req.session.user
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading admin dashboard');
  }
};

module.exports = { bookTicket, getUserDashboard, getAdminDashboard };