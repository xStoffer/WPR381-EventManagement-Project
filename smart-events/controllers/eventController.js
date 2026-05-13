const Event = require('mongoose').model('Event');

// Show all events (Home page)
const getAllEvents = async (req, res) => {
  try {
    const { search, category, available } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    if (available === 'true') {
      filter.ticketsAvailable = { $gt: 0 };
    }

    const events = await Event.find(filter).sort({ date: 1 });

    res.render('index', {
      events,
      user: req.session.user || null,
      search: search || '',
      category: category || '',
      available: available || ''
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading events');
  }
};

// Show single event detail
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send('Event not found');

    res.render('event-details', {
      event,
      user: req.session.user || null,
      error: null,
      success: null
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading event');
  }
};

// Show admin event management page
const getAdminEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.render('admin-events', {
      events,
      user: req.session.user || null,
      error: null,
      success: null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading admin events');
  }
};

// Create event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, capacity } = req.body;

    await Event.create({
      title,
      description,
      date,
      location,
      category,
      capacity: Number(capacity),
      ticketsAvailable: Number(capacity),
      createdBy: req.session.user.id
    });

    res.redirect('/admin/events?success=Event created successfully');

  } catch (err) {
    console.error(err);
    res.redirect('/admin/events?error=Failed to create event');
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, capacity } = req.body;
    const newCapacity = Number(capacity);

    // Fetch the current event so we can calculate the difference
    const existingEvent = await Event.findById(req.params.id);
    if (!existingEvent) {
      return res.redirect('/admin/events?error=Event not found');
    }

    // Work out how many tickets have already been booked
    const ticketsBooked = existingEvent.capacity - existingEvent.ticketsAvailable;

    // New available = new capacity minus already-booked tickets
    // Math.max(0, ...) prevents it going negative if capacity is reduced below bookings
    const newTicketsAvailable = Math.max(0, newCapacity - ticketsBooked);

    await Event.findByIdAndUpdate(req.params.id, {
      title,
      description,
      date,
      location,
      category,
      capacity: newCapacity,
      ticketsAvailable: newTicketsAvailable
    });

    res.redirect('/admin/events?success=Event updated successfully');

  } catch (err) {
    console.error(err);
    res.redirect('/admin/events?error=Failed to update event');
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/admin/events?success=Event deleted successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/events?error=Failed to delete event');
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent
};