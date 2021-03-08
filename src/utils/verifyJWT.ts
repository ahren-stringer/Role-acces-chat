import jwt, { VerifyErrors } from "jsonwebtoken";
import { IUser } from "../models/User";
// import config from "../config";

export interface DecodedData {
  data: {
    _doc: IUser;
  };
}

export default (token: string) =>
  new Promise(
    ( resolve,reject
      // resolve: (decodedData: DecodedData) => void,
      // reject: (err: VerifyErrors) => void
    ) => {
      jwt.verify(
        token,
        "jWqdGi6J5RTHOied8mxl" || "",
        (err, decodedData) => {
          if (err || !decodedData) {
            return reject(err);
          }

          resolve(decodedData);
        }
      );
    }
  );