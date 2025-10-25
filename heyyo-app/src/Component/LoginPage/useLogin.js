// import  { useState, useEffect } from "react";
// import axios from "axios";
// import { apiurl } from "../url";
// import {  useNavigate } from 'react-router-dom';
// import { io } from "socket.io-client";
// import { useUser } from './userContext'

// // import Peer from "simple-peer";

// // // Replace with your server's IP
// const socket = io("http://localhost:4000");

// const useLogin = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         userpassword: '',
//     });
//       const { loginUser, setUserdashboard } = useUser();

//     const ApiUrl1 = apiurl;
   
   
//       const [error, setError] = useState(false);
//   const [info, setInfo] = useState(false);
//   const [infoMessage, setInfoMessage] = useState('')
//   const [successMessage, setSuccessMessage] = useState({});
//   const [errorMessage, setErrorMessage] = useState({});
//   const [warningMessage, setWarningMessage] = useState({});
//     const [warning, setWarning] = useState(false);
//   const [success, setSuccess] = useState(false);
//     const navigate = useNavigate()
//      const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//       const hidePopup = () => {
//     setSuccess(false);
//     setError(false);
//     setInfo(false);
//     setWarning(false);
//   };

//   useEffect(() => {
//     if (error || warning || info || success) {
//       const timer = setTimeout(() => {
//         hidePopup();
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, warning, info, success]);

    


//     // useEffect(() => {
//     //     if (!formData.username) return;

//     //     const fetchData = async () => {
//     //         try {
//     //             const response = await axios.get(`${ApiUrl}/getAllSignUpDatas`, {
//     //                 params: { userLoginName: formData.username },
//     //             });
//     //             console.log(response.data, "uuuuuuuuuuu111111111111");

//     //             if (response.data) {
//     //                 setUserNameData([response.data]);
//     //                 // setLoginContextData([response.data]);
//     //             } else {
//     //                 setUserNameData(null);
//     //             }
//     //         } catch (error) {
//     //             console.error("Error fetching user data:", error);
//     //             setUserNameData(null);
//     //         }
//     //     };

//     //     fetchData();
//     // }, [formData.username, ApiUrl]);
//     const handleLogin = async (e) => {
//  e.preventDefault();
//   if (!formData.username) {
//             setError(true);
//             setErrorMessage("Username requires")
//             return;
//         }
       
//         if (!formData.userpassword) {
//             setError(true);
//             setErrorMessage("Password required")
//             return;
//         }
//        try {
//              const response = await axios.post(`${ApiUrl1}/login`,formData);
//       // const response = await axios.post(`/login`, input);
      
//       console.log(response)
//       if (response.status === 200) {
//         const data = response.data.user;
  
//         // setUserdashboard(true); // its for logo trigger
//         // setLogoTrigger((prev) => !prev);
//         // loginUser(data.username);
//         console.log(data,'dtaa')
//         localStorage.setItem("username", data.user_name);
//             //  socket.emit("newUser", {userName, socketID: socket.id})
//             console.log(socket,"jjjjjj")
//                    socket.emit("newUser", {username :data.user_name,email:data.Email,socket_Id:socket.id,userid:data.Register_id})
      
//         // localStorage.setItem("SuperAdmin", data.superAdmin);
//         localStorage.setItem("useridno", data.Register_id);  
//         // localStorage.setItem("socketiddata",socket.id)
//         setUserdashboard(true)
//         setSuccessMessage("Successfully login");
//         navigate("/home/MainDashboard/dashboard");
//         localStorage.setItem("auth", true);
//       } else {
//         setError(true);
//         setErrorMessage("Check your Network Connection");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         // Handle incorrect username or password
//         setError(true);
//         setErrorMessage("Username or password is incorrect");
        
//     //   }else if (error.response.status === 403) {
//     //     setError(error)
//     //     setErrorMessage("Account is inactive.please contact the admin")
//      } 
//     else {
//         // Handle general errors  
//         setError(true);
//         setErrorMessage("An error occurred while logging in.");
//       } 
//     }
//     };
//     return {
//         formData, setFormData,
//         // handleSubmit,
//         handleLogin,
//         error,
//         handleInputChange,
//         hidePopup,successMessage,errorMessage,infoMessage,success,error

//     }
// }
// export default useLogin;

import { useState, useEffect } from "react";
import axios from "axios";
import { apiurl } from "../url";
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { useUser } from './userContext';


const socket = io("http://localhost:4000");

const useLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        userpassword: '',
    });
    
    const { loginUser, setUserdashboard } = useUser();
    const ApiUrl1 = apiurl;
    
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
     
    
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        
        
        if (error) {
            setError(false);
            setErrorMessage('');
        }
    };

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
            }, 4000); 
            return () => clearTimeout(timer);
        }
    }, [error, warning, info, success]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(formData, 'formData');
        
        if (!formData.username.trim()) {
            console.log("usrnme is empty");
            setError(true);
            setErrorMessage("Please enter your username or email");
            setIsLoading(false);
            return;
        }
        
        if (!formData.userpassword) {
            setError(true);
            setErrorMessage("Please enter your password");
            setIsLoading(false);
            return;
        }

        // if (formData.userpassword.length < 6) {
        //     setError(true);
        //     setErrorMessage("Password must be at least 6 characters");
        //     setIsLoading(false);
        //     return;
        // }

        try {
            setIsLoading(true)
            const response = await axios.post(`${ApiUrl1}/login`, formData);
            
            console.log(response);
            
            if (response.status === 200) {
                const data = response.data.user;
                
                console.log(data, 'data');
                
                
                localStorage.setItem("username", data.user_name);
                localStorage.setItem("useridno", data.Register_id);
                localStorage.setItem("auth", true);
                
                
                console.log(socket, "socket");
                socket.emit("newUser", {
                    username: data.user_name,
                    email: data.Email,
                    socket_Id: socket.id,
                    userid: data.Register_id
                });
                
                
                setUserdashboard(true);
                loginUser(data.user_name);
                setIsLoading(false)
                
               
                setSuccess(true);
                setSuccessMessage("Login successful! Redirecting...");
                
                
                setTimeout(() => {
                    navigate("/home/MainDashboard/dashboard");
                }, 1500);
                
            } else {
                setError(true);
                setErrorMessage("Login failed. Please check your connection.");
            }
        } catch (error) {
            console.error("Login error:", error);
            
            if (error.response && error.response.status === 401) {
                setError(true);
                setErrorMessage("Invalid username or password. Please try again.");
            } else if (error.response && error.response.status === 403) {
                setError(true);
                setErrorMessage("Account is inactive. Please contact support.");
            } else if (error.response && error.response.status === 429) {
                setError(true);
                setErrorMessage("Too many login attempts. Please try again later.");
            } else if (error.code === 'NETWORK_ERROR') {
                setError(true);
                setErrorMessage("Network error. Please check your connection.");
            } else {
                setError(true);
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            username: '',
            userpassword: '',
        });
        hidePopup();
    };

    return {
        formData,
        setFormData,
        handleLogin,
        error,
        success,
        info,
        warning,
        handleInputChange,
        hidePopup,
        successMessage,
        errorMessage,
        infoMessage,
        warningMessage,
        isLoading,
        resetForm,showPassword
    };
};

export default useLogin;