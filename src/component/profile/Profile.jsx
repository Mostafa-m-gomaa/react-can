import'./profile.css'
import React, { useContext, useState ,useRef,useEffect ,} from 'react'
import { PureComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import App, { AppContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from 'html2canvas';
import logo from "../../assets/logoo.png"
import { font } from './alfont_com_arial-1-normal';
import './alfont_com_arial-1.ttf'
import border from '../../assets/pngfind.com-square-border-png-259718.png'
import screen from '../../assets/Screenshot 2023-10-03 052406.png'

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Example = () => {
  const {route}=useContext(AppContext)
  const [fullReport,setFullReport]=useState([])

  useEffect(()=>{
    sessionStorage.setItem("full",false)
    fetch(`${route}/answer/getUserAnswersReportTotal/${localStorage.getItem("userId")}`, {
      headers: {
        "Authorization" :`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZlMTcwMGVjZTEwNTI4NDkxZTRmNmQiLCJpYXQiOjE2OTUzMjQxODYsImV4cCI6MTcwMzEwMDE4Nn0.ydQBflW4_4DgFb0pNwiKEBaq1QRYgMWxvuOyiLMKcLA`
      }
    })
    .then(res=>res.json())
    .then(data=>{
console.log(data)
      if (data) {
        if(!JSON.parse(sessionStorage.getItem("full"))){

          data.forEach((item) => {
            const newOb = {
              name: item.key,
            " ذاتي قبلي": item.graph.userBefore,
              "ذاتي بعدي": item.graph.userAfter,
              amt: item.totalDifference.raters,
            };
            setFullReport((prevFullReport) => [...prevFullReport, newOb]);
            sessionStorage.setItem("full",true)
          });
        
        }
       
      }
      
    })
  },[])
 
  return (
    <ResponsiveContainer width="70%" height="100%" >
      <BarChart
        width={200}
        height={100}
        data={fullReport}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis  />
        <Tooltip />
        <Legend />
        <Bar dataKey=" ذاتي قبلي" fill="#28BBBC" />
        <Bar dataKey="ذاتي بعدي" fill="#ed833e" />
      </BarChart>


    </ResponsiveContainer>
  );
};
const ExampleRater = () => {
  const {route}=useContext(AppContext)
  const [fullReport,setFullReport]=useState([])

  useEffect(()=>{
    sessionStorage.setItem("fulla",false)
    fetch(`${route}/answer/getUserAnswersReportTotal/${localStorage.getItem("userId")}`, {
      headers: {
        "Authorization" :`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZlMTcwMGVjZTEwNTI4NDkxZTRmNmQiLCJpYXQiOjE2OTUzMjQxODYsImV4cCI6MTcwMzEwMDE4Nn0.ydQBflW4_4DgFb0pNwiKEBaq1QRYgMWxvuOyiLMKcLA`
      }
    })
    .then(res=>res.json())
    .then(data=>{
console.log(data)
      if (data) {
        if(!JSON.parse(sessionStorage.getItem("fulla"))){

          data.forEach((item) => {
            const newOb = {
              name: item.key,
            " أخرين قبلي": item.graph.raterBefore,
              "أخرين بعدي": item.graph.raterAfter,
              amt: item.totalDifference.raters,
            };
            setFullReport((prevFullReport) => [...prevFullReport, newOb]);
            sessionStorage.setItem("fulla",true)
          });
        
        }
       
      }
      
    })
  },[])
 
  return (
    <ResponsiveContainer width="70%" height="100%">
      <BarChart
        width={200}
        height={100}
        data={fullReport}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis  />
        <Tooltip />
        <Legend />
        <Bar dataKey=" أخرين قبلي" fill="#28BBBC" />
        <Bar dataKey="أخرين بعدي" fill="#ed833e" />
      </BarChart>


    </ResponsiveContainer>
  );
};




const Profile = () => {
  const {setLoader,route ,setLogin}=useContext(AppContext)
  const [ques,setQues]=useState([])
  const [showResult,setShowResult]=useState(false)
  const [showReport,setShowReport]=useState(false)
  const [keys,setKeys]=useState([])
  const [report,setReport]=useState([])
  const [keyName,setKeyName]=useState("")
const [exNum,setExNum]=useState("")
const [fullReport,setFullReport]=useState([])
const [showFullReport,setShowFullReport]=useState(false)

  const exportPdf =  () => {
    html2canvas(document.getElementById('element-to-capture')).then(canvas => {
      // const screenshotDataUrl = canvas.toDataURL();
      // const screenshotImage = new Image();
      // screenshotImage.src = screenshotDataUrl;
      // document.body.appendChild(screenshotImage);
    });
    const doc = new jsPDF({ orientation: "landscape" });
    doc.addImage(logo, 'JPEG' , 10,10,40,20)

    doc.addFileToVFS('alfont_com_arial-1.ttf', font);
    doc.addFont('alfont_com_arial-1.ttf', 'alfont_com_arial-1', 'normal');
    doc.setFont("alfont_com_arial-1");
    doc.text(localStorage.getItem("email"), 20, 50);
    doc.text(localStorage.getItem("userName"), 200, 50);
    doc.text(keyName, 120, 50);
  

      doc.autoTable({
        html: "#element-to-capture",
        styles: {
          font: 'alfont_com_arial-1', // Set the font to the Arabic font
          fontSize: 11, // Adjust the font size as needed
          marginTop : "400px"
        },
        startY: 60
      });
     doc.save("mypdf.pdf");
  };



  const exportReport =  () => {
    html2canvas(document.getElementById('element')).then(canvas => {
      const screenshotDataUrl = canvas.toDataURL();
      const screenshotImage = new Image();
      screenshotImage.src = screenshotDataUrl;

      // const doc = new jsPDF({ orientation: "landscape" });
      const doc = new jsPDF({
        orientation: 'portrait', // 'portrait' or 'landscape' orientation
        unit: 'mm', // Measurement unit (millimeters)
        format: ['280', '300'], // Page size defined by width and height
      });
      
    
      doc.addFileToVFS('alfont_com_arial-1.ttf', font);
      doc.addFont('alfont_com_arial-1.ttf', 'alfont_com_arial-1', 'normal');
      doc.setFont("alfont_com_arial-1");
      // const text = 'التقرير الجمعي لمقياس';
      // doc.addImage(border, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      // doc.setFontSize(40);
      // doc.text(text , 90, 50 );
      // doc.addImage(logo, 'JPEG' , 80,90,120,30)
      // doc.setFontSize(30);
      // doc.text(`قياس أثر البرنامج `, 105, 160);
      // doc.setFontSize(25);
      // doc.text(`مجموعة بناء`, 117, 190);

      doc.addImage(screen, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    
      fullReport.forEach((tableData, index) => {
        // if (index !== 0) {
        //   doc.addPage();
        // }
        doc.addPage();
        doc.addImage(border, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
        doc.addImage(logo, 'JPEG' , 10,10,40,15)
        doc.setFontSize(20);
        doc.setTextColor(232, 234, 237, 1.00);
        doc.text(`: ${tableData.key}`, 210, 50);
        doc.text(`: ${tableData.key}`, 210, 100);
    
    
        doc.autoTable({
          html: `#sayed${index}`,
          styles: {
            font: 'alfont_com_arial-1', // Set the font to the Arabic font
            fontSize: 13, // Adjust the font size as needed
            valign: 'middle', // Center vertically
            halign: 'center', // Center horizontally
          },
          theme:"grid",
          startY: 120
        });
        doc.autoTable({
          html: `#small${index}`,
          styles: {
            font: 'alfont_com_arial-1', // Set the font to the Arabic font
            fontSize: 11, // Adjust the font size as needed
            valign: 'middle', // Center vertically
            halign: 'center', // Center horizontally
          },
          theme:"grid",
          startY: 60
        });
      });
  
      
      doc.addPage();
      doc.addImage(logo, 'JPEG' , 5,5,40,15)
      // doc.text("مقياس نعم أستطيع", 130, 35);
      doc.addImage(screenshotImage , 'JPEG' , 5,75 , 270 , 200)
       doc.save("mypddf.pdf");
 
    });
 
    // doc.text(localStorage.getItem("email"), 20, 50);
    // doc.text(localStorage.getItem("userName"), 200, 50);
    // doc.text(keyName, 120, 50);
    
  };



  const exportExam =  () => {
    html2canvas(document.getElementById('exam')).then(canvas => {
      const screenshotDataUrl = canvas.toDataURL();
      const screenshotImage = new Image();
      screenshotImage.src = screenshotDataUrl;
      // document.body.appendChild(screenshotImage);
      const doc = new jsPDF({ orientation: "landscape" });
 
   
      doc.addImage(screenshotImage , 'JPEG' , 20,30)
       doc.save("mypdf.pdf");
    });
  };

  const getQuiz =(num, status)=>{
    setExNum(status)
    fetch(`${route}/answer/getUserAnswers/${localStorage.getItem("userId")}/${num}`, {
      headers: {
        "Authorization" :`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZlMTcwMGVjZTEwNTI4NDkxZTRmNmQiLCJpYXQiOjE2OTUzMjQxODYsImV4cCI6MTcwMzEwMDE4Nn0.ydQBflW4_4DgFb0pNwiKEBaq1QRYgMWxvuOyiLMKcLA`
      }
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
    if(data.status === "faild"){
      toast.error(data.msg)
    }
    else{
      setQues(data)
      setShowResult(true)
    }
    })
  }
  const getReport =(id ,name)=>{
 setKeyName(name)
    fetch(`${route}/answer/getUserAnswersReport/${id}/${localStorage.getItem("userId")}`, {
      headers: {
        "Authorization" :`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZlMTcwMGVjZTEwNTI4NDkxZTRmNmQiLCJpYXQiOjE2OTUzMjQxODYsImV4cCI6MTcwMzEwMDE4Nn0.ydQBflW4_4DgFb0pNwiKEBaq1QRYgMWxvuOyiLMKcLA`
      }
    })
    .then(res=>res.json())
    .then(data=>{
 
      if(data.status === "faild"){
        toast.error(data.msg)
      }
      else if(data.errors){
        toast.error(data.errors[0].msg)
      }
      else{
        setShowReport(true)
        setReport(data)
      }
    })
  }
  const getFullReport =()=>{
    setLoader(true)
    fetch(`${route}/answer/getUserAnswersReportTotal/${localStorage.getItem("userId")}`, {
      headers: {
        "Authorization" :`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZlMTcwMGVjZTEwNTI4NDkxZTRmNmQiLCJpYXQiOjE2OTUzMjQxODYsImV4cCI6MTcwMzEwMDE4Nn0.ydQBflW4_4DgFb0pNwiKEBaq1QRYgMWxvuOyiLMKcLA`
      }
    })
    .then(res=>res.json())
    .then(data=>{
 setLoader(false)
      console.log(data)
      if(data){
        setShowFullReport(true)
        setFullReport(data)
      }
      else{
        toast.error("لم تكمل الخطوات")
      }
    })
  }

  

  

  useEffect(()=>{
    fetch(`${route}/keys`,{
      headers:{
        "Authorization" :`Bearer ${localStorage.getItem("token")}`
    }
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.data){
        setKeys(data.data)
      }
    })

    
    fetch(`${route}/answer/getUserAnswersReportTotal/${localStorage.getItem("userId")}`, {
      headers: {
        "Authorization" :`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZlMTcwMGVjZTEwNTI4NDkxZTRmNmQiLCJpYXQiOjE2OTUzMjQxODYsImV4cCI6MTcwMzEwMDE4Nn0.ydQBflW4_4DgFb0pNwiKEBaq1QRYgMWxvuOyiLMKcLA`
      }
    })
    .then(res=>res.json())
    .then(data=>{
 
      console.log(data)
      if(data){
        setFullReport(data)
      }
    })
  },[])
  return (
<div className="profile">

 
{showResult ?   <div className="results" onClick={()=>setShowResult(false)}>
    <h2>النتائج</h2>
    <div className="in-results" id='exam'>
    <img src={logo} alt="" />
      <div className="user-data">
      <div className="name">{localStorage.getItem("userName")}</div>
      <div className="email">{localStorage.getItem("email")}</div>
      <div>{exNum}</div>
      </div>
    <table id="my-table" >
        <thead>
          <tr>
            <th>الاٍجابه</th>
            <th>السؤال</th>
    
          </tr>
        </thead>
        <tbody>
          {ques.map((item, index) => (
            <tr key={index}>
              <td>{item.userAnswer}</td>
              <td>{item.question}</td>
          
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    {/* <button
        onClick={exportExam}
      >
        Export
      </button> */}
  </div> : null}


{showReport ? 
  <div className="report" onClick={() => setShowReport(false)}>
    <h2>تقرير</h2>
    <div className="in-report" >
      <img src={logo} alt="" />
      <div className="user-data">
      <div className="name">{localStorage.getItem("userName")}</div>
      <div className="email">{localStorage.getItem("email")}</div>
      <div>{keyName}: المفتاح</div>
      </div>
      <table id='element-to-capture' >
        <thead>
          <tr>
            <th> فرق المقيمين</th>
            <th> فرق الذاتي</th>
            <th> المقيمين قبل</th>
            <th> المقيمين بعد</th>
            <th>ذاتي بعد</th>
            <th>ذاتي قبل</th>
            <th>السؤال</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item, index) => (
            <tr key={index}>
              <td>{item.after.raters  -item.before.raters }</td>
              <td>{ item.after.user-item.before.user}</td>
              <td>{item.before.raters}</td>
              <td>{item.after.raters}</td>
              <td>{item.after.user}</td>
              <td>{item.before.user}</td>
              <td>{item.question}</td>
            </tr>
          ))}
        </tbody>
      </table>
   
      <div>
        
      </div>
    </div>
    <button
        onClick={exportPdf}
      >
        Export
      </button>
  </div>
 : null}
    <div className="container">
      <h1>الصفحة الشخصية و التقارير</h1>
        <div className="data">
          <div>البيانات الشخصية</div>
          <div>
  
    </div>
          <div className="name">{localStorage.getItem("userName")}</div>
          <div className="email">{localStorage.getItem("email")}</div>
        </div>
        <div className="quiz-data">
          <div onClick={()=>getQuiz(1 ,"الاٍختبار الثاني")} className="second">نتائج الاختبار الثاني</div>
          <div onClick={()=>getQuiz(0 ,"الاٍختبار الأول" )} className="first">نتائج الاختبار الاول</div>
        </div>
   
        <div className="keys" >
          <h2>التقرير الشامل</h2>
          <div className="in-keys">
            {/* {keys.map((key,index)=>{
              return(
                <div onClick={()=>getReport(key._id ,key.name)}  className="key-card" key={index}>
                  <div  className="name">{key.name}</div>

                </div>
              )
            })} */}
                <div onClick={getFullReport} className="key-card" >
                  <div className="name">التقرير الشامل</div>

                </div>
            
          </div>
        </div>
        {showFullReport ?<div className="full-report">
          <div className="over" onClick={()=>setShowFullReport(false)}></div>
          <div className="in-full">
<h1>التقرير المجمع</h1>
            {fullReport.map((rep,index)=>{
              return(
                <div className="table" key={index}>
                  <h2>{rep.key}</h2>
                  <table id={`sayed${index}`} >
        <thead>
          <tr>
            <th> فرق المقيمين</th>
            <th> فرق الذاتي</th>
            <th> المقيمين قبل</th>
            <th> المقيمين بعد</th>
            <th>ذاتي بعد</th>
            <th>ذاتي قبل</th>
            <th>السؤال</th>
          </tr>
        </thead>
        <tbody>
          {rep.questions.map((item, index) => (
            <tr key={index}>
              <td>{item.avg.raters }</td>
              <td>{ item.avg.user}</td>
              <td>{item.before.raters}</td>
              <td>{item.after.raters}</td>
              <td>{item.after.user}</td>
              <td>{item.before.user}</td>
              <td>{item.question}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{rep.key}</h2>
      <table id={`small${index}`} className='small'>
        <thead>
          <tr>
            <th> ذاتي </th>
            <th> الأخرين</th>
           
          </tr>
        </thead>
        <tbody>
          
            <tr >
              <td>{rep.totalDifference.raters }</td>
              <td>{rep.totalDifference.user }</td>
                        </tr>
        
        </tbody>
      </table>
                </div>
              )
            })}
            
<div className="graph" id="element">
<div className='grapgh-title'>مقياس نعم أستطيع (ذاتي)</div>
            <div id="element1">
            <Example />
            </div>
            <div className='grapgh-title'>مقياس نعم أستطيع (أخرين)</div>
            <div id="element1">
            
            <ExampleRater/>            </div>
</div>
           
            
            
            <button  onClick={exportReport}>تحميل</button>
          </div>
        </div> :null}
    </div>
      
</div>
  )
}



export default Profile
