import mongoose, { Schema, Document } from "mongoose";
import pkg from 'validator';
const { isEmail } = pkg;

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    confirmed: boolean;
    avatar: string;
    confirm_hash: string;
    last_seen: Date;
    data?: IUser;
  }

const schema: Schema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        // unique: true
    },
    email: {
        type: String,
        require: "Email address is required",
        validate: [isEmail, "Invalid email"],
        unique: true,
    },
    password: {
        type: String,
        required: 'password is required'
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    avatar: String,
    confirmHash: String,
    last_seen: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', schema)