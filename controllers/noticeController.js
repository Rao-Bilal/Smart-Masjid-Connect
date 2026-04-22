import Notice from '../models/Notice.js';

// @desc    Get pending notices for admin approval
// @route   GET /api/notices/pending
export const getPendingNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ status: 'pending' }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: notices });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// @desc    Approve or reject a notice
// @route   PUT /api/notices/:id/status
export const updateNoticeStatus = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json({ success: true, data: notice });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// Add these below your existing notice functions
export const getApprovedNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notices });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const createNotice = async (req, res) => {
  try {
    // Notice schema defaults status to 'pending' automatically
    const notice = await Notice.create(req.body);
    res.status(201).json({ success: true, data: notice });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};