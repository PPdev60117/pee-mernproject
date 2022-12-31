import axios from "axios";
import { useEffect, useState } from "react";
import Navbarcomponent from "./components/navbarcomponent";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"
import renderHTML from "react-render-html"
import { getuser,getToken } from "./service/autherize";



function App() {
  const [blogs,setblogs] = useState([])

  const fetchData = ()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then((response)=>{
      setblogs(response.data)
    })
    .catch((error)=>{
      alert(error)
    })
  }

  useEffect(()=>{
    fetchData()
  },[])

  
  const confirmDelete=(slug)=>{
    Swal.fire({
      title:"คุณต้องการลบบทความหรือไม่",
      icon:"warning",
      showCancelButton:true
    }).then((result)=>{//เก็บค่าว่ากดปุ่ม ok หรือไม่
        if(result.isConfirmed){
          deleteBlog(slug)
        }
    })
  }

  const deleteBlog=(slug)=>{
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
      headers:{
        authorization:`Bearer ${getToken()}`
      }
    })
    .then(response=>{
      Swal.fire(
        'delete', response.data.message ,"success"
      )
      fetchData()
    })
    .catch((error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
  }

  return (
    <div className="container p-5">
      <Navbarcomponent/>
      {blogs.map((blog,index)=>{
        return(
         <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}><h2>{blog.title}</h2></Link>
            <div className="pt-3">{renderHTML(blog.content.substring(0,250))}</div>
            <p className="text-muted">ผู้แต่ง:{blog.author} , เผยแพร่เมื่อ:{new Date(blog.createdAt).toLocaleString()}</p>
            {getuser() && (
              <div>
                <Link to={`/blog/edit/${blog.slug}`} className="btn btn-outline-success">อัพเดตบทความ</Link>
                <button className="btn btn-outline-danger m-2" onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
              </div>
            )}
          </div>
        </div> 
        )
      })}
    </div>
  );
}

export default App;
