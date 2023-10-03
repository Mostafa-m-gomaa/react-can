import React, { useContext, useEffect ,useCallback } from 'react'
import { useState } from 'react';
import { AppContext } from '../../App';
import logo from "../../assets/logoo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ques.css'
import { useNavigate } from 'react-router-dom';


const Quess = () => {
    const {route ,setLoader }=useContext(AppContext)
    const [ques,setQues]=useState([])
    const [answers,setAnswers]=useState([])
    const [email1,setEmail1]=useState("")
    const [email2,setEmail2]=useState("")
    const [email3,setEmail3]=useState("")
    const history =useNavigate()

    const handleAnswers = (num, id) => {
        const newObject = {
          questionId: id,
          answer: num
        };
        setAnswers([...answers, newObject]);
        console.log(answers)
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true)
        if(answers.length != ques.length){
          toast.error("يجب ان تجاوب علي كل الاسئلة")
          setLoader(false)
          console.log(answers.length)
          console.log(ques.length)
          console.log(answers)
        }
        if(answers.length === ques.length){
         
          const raterEmails =[sessionStorage.getItem("email1") ,sessionStorage.getItem("email2") ,sessionStorage.getItem("email3")]
          const raterNames =[sessionStorage.getItem("name1") ,sessionStorage.getItem("name2") ,sessionStorage.getItem("name3")]
          try {
            const response = await fetch(`${route}/answer/saveanswers`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json' ,
                "Authorization" :`Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({
                  raterEmails : raterEmails ,
                  raterNames : raterNames ,
                  answers :answers
              })
            })
            .then(res=>res.json())
            console.log(response)
            setLoader(false)
            if (response.status === "you have submitted your answers successfully") {
              toast.success("تم الارسال")
              history("/")
      
            } if(response.errors){
          toast.error(response.errors[0].msg)
          
            }
          } catch (error) {
            console.error(error);
          
          }
        }
      };
  

    useEffect(()=>{
        fetch(`${route}/questions`,{
            headers:{
                "Authorization" :`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.data){
            setQues(data.data)
       
          }
        })
      },[])
  return (
<div className="ques">
    <div className="container">
        <div className="head">
            <div>الأسئلة</div>
            <img src={logo} alt="" />
        </div>
        <div className="all-ques">
            {ques.map((ques,index)=>{
                return(
                    <div className="ques-card" key={index}>
                        <div className="text">{index+1} - {ques.text}</div>
                        <div class="radio-input">
  <label  >
  <input onClick={()=>handleAnswers(1,ques._id)}  value="value-1" name={ques.text} id="value-1" type="radio" />
  <span >1</span>
  </label>
  <label  >
    <input onClick={()=>handleAnswers(2,ques._id)} value="value-2" name={ques.text} id="value-2" type="radio" />
  <span >2</span>
  </label>
  <label>
    <input onClick={()=>handleAnswers(3,ques._id)} value="value-3" name={ques.text} id="value-3" type="radio" />
  <span >3</span>
  </label>
  <label>
    <input onClick={()=>handleAnswers(4,ques._id)} value="value-3" name={ques.text} id="value-3" type="radio" />
  <span >4</span>
  </label>
  <label>
    <input onClick={()=>handleAnswers(5,ques._id)} value="value-3" name={ques.text} id="value-3" type="radio" />
  <span >5</span>
  </label>
  <span class="selection"></span>
</div>
                    </div>
                )
            })}

        </div>
            <button onClick={handleSubmit}>ارسال الاجابات</button>


    
    </div>
</div>
    )
}

export default Quess
