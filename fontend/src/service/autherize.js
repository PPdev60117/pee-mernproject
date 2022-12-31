import { Navigate, useNavigate } from "react-router-dom"




//token / username => session storage
export const authnticate = (response,next)=>{
    if(window !=="undefined"){
        //เก็บข้อมูลลง session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.username))
    }
    next()
}


//ดึงข้อมูล token
export const getToken=()=>{
    if(window !== "unfriend"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

//ดึงข้อมูล user
export const getuser=()=>{
    if(window !== "unfriend"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false
        }
    }
}

export const logout = (next) =>{
    
    if(window != 'undefined'){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}