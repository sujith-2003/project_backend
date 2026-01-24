import User from "../models/user.model.js";
import Attendance from "../models/attendance.model.js";

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      users, // ✅ frontend expects this
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

/* =========================
   GET USER ATTENDANCE
========================= */
export const getUserAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      user: req.params.id,
    });

    res.status(200).json({
      attendance, // ✅ frontend expects this
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
    });
  }
};
