import express from 'express';
const { Router } = express;
const router = Router()
import PostCategory from '../models/PostCategory.js'
import multer from 'multer'
import path from "path";
import fs from 'fs'

const storage = multer.diskStorage({
    destination: "./public/categories/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
}).single("myfile");

const obj = (req, res) => {
    upload(req, res, () => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);
        const {category} = req.body
        const categories = new PostCategory({ img: req.file, category });
        categories.save().then(() => {
            res.send({ message: "uploaded successfully" })
        })
    });
}

router.post("/category", obj);

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file).toString('base64');
    return bitmap
}

router.get("/category", async (req, res) => {
    try {
        const categories = await PostCategory.find()
        let arr = categories.map(item => {
            let obj = {};
            obj.img = 'data:image/png;base64,' + base64_encode(path.normalize(item.img.destination + item.img.filename))
            obj.category = item.category
            return obj
        })
        res.send(arr)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
        console.log(e)
    }
});
router.get('/category/some', async (req, res) => {
    try {
        let categories = await PostCategory.find()
        let arr = categories.map(item => {
            let obj = {};
            obj.img = 'data:image/png;base64,' + base64_encode(path.normalize(item.img.destination + item.img.filename))
            obj.category = item.category
            return obj
        })
        res.json(arr.slice(0, 6))
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
// router.post(
//     '/category',
//     async (req, res) => {
//         try {
//             const { category} = req.body
//             const condidate = await PostCategory.findOne({ category })
//             if (condidate) {
//                 return res.status(400).json({ message: 'Такая категория уже есть' })
//             }
//             const newCategory = new PostCategory({ category });

//             await newCategory.save()

//             res.status(201).json({ message: 'Категория зарегистрирована' })
//         } catch (e) {
//             res.status(500).json({ message: 'Ошибка записи' })
//         }
//     })

//     router.get(
//     '/category',
//     async (req, res) => {
//         try {
//             const category = await PostCategory.find()
//             res.json(category)
//         } catch (e) {
//             res.status(500).json({ message: 'Что-то пошло не так' })
//         }
//     })

//     router.get('/category/some', async (req, res) => {
//     try {
//         let categories= await PostCategory.find().exec()
//         res.json(categories.slice(0,6))
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
export default router