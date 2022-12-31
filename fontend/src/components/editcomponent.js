import { useState ,useEffect} from "react"
import Navbarcomponent from "./navbarcomponent";
import axios from "axios"
import Swal from "sweetalert2"
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill"
import { getToken } from "../service/autherize";
//theme react quill
import "react-quill/dist/quill.snow.css"


const Editcomponent=()=>{
    const [state,setstate] = useState({
        title:"",
        author:"",
        slug:""
    })

    const [content,setcontent] = useState('')

    const {title,author} = state;
    let { slug } = useParams();
    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`,
        {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        })
        .then(response=>{
            const {title,content,author,slug} = response.data
            setstate({...state,title,author,slug})
            setcontent(content)
            
        })
        .catch(error=>{
            alert(error)
        })
    },[])

    const submitcontent =(event)=>{
        setcontent(event)
    }

    const inputValue = (event) =>{
        const {name,value} = event.target
        setstate((prev)=>{
            return{
                ...prev,[name]:value
            }
        })
        

    }

    const subMitdata=(e)=>{
        e.preventDefault();
        // console.table({title,content,author})
        // console.log(process.env.REACT_APP_API)
        axios.put(`${process.env.REACT_APP_API}/blog/edit/${slug}`,{title,content,author})
        .then((response)=>{
            Swal.fire(
                'แจ้งเตือน',
                'อัพเดตบทความเรียบร้อย',
                'success'
            )
            const{title,content,author,slug}=response.data
            setstate({...state,title,content,author,slug})
        })
        .catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
            console.log(err)
        })
    }

    const showupdateform=()=>(
        <>
        <h1>แก้ไขบทความ</h1>
            <div className="container p-5">
            <form onSubmit={subMitdata}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className = "form-control" value={title} name = "title" onChange={inputValue}/>
                </div>

                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill 
                        value={content}
                        onChange={submitcontent}
                        theme='snow'
                        className="pb-5 mb-3"
                        placeholder="เขียนรายละเอียดบทความของคุณ"
                        style={{border : '1px solid #666'}}
                    />
                </div>

                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className = "form-control" value={author}  name = "author" onChange={inputValue}/>
                </div>

                <input type="submit" className="btn btn-primary mt-2" value="อัพเดต"/> 
            </form>
        </div>
        </>
    )

    return(
        <div className="container p-5">
            <Navbarcomponent/>
            {showupdateform()}
        </div>
    )
}

export default Editcomponent