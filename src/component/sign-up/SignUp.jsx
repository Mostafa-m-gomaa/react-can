import React, { useContext } from 'react'
import './signUp.css'
import { Link } from 'react-router-dom'
import laptop from"../../assets/laptop.png"
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'

const SignUp = () => {

  const history =useNavigate()
const {messageError,route}=useContext(AppContext)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [phone,setPhone]=useState("")
  const [nasab,setNasab]=useState("")
  const [father,setFather]=useState("")
  const [key,setKey]=useState("")
  const {loader,setLoader}=useContext(AppContext)

  const handleEmail =(e)=>{
    setEmail(e.target.value)
  }
  const handleFather =(e)=>{
    setFather(e.target.value)
  }
  const handlePassword =(e)=>{
    setPassword(e.target.value)
  }
  const handleName =(e)=>{
    setName(e.target.value)
  }
  const handlePhone=(e)=>{
    setPhone(e.target.value)
  }
  const handleNasab =(e)=>{
    setNasab(e.target.value)
  }
  const handleKey =(e)=>{
    setKey(e.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoader(true)
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
  
    try {
      const response = await fetch(`${route}/register`, {
        method: 'POST',
        body: formData,
      })
      .then(res=>res.json())
      console.log(response)
      if (response.status=="Success") { 
        
        history("/login")
        setLoader(false)

       
      } else {
      console.log("error")
  
      setLoader(false)
      messageError(response.errors.error)
      }
    } catch (error) {
      setLoader(false)
      console.error("dw");
    
    
    }
  };

  return (
    <div className="sign-up">
        <div className="container">
        <div className="login-text">
            <h2>سجل في منصتنا الان</h2>
            <img src={laptop} alt="" />
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A voluptates laudantium consequuntur ea, placeat blanditiis eaque, saepe vitae nesciunt officia dolorem libero quia sequi cum? Nulla ducimus debitis voluptatum perferendis.</p> */}
            </div>
            <form onSubmit={handleLogin}>
            <h2>تسجيل مستخدم جديد</h2>

            <input value={email} onChange={handleEmail} type='text' placeholder='ادخل الايميل الخاص بك'/>
            <input value={name} onChange={handleName} type='text' placeholder='ادخل اسمك'/>
            <input value={password} onChange={handlePassword} type='password' placeholder='ادخل كلمة السر'/>
            <input value={phone} onChange={handlePhone} type='text' placeholder='ادخل رقم الجوال'/>
            <button type='submit'>تسجيل الدخول </button>
          

            </form>
        </div>
    </div>
  )
}

export default SignUp
