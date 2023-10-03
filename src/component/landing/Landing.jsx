import React, { useContext, useState } from 'react'
import './landing.css'
import foto from "../../assets/fefefefef.png"
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Landing = () => {
  const [code,setCode]=useState("")
  const {setLoader,route ,setLogin}=useContext(AppContext)
  const history = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoader(true)
    try {
      const response = await fetch(`${route}/auth/loginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
      code : code
        })
      })
      .then(res=>res.json())
      console.log(response)
      setLoader(false)
      if (response.token) {
        toast.success("done")
        localStorage.setItem("login",true)
        localStorage.setItem("token",response.token)
        localStorage.setItem("userName",response.data.name)
        localStorage.setItem("email",response.data.email)
        localStorage.setItem("userId",response.data._id)
        setLogin(true)
        history("/raters")

      } 
      if(response.status === "fail" && response.message === 'you have taken exam before'){
        toast.error("عليك مراجعة المشرف لتتمكن من الاختبار مرة اخري")
      }
  
    } catch (error) {
      console.error(error);
    
    }
  };
  return (
    <div className="landing">
        <div className="container">
    <div className="login">
      <form action="" onSubmit={handleLogin}>
        <label htmlFor="">تسجيل الدخول باستخدام الكود
        
        <input placeholder='أدخل الكود هنا' type="text" value={code} onChange={(e)=>setCode(e.target.value)} />
        </label>
        <button>دخول</button>
      </form>
    </div>
    <div className="img">

    <img src={foto} alt="" />
    </div>
        </div>
    </div>
  )
}

export default Landing
