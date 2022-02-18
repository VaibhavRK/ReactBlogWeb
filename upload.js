const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const storage = new GridFsStorage({
    url: process.env.DATABASE,
    options: { useUnifiedTopology: true, useNewUrlParser: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

module.exports = multer({storage});