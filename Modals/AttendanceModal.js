import mongoose from "mongoose";
const { Schema } = mongoose;

const AttendanceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
  },
  { timestamps: true }
);

const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);
export default AttendanceModel;
