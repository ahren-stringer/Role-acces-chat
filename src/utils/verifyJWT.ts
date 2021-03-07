import jwt, { VerifyErrors } from "jsonwebtoken";
import { IUser } from "../models/User";
import config from "../config";

export interface DecodedData {
  data: {
    _doc: IUser;
  };
}

export default (token: string): Promise<DecodedData | null> =>
  new Promise(
    (
      resolve: (decodedData: DecodedData) => void,
      reject: (err: VerifyErrors) => void
    ) => {
      jwt.verify(
        token,
        config.jwt || "",
        (err: VerifyErrors, decodedData) => {
          if (err || !decodedData) {
            return reject(err);
          }

          resolve(decodedData as DecodedData);
        }
      );
    }
  );