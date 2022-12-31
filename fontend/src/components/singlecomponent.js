import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbarcomponent from './navbarcomponent'
import renderHTML from 'react-render-html';

export default function Singlecomponent() {

    let { slug } = useParams();
    
    const [blog,setblog] =useState({
        title:"",
        content:"",
        author:""

    })
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response=>{
            setblog(response.data)
        })
        .catch(error=>{
            alert(error)
        })
    },[])

    const content = blog.content

  return (
    <div className='container p-5'>
        <Navbarcomponent/>
        <h2>{blog.title}</h2><hr/>
        <div>{renderHTML(content)}</div>
        <p className='text-muted'>ผู้แต่ง:{blog.author} , เผยแพร่เมื่อ:{new Date(blog.createdAt).toLocaleString()}</p>
    </div>
  )
}
