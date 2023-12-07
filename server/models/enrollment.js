import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
  student_username: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  section_no: {
    type: String,
    required: true,
  },
});

// Create a model out of the schema we just made (it takes in the nme of the collection and the schema)
const EnrollmentModel = mongoose.model("Enrollments", EnrollmentSchema);
// export the model that you made
export default EnrollmentModel;
