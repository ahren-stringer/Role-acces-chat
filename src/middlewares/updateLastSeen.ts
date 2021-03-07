import express from 'express';
import User from '../models/User';

let updateLastSeen = (req: any, _:any, next:any) => {
  if (req.user) {
    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        last_seen: new Date(),
      },
      { new: true },
    );
  }
  next();
};
export default updateLastSeen