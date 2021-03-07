import express from 'express';
const { Router } = express;
const router=Router()
import User from '../models/User'

router.get('/profile/:userId', async (req: express.Request, res: express.Response) => {
        try { 
            console.log(req.params.userId)           
            const user = await User.findById(req.params.userId);
            console.log(user)
            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка пользователя' })
        }
    })
export default router