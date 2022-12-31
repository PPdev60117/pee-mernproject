import { useState } from "react"
import Navbarcomponent from "./navbarcomponent";
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
//theme react quill
import "react-quill/dist/quill.snow.css"
import { getToken, getuser } from "../service/autherize";



const Formcomponent=()=>{
    const [state,setstate] = useState({
        title:"",
        author:getuser()
    })
    const {title,author} = state;

    const [content,setcontent] = useState('')

    const inputValue = (event) =>{
        const {name,value} = event.target
        setstate((prev)=>{
            return{
                ...prev,[name]:value
            }
        })
    }

    const submitcontent =(event)=>{
        setcontent(event)
    }

    const subMitdata=(e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/create`,
        {title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        })
        .then((res)=>{
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            )
            setstate({...state,title:"",author:"",})
            setcontent('')
        })
        .catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        })
    }

    return(
        <div className="container p-5">
            <Navbarcomponent/>
            <h1>เขียนบทความ</h1>
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

                <input type="submit" className="btn btn-primary mt-2" value="บันทึก"/> 
            </form>
        </div>
    )
}

export default Formcomponent