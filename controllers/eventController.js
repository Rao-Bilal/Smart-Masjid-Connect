import Event from '../models/Event.js';

// @desc    Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ dateGregorian: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// @desc    Create an event
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// @desc    Update an event [cite: 71]
// @route   PUT /api/events/:id
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, data: event });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// @desc    Delete an event
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};