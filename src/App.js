import './App.css';
import { Link, Route,Routes } from 'react-router-dom';
import Nav from './component/nav/Nav';
import Home from './component/home/Home';
import React, { useContext, useState ,useEffect ,createContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Quess from './component/question/Quess';
import Profile from './component/profile/Profile';
import Raters from './component/raters/Raters';




export const AppContext=createContext()

function App() {
 const [login,setLogin] =useState(false)
 const [token,setToken] =useState("")
 const [userName,setUserName] =useState("")
 const [loader ,setLoader] =useState(false)
 const [route ,setRoute]=useState("https://n-m-nstty.onrender.com/api/v1")
 const [data,setData] =useState("sayed")

 useEffect(()=>{
  if(localStorage.getItem("login")){
    setLogin(true)
  }

 },[login])


  return (
    <AppContext.Provider value={{
   
    route,
    setRoute,
    userName,
    setUserName,
    login,
    setLogin ,
    token,
    setToken ,
    loader,
    setLoader ,
    data }}>

      <div className="App">
      <ToastContainer />
      {loader ?    <div className="spin-cont"><div className="spinner">
  <div className="rect1"></div>
  <div className="rect2"></div>
  <div className="rect3"></div>
  <div className="rect4"></div>
  <div className="rect5"></div>
</div></div>:null}

     <Nav />
     <Routes>
     <Route
       path="/"
       element={<Home />}
     />
     <Route path="/ques" element={<Quess/>}/>
     <Route path="/raters" element={<Raters/>}/>
     <Route path="/profile" element={<Profile/>}/>

   </Routes>



  
  
 </div>
  
 </AppContext.Provider>
  );
}

export default App;
