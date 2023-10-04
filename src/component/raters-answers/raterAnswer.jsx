import React, { useState } from 'react'
import './raters.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RaterAnswer = () => {
    const [code,setCode]=useState("")
    const [email,setEmail]=useState("")

    const verifyLink =(e)=>{
        if(code === "" || email ===""){
            e.preventDefault()
            toast.error("يجب ملء كل البيانات")
        }
    }
  return (
    <div className="rater-answer">
        <div className="container">
            <h2>بيانات المقيم</h2>
            <div className="form">
                <label htmlFor="">
                    الكود المرسل
                    <input placeholder='fes2f62fds3f2d6f2d6' type="text" onChange={(e)=>setCode(e.target.value)} />
                </label>
                <label htmlFor="">
                    الأيميل الخاص بك
                    <input placeholder='example@gmail.com' type="email" onChange={(e)=>setEmail(e.target.value)} />
                </label>
                <Link onClick={verifyLink} to={`/raters/${email}/${code}`}>بداية التقييم</Link>
            </div>
        </div>
    </div>
  )
}

export default RaterAnswer
