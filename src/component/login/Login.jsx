import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import laptop from"../../assets/laptop.png"
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const history =useNavigate()
const   {login,setLogin,route}=useContext(AppContext)
const   {loader,setLoader}=useContext(AppContext)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [wrong,setWrong]=useState(false)

  const handleEmail =(e)=>{
    setEmail(e.target.value)
  }
  const handlePassword =(e)=>{
    setPassword(e.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoader(true)
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    try {
      const response = await fetch(`${route}/login`, {
        method: 'POST',
        body: formData,
      })
      .then(res=>res.json())
      console.log(response)
      if (response.status=="Success") {
       
        localStorage.setItem("login",true)
        localStorage.setItem("token",response.token)
    
        localStorage.setItem("userName",response.user.name)
        localStorage.setItem("email",response.user.email)
        localStorage.setItem("phone",response.user.phone)
        localStorage.setItem("address",response.user.address)
        history("/")
        // window.location.reload();
        setLogin(true)
        setLoader(false)

        
        
        // Add code to handle successful submission
      } else {
      setWrong(true)
     
      setLoader(false)
    
      }
    } catch (error) {
      console.error(error);
    
    }
  };







  return (
    <div className="login">
        <div className="container">
            <div className="login-text">
            <h2>مرحبا بك في منصتنا</h2>
            <img src={laptop} alt="" />
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A voluptates laudantium consequuntur ea, placeat blanditiis eaque, saepe vitae nesciunt officia dolorem libero quia sequi cum? Nulla ducimus debitis voluptatum perferendis.</p> */}
            </div>
            <form onSubmit={handleLogin}>
            <h2>تسجيل الدخول</h2>
            {wrong?<div className='wrong'>هناك خطا بكلمة السر او الايميل !!</div>:null}

            <input onChange={handleEmail} value={email} type='text' placeholder='ادخل الايميل الخاص بك'/>
            <input onChange={handlePassword} value={password} type='password' placeholder='ادخل كلمة السر'/>
            <button type='submit'>تسجيل الدخول </button>
            <Link to="/sign-up">تسجيل مستخدم جديد </Link>

            </form>
        </div>
    </div>
  )
}  

export default Login
