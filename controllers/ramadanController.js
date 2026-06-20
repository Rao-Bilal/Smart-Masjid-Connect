import Itikaf from '../models/Itikaf.js';
import IftarSponsorship from '../models/IftarSponsorship.js';

// --- ITIKAF LOGIC ---

// 1. PUBLIC: Submit Application
export const applyForItikaf = async (req, res) => {
  try {
    const { name, phone, age, cnic } = req.body;
    
    // Check if CNIC already applied
    const existing = await Itikaf.findOne({ cnic });
    if (existing) return res.status(400).json({ message: 'Application with this CNIC already exists.' });

    // Applications now ALWAYS go to Pending first for the Imam to review
    const newApplication = new Itikaf({ name, phone, age, cnic, status: 'Pending' });
    await newApplication.save();

    res.status(201).json({ 
      success: true,
      message: 'Application submitted successfully. Please wait for admin approval.', 
      data: newApplication 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 2. ADMIN: Get Pending Applications
export const getPendingItikaf = async (req, res) => {
  try {
    const apps = await Itikaf.find({ status: 'Pending' }).sort({ applicationDate: -1 });
    res.status(200).json({ success: true, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. ADMIN: Approve/Reject Application
export const updateItikafStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Itikaf.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- IFTAR LOGIC ---

// 1. PUBLIC: Submit Sponsorship
export const sponsorIftar = async (req, res) => {
  try {
    const { sponsorName, phone, sponsoredDate, contributionType, amount, notes } = req.body;

    // Check if the date is already taken
    const dateTaken = await IftarSponsorship.findOne({ sponsoredDate });
    if (dateTaken) return res.status(400).json({ message: 'This date is already sponsored.' });

    const newSponsor = new IftarSponsorship({ 
      sponsorName, phone, sponsoredDate, contributionType, amount, notes, status: 'Pending' 
    });
    await newSponsor.save();

    res.status(201).json({ success: true, message: 'Iftar request submitted. Awaiting admin approval.', data: newSponsor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 2. ADMIN: Get Pending Sponsorships
export const getPendingIftar = async (req, res) => {
  try {
    const sponsors = await IftarSponsorship.find({ status: 'Pending' }).sort({ sponsoredDate: 1 });
    res.status(200).json({ success: true, data: sponsors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. ADMIN: Approve/Reject Sponsorship
export const updateIftarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await IftarSponsorship.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};