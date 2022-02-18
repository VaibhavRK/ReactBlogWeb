import React, { useEffect } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { AiOutlineArrowRight } from 'react-icons/ai';
import '../styles/CreatePost.css';
import { useState } from 'react';
import {createPost,uploadFile} from '../services/api.js';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config';

let initialPost = {
    title: '',
    description:'',
    picture: '',
    categories:'All',
    author:'',
    email:'',
    createDate: new Date()
}

function CreatePost() {
    let history = useHistory();
    const [user,setUser] = useState(null);
    const [post,setPost] = useState(initialPost);
    const [file,setFile] = useState('');
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const [imageURL, setImageURL] = useState('');

    const handlePost = (e)=>{
        setPost({...post,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
          setUser(currentUser);
        });

        if(user !== null){
              setPost({...post,email:user.email});
        }
    },[user]);

    const savePost = async () =>{
        if(!user){
            toast.warn("Login Required! for creating Blog", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              return;
        }
        if(post.title && post.author && post.description){
            try{
                await createPost(post);
                history.goBack();
            }
            catch(err){
                console.log("Create Post", err);
            }
        }
        else{
            toast.warn("Plz Enter all required Data", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }

    useEffect(()=>{
        const getImage = async () =>{
            if(file){
                let data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                console.log(Array.from(data));
                   
                const image = await uploadFile(data);
                console.log(image);
                post.picture = image.data;
                setImageURL(image.data);
            }
        }

        getImage();
    },[file]);

    return (
        <div className='CreatePostApp'>
            <img src={url} alt="" width='100%' height='500px' style={{marginLeft:5, marginTop: 10,marginRight:5 }} />

            <div className="create-title">
               <label htmlFor='fileInput'>
                <IoIosAddCircle size={40} color='rgb(16, 233, 16)' />
               </label>
                <input type="file" name="picture" id="fileInput" style={{display:'none'}} onChange={(e)=>{setFile(e.target.files[0]); console.log(e.target.files[0])}} />
                <input name='title' type="text" placeholder='Title' onChange={(e)=>{handlePost(e)}} />
            </div>

            <div className="create-title">
                <label htmlFor="category" style={{color:'white',textShadow:'0 0 5px rgb(16, 233, 16)',fontSize:'1.2rem',marginRight:20}}>
                   Category
                </label>
                <select className='category-sec' name="categories" id="category" onChange={(e)=>handlePost(e)}>
                    <option value="All">All</option>
                    <option value="Coding">Coding</option>
                    <option value="Tech">Tech</option>
                    <option value="Music">Music</option>
                    <option value="Movies">Movies</option>
                    <option value="News">News</option>
                </select>
            </div>
            <div className="create-title">
                <input name='author' type="text" placeholder='Author' onChange={(e)=>{handlePost(e)}} autoComplete='off' />
            </div>

            <div className='create-blog-data'>
                <textarea name="description" id="" cols="30" rows="10" placeholder='Enter your Story....' onChange={(e)=>{handlePost(e)}}></textarea>
            </div>

            <div className="create-blog-button2" onClick={savePost}>
               <div className="take-ref">
                <AiOutlineArrowRight size={40} className="arrow2" />
                <button>Publish Blog</button>
                <div className='back-animation2'></div>
               </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreatePost;