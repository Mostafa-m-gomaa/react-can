import React from 'react'
import './raters.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Raters = () => {

    const verifyEmails =(e)=>{
        const email1 =sessionStorage.getItem("email1")
        const email2 =sessionStorage.getItem("email2")
        const email3 =sessionStorage.getItem("email3")
if(email1 === email2 || email1 === email3 || email2 === email3){
    e.preventDefault()
    toast.error("لايمكن تكرار الايميل")
}
    }
  return (
<div className="raters">
    <div className="container">
    <h2>أدخل بيانات ل 3 أشخاص سيقومون بتقييمك</h2>
            <label htmlFor="" >
              <input onChange={(e)=>sessionStorage.setItem("name1",e.target.value)} type="text" placeholder='اكتب  هنا' required />
                اسم الأول
            </label>
            <label htmlFor="" >
                <input onChange={(e)=>sessionStorage.setItem("email1",e.target.value)} type="email" placeholder='اكتب  هنا' required />
                ايميل الاول
            </label>
            <hr />
            <label htmlFor="" >
               <input onChange={(e)=>sessionStorage.setItem("name2",e.target.value)} type="text" placeholder='اكتب  هنا' required />
                اسم الثاني
            </label>
            <label htmlFor="" >
               <input onChange={(e)=>sessionStorage.setItem("email2",e.target.value)} type="email" placeholder='اكتب هنا' required />
                ايميل الثاني
            </label>
            <hr />
            <label htmlFor="" >
                <input onChange={(e)=>sessionStorage.setItem("name3",e.target.value)} type="text" placeholder='اكتب  هنا' required />
                اسم الثالث
            </label>
            <label htmlFor="" >
                <input onChange={(e)=>sessionStorage.setItem("email3",e.target.value)} type="email" placeholder='اكتب  هنا' required />
                ايميل الثالث
            </label>

            <Link onClick={verifyEmails} to="/ques">اذهب للاختبار</Link>
    </div>
</div>
  )
}

export default Raters
