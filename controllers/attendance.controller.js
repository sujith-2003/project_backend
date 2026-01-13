import Attendance from "../models/attendance.model.js";

/* =========================
   GET TODAY ATTENDANCE
========================= */
export const getTodayAttendance = async (req, res) => {
  try {
    // ✅ FIXED
    const userId = req.userId;

    const today = new Date().toISOString().split("T")[0];

    let record = await Attendance.findOne({ userId });

    if (!record) {
      return res.json(null);
    }

    res.json(record.attendance.get(today) || null);
  } catch (err) {
    console.error("getTodayAttendance error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   CHECK IN / CHECK OUT
========================= */
export const toggleAttendance = async (req, res) => {
  try {
    // ✅ FIXED
    const userId = req.userId;

    const today = new Date().toISOString().split("T")[0];
    const now = new Date().toISOString();
    const { workedTime, isCheckedIn } = req.body;

    let record = await Attendance.findOne({ userId });

    if (!record) {
      record = new Attendance({ userId, attendance: new Map() });
    }

    const todayData = record.attendance.get(today) || {
      date: today,
      isCheckedIn: false,
      workedTime: "00:00:00",
    };

    if (isCheckedIn) {
      // CHECK OUT
      todayData.isCheckedIn = false;
      todayData.checkOutTime = now;
      todayData.workedTime = workedTime;
    } else {
      // CHECK IN
      todayData.isCheckedIn = true;
      todayData.checkInTime = now;
      todayData.workedTime = "00:00:00";
    }

    todayData.lastUpdated = now;

    record.attendance.set(today, todayData);
    await record.save();

    res.json(todayData);
  } catch (err) {
    console.error("toggleAttendance error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE WORKED TIME (TIMER)
========================= */
export const updateWorkedTime = async (req, res) => {
  try {
    // ✅ FIXED
    const userId = req.userId;

    const today = new Date().toISOString().split("T")[0];
    const { workedTime } = req.body;

    const record = await Attendance.findOne({ userId });
    if (!record) return res.json(null);

    const todayData = record.attendance.get(today);
    if (!todayData) return res.json(null);

    todayData.workedTime = workedTime;
    todayData.lastUpdated = new Date().toISOString();

    record.attendance.set(today, todayData);
    await record.save();

    res.json(todayData);
  } catch (err) {
    console.error("updateWorkedTime error:", err);
    res.status(500).json({ message: err.message });
  }
};
