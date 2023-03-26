import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import path from 'path'
import sharp from 'sharp'
const app = express()
const port = 4000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const index = req.files?.length ?? 0
        const ext = path.extname(file.originalname)
        const fn = `real-${index.toString()}${ext}`
        cb(null, fn)
    },
})

const upload = multer({ storage })

app.use(cors())
app.use(bodyParser.urlencoded({ limit: '2gb', extended: false }))
app.use(bodyParser.json())
app.use('/static/compressed', express.static(path.join('compressed')))
app.use('/static/uploads', express.static(path.join('uploads')))

app.post('/compress-thumbnail', upload.array('files'), (req, res) => {
    const files = req.files as Express.Multer.File[]
    const fullURLs: string[][] = []
    const imageURLs: string[] = []
    const imageRealURLs: string[] = []
    let counter = 0

    files.map(async (val, i) => {
        const imagePath = val.path
        const imageOut = `compressed/thumb-${i + 1}.jpg`
        const imgURL = imageOut
        const realURL = `${val.path}`
        await sharp(imagePath)
            .resize({
                width: 126,
                height: 158,
                fit: 'cover',
            })
            .jpeg({ quality: 100 })
            .toFile(imageOut)
            .then(() => {
                imageURLs.push(imgURL)
                imageRealURLs.push(realURL)
                counter++
                if (counter === files.length) {
                    fullURLs.push(imageURLs)
                    fullURLs.push(imageRealURLs)
                    // console.log(imageURLs)
                    // console.log(imageRealURLs)
                    res.json(fullURLs)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
})

app.listen(port, () => {
    console.log('Server running on port 4000')
})
