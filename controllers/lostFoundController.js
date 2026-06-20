import LostItem from '../models/LostItem.js';

// 1. Get items to display on the public static page
export const getLostItems = async (req, res) => {
  try {
    // Fetch items the Masjid has FOUND that are not yet Returned or Resolved
    const items = await LostItem.find({ 
        type: 'FOUND', 
        status: { $nin: ['Returned', 'Resolved'] } 
    }).sort({ dateReported: -1 }); // Updated to match the new schema's date field
    
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 2. Namazi reporting an item they LOST
export const reportLostItem = async (req, res) => {
  try {
    const { itemName, description, location, contactInfo } = req.body;

    const newReport = await LostItem.create({
      itemName,
      description,
      location,
      contactInfo,
      type: 'LOST',
      status: 'Searching'
    });

    res.status(201).json({ message: "Lost item reported successfully", data: newReport });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 3. Imam/Admin reporting an item they FOUND (Handles Image Upload)
export const reportFoundItem = async (req, res) => {
  try {
    const { itemName, description, location, contactInfo } = req.body;
    
    // Check if Multer successfully saved a file
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; 
    }

    const newReport = await LostItem.create({
      itemName,
      description,
      location,
      contactInfo,
      type: 'FOUND',
      status: 'Unclaimed',
      imageUrl
    });

    res.status(201).json({ message: "Found item logged successfully", data: newReport });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 4. Claim an item from the public page
export const claimItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone } = req.body;

    const item = await LostItem.findByIdAndUpdate(
      id, 
      { status: 'Claim Pending', claimantContact: phone },
      { new: true }
    );
    res.status(200).json({ message: 'Claim submitted. Please visit the admin office.', item });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// --- NEW ADMIN FUNCTIONS ---

// Fetch all items for the Admin Panel
export const getAdminItems = async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 });
    // Wrapping in { success: true, data: ... } to match our other admin endpoints
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve or Reject a claim
export const resolveClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // Expects 'approve' or 'reject'
    
    // If approved, mark as Returned. If rejected, reset to Unclaimed.
    const updateData = action === 'approve' 
      ? { status: 'Returned' } 
      : { status: 'Unclaimed', claimantContact: '' }; // Clear the claimant contact on reject

    const updated = await LostItem.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update status of any lost/found item
export const updateItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Notice we use { returnDocument: 'after' } instead of { new: true } to fix the warning!
    const updated = await LostItem.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};