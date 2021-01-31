import express from 'express';
const { Router } = express;
const router = Router()
import Post from '../models/Post.js'
import mongoose from 'mongoose'
import multer from 'multer'
import path from "path";
import fs from 'fs'

const storage = multer.diskStorage({
    destination: "./public/posts/",
    filename: function(req, file, cb) {
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
        console.log("Request file ---", req.file); //Here you get file.
        const {
            title,
            categories,
            content,
            // token 
        } = req.body
        const post = new Post({ img: req.file, title, content, categories });
        post.save().then(() => {
                res.send({ message: "uploaded successfully" })
            })
            /*Now do where ever you want to do*/
    });
}

router.post("/posts", obj);

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file).toString('base64');
    return bitmap
}

router.get("/posts", async(req, res) => {
    try {
        const posts = await Post.find()
        console.log(posts)
        let arr = posts.map(item => {
            let obj = {};
            obj.img = 'data:image/png;base64,' + base64_encode(path.normalize(item.img.destination + item.img.filename))
            obj.title = item.title
            obj.content = item.content
            obj.categories = item.categories
            return obj
        })
        res.send(arr)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
        console.log(e)
    }
});

router.get("/posts/:title", async(req, res) => {
    try {
        const post = await Post.find({ title: req.params.title })
        console.log(post)
        res.send('<div>' + post[0].text + '<div>')
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
});

// // Поиск

// router.get('/place_category/places/search/:search', async (req, res) => {
//     try {
//         const places = await Place.find()

//         res.json(places.filter(item=> item.name.toLowerCase().includes(req.params.search)).slice(0,8))
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

// router.get('/place_category/places/search_all/:search', async (req, res) => {
//     try {
//         const places = await Place.find()
//         res.json(places.filter(item=> item.name.toLowerCase().includes(req.params.search)))
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

// // по категориям
// router.get('/place_category/places/category/:placeCategory', async (req, res) => {
//     try {
//         const places = await Place.find({ categoryUrl: req.params.placeCategory }).exec()
//         res.json(places)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// // определенное количество
// router.get('/place_category/places/some/:placeCategory/:limit/:skip', async (req, res) => {
//     try {
//         const places = await Place.find({categoryUrl:req.params.placeCategory}).limit(+req.params.limit).skip(+req.params.skip)
//         res.json(places)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// router.get('/place_category/places/category_count/:category', async (req, res) => {
//     try {
//         const place = await Place.find({categoryUrl: req.params.category})
//         res.json(place.length)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// // по местам
// router.get('/place_category/places/:name', async (req, res) => {
//     try {
//         const places = await Place.find({name:req.params.name}).exec()
//         res.json(places)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

// // Популярность
// router.put('/place_category/places/:id', async (req, res) => {
//     try {
//         await Place.findByIdAndUpdate({_id:req.params.id},req.body)
//         let place= await Place.findById(req.params.id)
//         console.log(place)
//         res.send('+1')
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// router.get('/popular', async (req, res) => {
//     try {      
//         let places= await Place.find().exec()
//         let arr=[]
//         for (let i=0;i<places.length;i++){
//             if ('popular' in places[i] && places[i].popular){
//                 arr.push(places[i])
//             }
//         }
//         arr.sort((a, b) => b.popular - a.popular)
//         res.json(arr)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// router.get('/popular/some', async (req, res) => {
//     try {
//         let places= await Place.find().exec()
//         let arr=[]
//         for (let i=0;i<places.length;i++){
//             if ('popular' in places[i] && places[i].popular){
//                 arr.push(places[i])
//             }
//         }
//         arr.sort((a, b) => b.popular - a.popular)
//         res.json(arr.slice(0,6))
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
export default router