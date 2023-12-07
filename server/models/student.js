import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
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
    date_of_birth: {
        type: Date,
        required: true,
    },
    major: {
        type: String,
        required: true,
    }
});

// Create a model out of the schema we just made (it takes in the nme of the collection and the schema)
const StudentModel = mongoose.model("student", StudentSchema);
// export the model that you made
export default StudentModel;