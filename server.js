require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary');
const multer = require('multer');

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

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Your API is running smoothly.'
    });
});

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'Fail',
        message: 'The resource you are looking for cannot be found!'
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});