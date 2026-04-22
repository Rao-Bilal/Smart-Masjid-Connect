import DailyAyah from '../models/DailyAyah.js';

// @desc    Create a new Daily Ayah
export const createDailyAyah = async (req, res) => {
  try {
    const ayah = await DailyAyah.create(req.body);
    res.status(201).json({ success: true, data: ayah });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// @desc    Get the most recent Daily Ayah
export const getLatestAyah = async (req, res) => {
  try {
    const ayah = await DailyAyah.findOne().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: ayah });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// @desc    Update a Daily Ayah
// @route   PUT /api/dailyayah/:id
export const updateDailyAyah = async (req, res) => {
  try {
    const ayah = await DailyAyah.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ayah) return res.status(404).json({ success: false, message: 'Ayah not found' });
    res.status(200).json({ success: true, data: ayah });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// @desc    Get all Ayahs (Optional: for a management list)
export const getAllAyahs = async (req, res) => {
  try {
    const ayahs = await DailyAyah.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: ayahs });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};