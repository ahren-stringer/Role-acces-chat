import mongoose, { Schema, Document } from "mongoose";
import { IMessage } from "./Message";
import { IUser } from "./User";

export interface IDialog extends Document {
  author: IUser | string;
  partner: IUser | string;
  messages: IMessage[];
  lastMessage: IMessage | string;
}

const dialogSchema: Schema = new Schema({
    author: {type:Schema.Types.ObjectId, ref:"User"},
    partner: {type:Schema.Types.ObjectId, ref:"User"},
},{
    timestamps:true
});

export default mongoose.model<IDialog>('Dialog', dialogSchema)