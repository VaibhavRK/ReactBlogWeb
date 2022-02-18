const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const express = require('express');
const app = express();
const connection = require('./database/db.js');
const cors = require('cors');
const bodyParser = require('body-parser')
const postModal = require('./schemas/postSchema.js');
const feedbackModal = require('./schemas/feedbackSchema.js');
const { uploadImage, getImage } = require('./controller/image-controller.js');
const upload = require('./upload.js');


app.use(express.json());
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.post('/feedback', async (req,res)=>{
    try{
        let data = new feedbackModal(req.body);
        const result = await data.save();
        res.send("Feedback Sended");
    }
    catch(err){
        console.log("feeback sending error", err);
    }
})

app.post('/create',async (req,res)=>{
   try{
       let data = new postModal(req.body);
       const result = await data.save();
       res.send("Created");
   }
   catch(err){
       console.log("posting error", err);
   }
});

app.get('/getAllData', async (req,res)=>{
    let category = req.query.category;
    console.log(category);
    try{
        if(category){
            let data = await postModal.find({categories:category});
            res.send(data);
        }
        else{
            let data = await postModal.find({});
            res.send(data);
        }
    }catch(err){
        console.log("Getting Data error", err);
    }
});

app.get('/detailData/:id', async (req,res)=>{
    try{
        let data = await postModal.findById(req.params.id);
        res.send(data);
    }
    catch(err){
        console.log("Detail Data error", err);
    }
})

app.delete('/deleteKardo/:id', async (req,res)=>{
    try{
        let data = await postModal.findByIdAndDelete(req.params.id);
        console.log(data);
        res.send("Deleted");
    }
    catch(err){
        console.log(err);
    }
});

app.put('/updateKardo/:id', async (req,res) =>{
    console.log(req.body);
    console.log(req.params.id);
    try{
        let data = await postModal.findByIdAndUpdate(req.params.id,{title:req.body.title,description:req.body.description,categories:req.body.categories});
        console.log(data);
        res.send("Updated");
    }
    catch(err){
        console.log(err);
    }
});

app.post('/file/upload',upload.single('file'), uploadImage);

app.get('/file/:filename',getImage);

const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV === "production"){
    app.use(express.static("blogclient/build"))
}

app.listen(PORT, ()=>console.log(`Server is Running on Port ${PORT}`));

connection();