import axios from 'axios';

const URL = 'http://localhost:8000';

const sendFeedback = async (feedback)=>{
    try{
        await axios.post(`${URL}/feedback`,feedback);
        console.log("Feedback sended");
    }
    catch(err){
        console.log("Feedback send error", err);
    }
}

const createPost = async (post) =>{
    try{
        await axios.post(`${URL}/create`,post);
        console.log("Post Created Successfully");
    }
    catch(err){
        console.log("Creating Post Error", err);
    }
}

const getPost = async (type) =>{
    try{
        if(type === "All"){
            let data = await axios.get(`${URL}/getAllData`);
            return data;
        }
        else{
            let data = await axios.get(`${URL}/getAllData/?category=${type}`);
            return data;
        }
    }
    catch(err){
        console.log("Get Post Error", err)
    }
}

const getDetailData = async (id) =>{
    try{
        let data = await axios.get(`${URL}/detailData/${id}`);
        return data;
    }
    catch(err){
        console.log("Get Detail Data Error", err)
    }
}

const deletePost = async (id) =>{
    try{
        await axios.delete(`${URL}/deleteKardo/${id}`);
    }
    catch(err){
        console.log("Delete Error", err);
    }
}

const updateKardoPost = async (id,dataToUpdate) =>{
    try{
        await axios.put(`${URL}/updateKardo/${id}`,dataToUpdate);
    }
    catch(err){
        console.log("Post Updated")
    }
}

const uploadFile = async (post) =>{
    console.log(post);
    try {
        return await axios.post(`${URL}/file/upload`, post);
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}

export {createPost, getPost,getDetailData,deletePost,updateKardoPost,uploadFile,sendFeedback};