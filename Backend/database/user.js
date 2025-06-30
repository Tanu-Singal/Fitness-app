import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    fitness_level: {
        type: String,
        required: true
    },
    workout_day: {
        type: [String],
        required: true
    },
    focus_area: {
        type: [String],
        required: true
    }
});

const User = mongoose.model("User", userSchema);
export default User;
