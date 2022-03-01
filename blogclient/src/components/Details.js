import React, { useEffect, useState } from 'react';
import { AiTwotoneEdit,AiFillDelete } from 'react-icons/ai';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../styles/Details.css'
import {getDetailData,deletePost} from '../services/api.js';
import {confirm} from 'react-confirm-box';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config';
import ReactMarkdown from 'react-markdown';


function Details() {
  const {id} = useParams();
  const [user,setUser] = useState(null);
  const [detailData,setDetailData] = useState({});
  let history = useHistory();
  const url = detailData.picture !== '' ? detailData.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(()=>{
      const fetchData = async () =>{
        try{
            let data = await getDetailData(id);
            console.log(data.data);
            setDetailData(data.data);
        }
        catch(err){
            console.log("Get Detail Data Error", err)
        }
      }
      fetchData();
  },[]);

  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
    });
   },[user]);

  const delPost = async () =>{
      try{
          await deletePost(id);
          history.goBack();
      }
      catch(err){
          console.log(err);
      }
  }

  const options = {
    labels: {
      confirmable: "Yes I really find something wrong",
      cancellable: "No I am not Sure"
    }
  }

  const handleAuthor = async () =>{
      let check = await confirm("If you really find something wrong in the Blog only then try to change it",options);
      if(check === true){
          history.push(`/update/${id}`);
        }else{
          history.push('/');
      }
  }

  return (
    <div className='DetailsApp'>
        <img src={url} alt="" width='100%' height='500px' style={{marginTop:10}} />
        <div className={user === null || user.email !== detailData.email ? "edit-options details-edit-hide" : "edit-options"} >
             <AiTwotoneEdit onClick={handleAuthor} size={40} color='#13e70c' style={{backgroundColor:'white',borderRadius:10,padding:10,margin:5,cursor:'pointer',boxShadow:'0 0 10px red'}} />
            <AiFillDelete size={40} color='red' style={{backgroundColor:'white',borderRadius:10,padding:10,margin:5,cursor:'pointer',boxShadow:'0 0 10px rgb(10, 250, 10)'}} onClick={delPost} />
        </div>
        <div className="blog-title">
            <h1>{detailData.title}</h1>
        </div>

        <div className="author-detail-date">
            <span> <span style={{color:'white'}}>Author : </span> {detailData.author}</span>
            <span>{new Date(detailData.createDate).toDateString()}</span>
        </div>

        <div className="blog-data">
          <ReactMarkdown> {detailData.description} </ReactMarkdown>
        </div>
    </div>
  )
}

export default Details;