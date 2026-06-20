import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// A simple login route (Using hardcoded FYP credentials for simplicity)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Change these to whatever you want your admin credentials to be!
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = 'masjid123';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // Generate a secure token valid for 1 day
    const token = jwt.sign({ role: 'admin' }, 'super_secret_masjid_key', { expiresIn: '1d' });
    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

export default router;