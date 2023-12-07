import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
});

// Create a model out of the schema we just made (it takes in the nme of the collection and the schema)
const CourseModel = mongoose.model("courses", CourseSchema);
// export the model that you made
export default CourseModel;
