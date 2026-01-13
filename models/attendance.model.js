import mongoose from "mongoose";

const AttendanceDaySchema = new mongoose.Schema(
  {
    date: String,
    isCheckedIn: Boolean,
    checkInTime: String,
    checkOutTime: String,
    workedTime: String,
    lastUpdated: String
  },
  { _id: false }
);

const AttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    attendance: {
      type: Map,
      of: AttendanceDaySchema,
      default: {}
    }
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", AttendanceSchema);
