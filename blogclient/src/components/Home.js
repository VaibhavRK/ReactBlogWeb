import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import Post from './Post'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import { getPost } from '../services/api.js';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Home() {

  const [allPostData, setAllPostData] = useState([]);

  useEffect(async () => {
    let data = await getPost("All");
    setAllPostData(data.data);
  },[]);

  const handleTypes = async (type) =>{
    try{
       let data = await getPost(type);
       setAllPostData(data.data);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <Banner />
      <div className="category-posts" style={{ display: 'flex' }}>
        <div className="category">
          <div className='categoryApp'>
            <Link to='/create' style={{ textDecoration: 'none' }}>
              <div className="create-blog-button">
                <AiOutlineArrowRight size={40} className="arrow" />
                <button>Create Blog</button>
                <div className='back-animation'></div>
              </div>
            </Link>
            <ul className='category-list'>
              <li style={{cursor:'pointer'}} onClick={() => handleTypes("All")}>All Category</li>
              <li style={{cursor:'pointer'}} onClick={() => handleTypes("Coding")}>Coding</li>
              <li style={{cursor:'pointer'}} onClick={() => handleTypes("Tech")}>Tech</li>
              <li style={{cursor:'pointer'}} onClick={() => handleTypes("Music")}>Music</li>
              <li style={{cursor:'pointer'}} onClick={() => handleTypes("Movies")}>Movies</li>
              <li style={{cursor:'pointer'}} onClick={() => handleTypes("News")}>News</li>
            </ul>
          </div>
        </div>
        <div className="all-posts">
          {
            allPostData.map((ele) => {
              const toUrl = `/details/${ele._id}`;
              return (
                <Link to={toUrl} style={{ textDecoration: 'none' }}>
                  <Post post={ele} />
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home;