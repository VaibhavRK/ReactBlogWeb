const grid = require('gridfs-stream');
const mongoose = require('mongoose');

const url = '';


let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


const uploadImage = (request, response) => {
    if(!request.file) {
        return response.status(404).json("File not found");
    }
    
    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);    
}

const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        console.log(file);
        var readStream = gfs.createReadStream(file.filename);
        readStream.pipe(response);
        // response.send(readStream);
    } catch (error) {
        response.status(500).json('Failed to fetch image', error);
    }
}

module.exports = {uploadImage,getImage};