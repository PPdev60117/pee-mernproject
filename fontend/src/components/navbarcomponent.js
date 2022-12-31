import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getuser, logout} from '../service/autherize'


export default function Navbarcomponent() {
  let navigate = useNavigate()
  return (
    <nav>
        <ul className='nav nav-tabs'>
            <li className='nav-item pr-3 pt-3 pb-3'>
                <Link to='/' className='nav-link'>หน้าแรก</Link>
            </li>
            
            { getuser() && (
                <li className='nav-item pr-3 pt-3 pb-3'>
                  <Link to='/create' className='nav-link'>เขียนบทความ</Link>
              </li>
              )}
            {
              !getuser() && (
                <li className='nav-item pr-3 pt-3 pb-3 '>
                  <Link to='/login' className='nav-link'>เข้าสู่ระบบ</Link>
                </li>
              )
            }
            { getuser() && (
                <li className='nav-item pr-3 pt-3 pb-3 '>
                  <button className='nav-link' onClick={()=>logout(()=>navigate('/'))}>ออกสู่ระบบ</button>
                </li>
              )}
        </ul>
    </nav>
    
  )
}
