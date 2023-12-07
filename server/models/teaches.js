import mongoose from "mongoose";

const TeachesSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  instructor_username: {
    type: String,
    required: true,
  },
  section_no: {
    type: String,
  },
});

// Create a model out of the schema we just made (it takes in the nme of the collection and the schema)
const TeachesModel = mongoose.model("Teaches", SectionSchema);
// export the model that you made
export default TeachesModel;
