require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const multer = require('multer');
const AppError = require('./appError');
const globalErrorHandler = require('./globalErrorHandler');
const cors = require('cors');

const app = express();

cloudinary.config({
    cloud_name: 'immanueldiai',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const multerStorage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now());
    }
});

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        return cb(new AppError('Please upload an image file!', 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: imageFilter,
    limits: { fieldSize: 10 * 1024 * 1024 }
});

const uploadImage = upload.single('image');

app.use(cors());
app.options('*', cors());

app.enable('trust proxy');

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Your API is running smoothly.'
    });
});

app.post('/upload-image', uploadImage, async (req, res, next) => {
    try {
        if (!req.file) return next(new AppError('You need to upload an image file!', 400));

        const result = await cloudinary.v2.uploader.upload(req.file.path);
        return res.status(200).json({
            status: 'success',
            url: result.secure_url
        });
    } catch (error) {
        next(error);
    }
});

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'The resource you are looking for cannot be found!'
    });
});

app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});