import AttendanceModel from "../Modals/AttendanceModal.js";

export const onStartingAttendance = async (req, res) => {
  const { name, date, startTime, endTime } = req.body;
  const { user } = req;
  try {
    const doc = {
      name,
      date,
      startTime,
      head: user._id,
    };

    const addAttendance = new AttendanceModel(doc);

    await addAttendance.save();
    res.status(201).json({ message: "Attendance added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const onEndAttendance = async (req, res) => {
  const { endTime } = req.body;
  const { attendanceId } = req.params;
  try {
    const updatedAttendance = await AttendanceModel.findByIdAndUpdate(
      attendanceId,
      { endTime },
      { new: true }
    );
    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const onStateAttendance = async (req, res) => {
  const { user } = req;
  try {
    const allAttendance = await AttendanceModel.find({ head: user._id });
    if (!allAttendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json(allAttendance);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
