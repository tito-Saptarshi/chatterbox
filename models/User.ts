import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },        
        bio: {
            type: String,
            default: "",
        },
        profilePic: {
            type: String,
            default: "",
        },      
        location: {
            type: String,
            default: "",
        },
        isOnboarded: {
            type: Boolean,
            default: false,
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        sentRequests : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        receivedRequests : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;