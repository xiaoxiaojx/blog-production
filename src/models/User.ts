import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nickname: String,
    userName: String,
    password: String,
    email: String,
    avatar: String
});

const User = mongoose.model("User", userSchema);
export default User;