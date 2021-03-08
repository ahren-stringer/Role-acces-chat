import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog'
import Message from '../models/Message'

router.post('/dialogs', async (req: express.Request, res: express.Response) => {
    try {
        let {author, partner}=req.body;
        let dialog = new Dialog({author, partner});
        let dialogObj=await dialog.save();
        let message= new Message({
            text: req.body.text,
            user: req.body.author,
            dialog: dialogObj._id
        });
        let messageObj=await message.save()
        res.json({
            dialog:dialogObj,
            message: messageObj
        })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})

router.get('/dialogs/:id',  (req: express.Request, res: express.Response) => {

    Dialog.find({ author: req.params.id })
        .populate(['author', 'partner'])
        .exec((err: any, dialog:any) => {
            if (err) return res.status(404).json({ message: "Диалог не найден" })
            return res.json(dialog)
        });

})

router.delete('/dialogs/:id', async (req: express.Request, res: express.Response) => {
    try {
        await Dialog.findByIdAndRemove({_id:req.params.id});
        res.json({message: "Пользователь удален"})
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router