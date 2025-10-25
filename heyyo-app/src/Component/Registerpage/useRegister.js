import React,{useState,useEffect} from "react"
import axios from 'axios'
import { apiurl} from "../url"
import {  useNavigate } from 'react-router-dom';

export default function useRegisterpage() {
    const Apiurl1 = apiurl

const[register,setRegisterdata]=useState({
    user_name:"",
    Email:"",
    password:"",

})
      const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrormessage] = useState({});
  const [warningMessage, setWarningMessage] = useState({});
    const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate()

const handlechange=(e)=>{
    //  e.preventDefault();
    console.log("eeeeee")
    const {name,value}=e.target
    console.log(name,value)
    setRegisterdata({
            ...register,
            [name]: value,
        });

}

    const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    if (error || warning || info || success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, warning, info, success]);

  
const handleadd = async(e)=>{
      e.preventDefault();
    if(!register.user_name){
        console.log("kkk")
        setError(true);
        setErrormessage("Enter the user_name")
        return
    }
     if(!register.Email){
        setError(true);
        setErrormessage("Enter the Email")
        return
    }
     if(!register.password){
        setError(true);
        setErrormessage("Enter the password")
        return
    }
    try{
        setIsLoading(true);
        
const response = await axios.post(`${Apiurl1}/register`,register)


      // const response = await axios.post(`/login`, input);
      console.log(response,"hhhhhhhhhhhhhhhhhhhhhhhhh")
      
      
      if (response && response.status === 200) {
        const data = response.data;
  console.log(response,'jj')
setSuccess(true)
// setSuccessMessage("ll")
        
      
        localStorage.setItem("username", data.user_name);
        
        // localStorage.setItem("SuperAdmin", data.superAdmin);
        // localStorage.setItem("useridno", data.userid);  
        setSuccess(true)
        setSuccessMessage("Successfully Added");
         setIsLoading(false);
        // sett
        // navigate("/LoginForm");
        setTimeout(() => {
  navigate("/LoginForm");
}, 5000);
        localStorage.setItem("auth", true);
      } else {
        setError(true);
setErrormessage("Check your Network Connection");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle incorrect username or password
        setError(true);
        setErrormessage("Username or password is incorrect");
        
      }else if (error.response.status === 403) {
        setError(error)
        setErrormessage("Account is inactive.please contact the admin")
      } else {
        // Handle general errors  
        setError(true);
        setErrormessage("An error occurred while logging in.");
      } 
    }
    
}
return{hidePopup,successMessage,errorMessage,infoMessage,success,error,
    register,handlechange,handleadd,isLoading,showPassword,setShowPassword
}
}












