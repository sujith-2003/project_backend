import User from "../models/user.model.js";
import Attendance from "../models/attendance.model.js";

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (error) {
    console.error("GET ALL USERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* =========================
   GET USER ATTENDANCE
========================= */
export const getUserAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Attendance.findOne({ userId: id });

    const attendance = record
      ? Array.from(record.attendance.values())
      : [];

    res.json({ attendance });
  } catch (error) {
    console.error("GET USER ATTENDANCE ERROR:", error);
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};
