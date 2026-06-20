import Janaza from '../models/Janaza.js';

export const getActiveJanazas = async (req, res) => {
  try {
    const janazas = await Janaza.find({ status: 'Active' }).sort({ createdAt: -1 });
    res.status(200).json(janazas);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const volunteerForJanaza = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, task } = req.body;

    const janaza = await Janaza.findById(id);
    if (!janaza) return res.status(404).json({ message: 'Janaza not found' });

    // Add the new volunteer to the array
    janaza.volunteers.push({ name, phone, task });
    await janaza.save();

    res.status(200).json({ message: 'Jazakallah for volunteering. The family has been notified.', janaza });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export const createJanaza = async (req, res) => {
  try {
    const newJanaza = new Janaza(req.body);
    await newJanaza.save();
    res.status(201).json({ success: true, message: 'Janaza announcement created!', data: newJanaza });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. ADMIN: Delete an announcement
export const deleteJanaza = async (req, res) => {
  try {
    const { id } = req.params;
    await Janaza.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Janaza record deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. ADMIN: Mark as Completed (Archives it from public view)
export const updateJanazaStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Janaza.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};