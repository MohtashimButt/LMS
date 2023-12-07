import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
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
    }
});

// Create a model out of the schema we just made (it takes in the nme of the collection and the schema)
const AdminModel = mongoose.model("admins", AdminSchema);
// export the model that you made
export default AdminModel;