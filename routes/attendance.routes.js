import express from "express";
import {
  getTodayAttendance,
  toggleAttendance,
  updateWorkedTime
} from "../controllers/attendance.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/today", protect, getTodayAttendance);
router.post("/toggle", protect, toggleAttendance);
router.put("/update-time", protect, updateWorkedTime);

export default router;
