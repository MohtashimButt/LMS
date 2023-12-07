import mongoose from "mongoose";

const SectionsSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  instructor_username: {
    type: String,
    ref: "Instructor",
    required: true,
  },
  number_of_students: {
    type: String,
  },
  section_no: {
    type: String,
  },
});

// Create a model out of the schema we just made (it takes in the nme of the collection and the schema)
const SectionsModel = mongoose.model("Sections", SectionsSchema);
// export the model that you made
export default SectionsModel;
