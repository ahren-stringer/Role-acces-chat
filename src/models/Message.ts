import mongoose, { Schema, Document } from "mongoose";
import { IDialog } from "./Dialog";

export interface IMessage extends Document {
    text: string;
    dialog: IDialog | string;
    read: boolean;
  }

const messageSchema= new Schema({
    text: {type: String, require :true},
    dialog:{type: mongoose.Schema.Types.ObjectId, ref: 'Dialog', require:true},
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true},
    unread: {
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

export default mongoose.model<IMessage>('Messages',messageSchema)