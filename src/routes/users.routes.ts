import express from 'express';
const { Router } = express;
const router = Router()
import User from '../models/User'
import { validationResult, Result, ValidationError } from "express-validator";
import bcrypt from "bcrypt";
import { IUser } from "../models/User";
import createJWToken  from "../utils/createJWT";

router.get('/users/:id', async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.delete('/users/:id', async (req: express.Request, res: express.Response) => {
    try {
      const user = await User.findOneAndRemove({_id:req.params.id});
      res.json({message:'Пользователь удален'})
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.post('/users/register', (req: express.Request, res: express.Response) : void => {
  try {
      const postData: { email: string; name: string; password: string } = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      };
  
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
      } else {
        const user = new User(postData);
  
        user
          .save()
          .then((obj: IUser) => {
            res.json(obj);
            // mailer.sendMail(
            //   {
            //     from: "admin@test.com",
            //     to: postData.email,
            //     subject: "Подтверждение почты React Chat Tutorial",
            //     html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:3000/signup/verify?hash=${obj.confirm_hash}">по этой ссылке</a>`,
            //   },
            //   function (err: Error | null, info: SentMessageInfo) {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       console.log(info);
            //     }
            //   }
            // );
          })
          .catch((reason) => {
            res.status(500).json({
              status: "error",
              message: reason,
            });
          });
      }
  } catch (e) {
      res.status(500).json({ message: 'Пользователь не найден' })
  }
})
router.post('/users/login', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const postData: { email: string; password: string } = {
            email: req.body.email,
            password: req.body.password,
          };
      
          const errors: Result<ValidationError> = validationResult(req);
      
          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
          } else {
            User.findOne({ email: postData.email }, (err: Error, user: IUser) => {
              if (err || !user) {
                return res.status(404).json({
                  message: "User not found",
                });
              }
      
              if (bcrypt.compareSync(postData.password, user.password)) {
                const token = createJWToken(user);
                res.json({
                  status: "success",
                  token,
                });
              } else {
                res.status(403).json({
                  status: "error",
                  message: "Incorrect password or email",
                });
              }
            });
          }
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router