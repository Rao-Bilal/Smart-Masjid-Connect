import Student from '../models/Student.js';

// 1. Get all active students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({ status: 'Active' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Register a new student
export const registerStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json({ success: true, message: 'Student registered successfully', data: newStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Mark daily attendance
export const markAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, status } = req.body;

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    // Check if attendance for this date already exists, update it if so
    const existingIndex = student.attendanceHistory.findIndex(a => a.date === date);
    if (existingIndex > -1) {
      student.attendanceHistory[existingIndex].status = status;
    } else {
      student.attendanceHistory.push({ date, status });
    }

    await student.save();
    res.status(200).json({ success: true, message: 'Attendance marked', data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update syllabus progress
export const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentLesson } = req.body;
    
    const updated = await Student.findByIdAndUpdate(id, { currentLesson }, { returnDocument: 'after' });
    res.status(200).json({ success: true, message: 'Progress updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};