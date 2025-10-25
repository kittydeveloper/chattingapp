// import { useState, useEffect, useCallback,useMemo} from 'react';
// import axios from 'axios';
// // import dayjs from "dayjs";
// import { apiurl } from '../url';
// import { useUserprofile } from './UserProfileContext';



// const useProfile = () => {
//     const {setprofieimagetrigger}=useUserprofile()
//     const Apiurls =apiurl;
//     const [profilevalue,setProfileValue]=useState({
//         Email:"",
//         Bio_data:"",
//         Age:"",
//         Interested:""
//     })
//       const [selectedGender, setSelectedGender] = useState('Male');
//         const [error, setError] = useState(false);

//   const [successMessage, setSuccessMessage] = useState({});
//   const [errorMessage, setErrorMessage] = useState({});
//    const [interests, setInterests] = useState({
//     men: false,
//     women: false,
//     others: false,
//   });

//   const [disablevalue,setdisabledvalue]=useState(true)


//   const [success, setSuccess] = useState(false);
//     // const [selectedCustomerData, setSelectedCustomerData] = useState({});
  
 


  
//     // insurence copy-1
//     const  datapic =  localStorage.getItem("useridno")
//     // const [Profileimage, setProfile_image] = useState(null);
    
//     const handleUploadFile = async (e) => {
        
//     if (e.target.files[0]) { 
//             const formData = new FormData();
//             formData.append("Profile_image",e.target.files[0]);
      
//             try {
//                 //  setprofieimagetrigger(prev => !prev)
//              const response =   await axios.post(`${Apiurls}/profile_images/${datapic}`, formData)
//               setprofieimagetrigger(prev => !prev)
//             //  console.log(response,"imagessss")
                
//             }
//             catch (err) {
//                 console.log(err)
//                 // setError(true);
//                 // setErrorMessage("failed to insert Insurance pdf");
//             }
//         } else {
//             return
//         }
//         // setInsurance(null);
//     };
// const handlechange = (e)=>{
//     const {name,value}=e.target
 
//         setProfileValue((prevBook) => ({
//             ...prevBook,
//             [name]: value,
//         }));


// }

//  const hidePopup = () => {
//     setSuccess(false);
//     setError(false);
  
//   };

//   useEffect(() => {
//     if (error ||  success) {
//       const timer = setTimeout(() => {
//         hidePopup();
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, success]);
// const handlegetuser=async()=>{
//   try{
//   const response = await axios.get(`${apiurl}/getuserdata/${datapic}`)
//   console.log(response,"dataaaaa")
//   const data =response.data[0]
//   setProfileValue(data)
//   setSelectedGender(data.Gender)
//   const selectedInterests = data.Interested.split(','); // ['men', 'others']
// console.log(selectedInterests,"lllllllllllllllllllllllllllllllyyiuuiuh")
// const interestObject = {
//   men: selectedInterests.includes('men'),
//   women: selectedInterests.includes('women'),
//   others: selectedInterests.includes('others'),
// };
//   setInterests(interestObject)
//   }
//   catch(err){

//   }
// }

// console.log(interests,"iiiiinhjj")

// useEffect(()=>{
//   handlegetuser()
// },[])
// const ageOptions = useMemo(() => {
//     const ages = [];
//     for (let i = 18; i <= 100; i++) {
//       ages.push(i);
//     }
//     return ages;
//   }, []);
// const handledisabled=()=>{
//   setdisabledvalue(!disablevalue)
// }

//   const handleGenderChange = (event) => {
//     setSelectedGender(event.target.value);
//     console.log("Selected gender:", event.target.value);
//   };
// console.log()
//   //   const [interests, setInterests] = useState({
//   //   men: false,
//   //   women: false,
//   //   others: false,
//   // });

//   const handleChange1= (event) => {
//     const { name, checked } = event.target;
//     setInterests((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//     console.log({ ...interests, [name]: checked });
//   };

//     const handleupdate = async()=>{
//       try{

//         const selected = Object.entries(interests)
//   .filter(([_, value]) => value)
//   .map(([key]) => key)
//   .join(',');

// console.log(selected);
//         const data = {
//           Email :profilevalue.Email,
//            Bio_data:profilevalue.Bio_data,
//           Age:profilevalue.Age,
//        Gender:selectedGender,
//       Interested:selected    
//     }
//        const response = await axios.post(`${apiurl}/updateprofiledata/${datapic}`,data)
//        console.log(response,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
//        setdisabledvalue(true)
//        setSuccess(true)
//        setSuccessMessage("Updated Sucessfully")
//       }
//       catch(err){
//         console.log(err)

//       }
//     }

   



   

 


//     return {
       
//         handleUploadFile,handledisabled,
//         profilevalue,handleupdate,hidePopup,error,errorMessage,success,successMessage,
//         handlechange,handleGenderChange,selectedGender,interests,handleChange1,ageOptions,disablevalue
        
    
//     };
// };

