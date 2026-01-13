import express from "express";
import {
  getAllUsers,
  getUserAttendance
} from "../controllers/admin.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.get("/users/:id/attendance", protect, getUserAttendance);


export default router;
