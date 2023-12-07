import mongoose from "mongoose";

const InstructorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
    },
    ranking: {
        type: Number,
    },
    salary: {
        type: Number
    }
});

// Create a model out of the schema we just made (it takes in the nme of the collection and the schema)
const InstructorModel = mongoose.model("instructor", InstructorSchema);
// export the model that you made
export default InstructorModel;