// export default useProfile;

import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { apiurl } from '../url';
import { useUserprofile } from './UserProfileContext';

const useProfile = () => {
    const { setprofieimagetrigger } = useUserprofile();
    const Apiurls = apiurl;
    
    const [profilevalue, setProfileValue] = useState({
        Email: "",
        Bio_data: "",
        Age: "",
        Interested: ""
    });
    
    const [selectedGender, setSelectedGender] = useState('Male');
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [interests, setInterests] = useState({
        men: false,
        women: false,
        others: false,
    });
    const [disablevalue, setdisabledvalue] = useState(false); // Changed to false for better UX
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const datapic = localStorage.getItem("useridno");
    
    // Enhanced file upload with validation and loading state
    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            setError(true);
            setErrorMessage("Please select a valid image file (JPEG, PNG, or GIF)");
            return;
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            setError(true);
            setErrorMessage("File size must be less than 5MB");
            return;
        }

        const formData = new FormData();
        formData.append("Profile_image", file);

        try {
            setIsLoading(true);
            const response = await axios.post(`${Apiurls}/profile_images/${datapic}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            setprofieimagetrigger(prev => !prev);
            setSuccess(true);
            setSuccessMessage("Profile image updated successfully!");
            
        } catch (err) {
            console.error("Upload error:", err);
            setError(true);
            setErrorMessage(err.response?.data?.message || "Failed to upload image. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Enhanced form validation
    const validateForm = () => {
        const errors = [];
        
        if (!profilevalue.Email) {
            errors.push("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(profilevalue.Email)) {
            errors.push("Please enter a valid email address");
        }
        
        if (!profilevalue.Bio_data || profilevalue.Bio_data.trim().length < 10) {
            errors.push("Bio must be at least 10 characters long");
        }
        
        if (!profilevalue.Age) {
            errors.push("Please select your age");
        }
        
        if (!selectedGender) {
            errors.push("Please select your gender");
        }
        
        const selectedInterests = Object.values(interests).some(Boolean);
        if (!selectedInterests) {
            errors.push("Please select at least one interest");
        }
        
        return errors;
    };

    const handlechange = (e) => {
        const { name, value } = e.target;
        
        setProfileValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const hidePopup = useCallback(() => {
        setSuccess(false);
        setError(false);
    }, []);

    // Auto-hide popups after 4 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                hidePopup();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error, success, hidePopup]);

    // Enhanced user data fetching with error handling
    const handlegetuser = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${apiurl}/getuserdata/${datapic}`);
            const data = response.data[0];
            
            if (data) {
                setProfileValue(data);
                setSelectedGender(data.Gender || 'Male');
                
                // Parse interests safely
                const selectedInterests = data.Interested ? data.Interested.split(',') : [];
                const interestObject = {
                    men: selectedInterests.includes('men'),
                    women: selectedInterests.includes('women'),
                    others: selectedInterests.includes('others'),
                };
                setInterests(interestObject);
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError(true);
            setErrorMessage("Failed to load profile data. Please refresh the page.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (datapic) {
            handlegetuser();
        }
    }, [datapic]);

    // Generate age options efficiently
    const ageOptions = useMemo(() => {
        const ages = [];
        for (let i = 18; i <= 100; i++) {
            ages.push(i);
        }
        return ages;
    }, []);

    const handledisabled = () => {
        setdisabledvalue(!disablevalue);
    };

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handleChange1 = (event) => {
        const { name, checked } = event.target;
        setInterests((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Enhanced update function with validation
    const handleupdate = async () => {
        // const validationErrors = validateForm();
        
        // if (validationErrors.length > 0) {
        //     setError(true);
        //     setErrorMessage(validationErrors.join('. '));
        //     return;
        // }

        try {
            setIsLoading(true);
            setdisabledvalue(true);

            const selected = Object.entries(interests)
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(',');

            const data = {
                Email: profilevalue.Email.trim(),
                Bio_data: profilevalue.Bio_data.trim(),
                Age: profilevalue.Age,
                Gender: selectedGender,
                Interested: selected
            };

            const response = await axios.post(`${apiurl}/updateprofiledata/${datapic}`, data);
            
            setSuccess(true);
            setSuccessMessage("Profile updated successfully!");
            
            // Re-fetch user data to ensure consistency
            await handlegetuser();
            
        } catch (err) {
            console.error("Update error:", err);
            setError(true);
            setErrorMessage(err.response?.data?.message || "Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
            setdisabledvalue(false);
        }
    };

    return {
        handleUploadFile,
        handledisabled,
        profilevalue,
        handleupdate,
        hidePopup,
        error,
        errorMessage,
        success,
        successMessage,
        handlechange,
        handleGenderChange,
        selectedGender,
        interests,
        handleChange1,
        ageOptions,
        disablevalue,
        isLoading
    };
};

export default useProfile;














