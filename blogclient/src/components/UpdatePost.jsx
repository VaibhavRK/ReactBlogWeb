import React, { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useHistory, useParams } from 'react-router-dom';
import { getDetailData, updateKardoPost, uploadFile } from '../services/api';
import '../styles/CreatePost.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdatePost() {
  const {id} = useParams();
  const [updata,setUpdata] = useState({});
  const [file,setFile] = useState('');
  const [imageURL, setImageURL] = useState('');
  let history = useHistory();
  const url = updata.picture !== '' ? updata.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
  
  
  useEffect(()=>{
    const fetchData = async () =>{
      try{
          let data = await getDetailData(id);
          console.log(data.data);
          setUpdata(data.data);
          // setUpdatePost(data.data);
      }
      catch(err){
          console.log("Get Detail Data Error", err)
      }
    }
    fetchData();
  },[]);

  useEffect(()=>{
    const getImage = async () =>{
        if(file){
            let data = new FormData();
            data.append("name", file.name);
            data.append("file", file);

            console.log(Array.from(data));
               
            const image = await uploadFile(data);
            console.log(image);
            setUpdata({...updata,picture:image.data})
            setImageURL(image.data);
        }
    }

    getImage();
},[file]);

  const handleData = (e) =>{
    setUpdata({...updata,[e.target.name]:e.target.value});
  }

  const updatePost = async () =>{
    let today = new Date();
    setUpdata({...updata,createDate:today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()});
    console.log(updata.categories);
      if(updata.title && updata.description && updata.author){
        try{
          await updateKardoPost(id,updata);
          history.push(`/`);
        }
        catch(err){
          console.log("Update Error", err);
        }
      }
      else{
        toast.warn("Plz Enter all data", {
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

  return (
    <div>
        <div className='CreatePostApp'>
            <img src={url} alt="" width='100%' height='500px' style={{marginLeft:5, marginTop: 10,marginRight:5 }} />

            <div className="create-title">
            <label htmlFor='fileInput'>
                <IoIosAddCircle size={40} color='rgb(16, 233, 16)' />
               </label>
                <input type="file" name="picture" id="fileInput" style={{display:'none'}} onChange={(e)=>{setFile(e.target.files[0]); console.log(e.target.files[0])}} />
                <input name='title' type="text" placeholder='Title' value={updata.title} onChange={(e)=>handleData(e)} />
            </div>
            
            <div className="create-title">
                <label htmlFor="category" style={{color:'white',textShadow:'0 0 5px rgb(16, 233, 16)',fontSize:'1.2rem',marginRight:20}}>
                   Category
                </label>
                <select value={updata.categories} className='category-sec' name="categories" id="category" onChange={(e)=>handleData(e)}>
                    <option value="All">All</option>
                    <option value="Coding">Coding</option>
                    <option value="Tech">Tech</option>
                    <option value="Music">Music</option>
                    <option value="Movies">Movies</option>
                    <option value="News">News</option>
                </select>
            </div>

            <div className='create-blog-data'>
                <textarea name="description" id="" cols="30" rows="10" placeholder='Enter your Story....' value={updata.description} onChange={(e)=>handleData(e)} ></textarea>
            </div>

            <div className="create-blog-button2" onClick={updatePost}>
               <div className="take-ref">
                <AiOutlineArrowRight size={40} className="arrow2" />
                <button>Update Blog</button>
                <div className='back-animation2'></div>
               </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default UpdatePost;