import React from 'react';
import '../styles/PostCard.css';
import Tilt from 'react-parallax-tilt';
import ReactMarkdown from 'react-markdown';

function Post({post}) {   
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const setElipse = (str) =>{
        if(str.length > 80){
            return `${str.substring(0,80)}...`
        }
        else return str;
    }

    const setElipseHeading = (str) =>{
        str = str.replace("# ","");
        str = str.replace("## ","");
        str = str.replace('### ',"");
        str = str.replace('#### ',"");
        str = str.replace('##### ',"");
        str = str.replace('###### ',"");
        let resultStr = str;
        if(resultStr.length > 17){
            return `${resultStr.substring(0,17)}...`
        }
        else return resultStr;
    }

    return (
        <Tilt style={{height:'300px',width: '300px',glareEnable:true,margin:'20px 10px'}}>
        <div className='Post-Card' >
            <img src={url} alt="" />
            <div className="all-blog-data">
                 <p style={{fontSize:'0.8rem'}}>Category: {post.categories}</p>
                 <h4 style={{fontSize:'1.4rem',marginTop:-16}}>{setElipseHeading(post.title)}</h4>
                 <p style={{fontSize:'0.8rem',marginTop:-6}} >Author: {setElipse(post.author)}</p>
                 <p style={{marginTop:-15,textAlign:'center'}}>{setElipse(post.description)}</p>
            </div>
        </div>
      </Tilt>
    )
}

export default Post;