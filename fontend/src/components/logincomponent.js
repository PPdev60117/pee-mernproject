import React, { useEffect, useState } from 'react'
import Navbarcomponent from './navbarcomponent'
import axios from 'axios';
import Swal from 'sweetalert2';
import { authnticate, getuser } from '../service/autherize';
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

const Logincomponent=(props)=> {

    let navigate = useNavigate();

    const [state,setstate] = useState({
        username:"",
        password:""
    })

    const {username,password} = state;

    const inputValue = (event) =>{
        const {name,value} = event.target
        setstate((prev)=>{
            return{
                ...prev,[name]:value
            }
        })
    }

    useEffect(()=>{
        getuser() && (
            navigate('/')
        )
    },[])

    const subMitdata=(e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            //login success
            authnticate(response,()=>navigate("/create"))
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


  return (
    <div>
        <div className="container p-5">
            <Navbarcomponent/>
            <h1>เข้าสู่ระบบ | Admin</h1>
            <form onSubmit={subMitdata}>
                <div className="form-group">
                    <label>username</label>
                    <input type="text" className = "form-control" value={username} name = "username" onChange={inputValue}/>
                </div>

                <div className="form-group">
                    <label>password</label>
                    <input type="password" className = "form-control" value={password}  name = "password" onChange={inputValue}/>
                </div>

                <input type="submit" className="btn btn-primary mt-2" value="เข้าสู่ระบบ"/> 
            </form>
        </div>
    </div>
  )
}


export default Logincomponent