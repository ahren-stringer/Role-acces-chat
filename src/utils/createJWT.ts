import jwt from "jsonwebtoken";
import { reduce } from "lodash";
import config from '../config'

interface ILoginData {
  email: string;
  password: string;
}

export default (user: ILoginData) => {
  const token = jwt.sign(
    {
      data: reduce(
        user,
        (result: any, value: string, key: string) => {
          if (key !== "password") {
            result[key] = value;
          }
          return result;
        },
        {}
      ),
    },
    config.jwt || "",
    {
      expiresIn: 10080, // записать в config
      algorithm: "HS256",
    }
  );

  return token;
};