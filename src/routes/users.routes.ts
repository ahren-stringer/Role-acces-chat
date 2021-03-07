import express from 'express';
const { Router } = express;
const router = Router()
import User from '../models/User'

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
export default router