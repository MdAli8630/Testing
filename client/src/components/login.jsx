import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [inputField,setInputField] = useState({
        email:"",
        password:"",
       
    })
    const BASE_API_URL =process.env.REACT_APP_PRO_MODE

const [errorField,setErrorField] = useState({
   
    errEmail:"",
    errPassword:""
   
})



const navigate = useNavigate()

const inputChangeHandler=(event)=>{
    setInputField({...inputField,[event.target.name]:event.target.value})
}




const formValidation=()=>{
    let formIsValid = true
    const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);



    setErrorField({
        errEmail:"",
        errPassword:"",
        
    })

    

    if(inputField.email ===""){
        formIsValid = false;
    setErrorField(prevstate=>({...prevstate,errEmail:"** Please enter email"}))
    }
    
    if(inputField.email !=="" && !validEmailRegex.test(inputField.email)){
        formIsValid = false;
        setErrorField(prevstate=>({...prevstate,errEmail:"** Please enter valid email"}))
    }


    if(inputField.password ===""){
        formIsValid = false;
        setErrorField(prevstate=>({...prevstate,errPassword:"** Please enter  password"}))
    }


    

    return formIsValid;

}

const submitHandler=async (event)=>{
    event.preventDefault();
    console.log(">>>>>>>",inputField)
    try{
        if( formValidation()){
            const response = await axios.post(`${BASE_API_URL}/user/login`,inputField,{
                withCredentials:true
            })
        //    const response1 = await fetch(`${BASE_API_URL}/user/login`,{
        //         method:'POST',
        //         headers:{
        //             "Content-Type":"application/json"
        //         },
        //         body:JSON.stringify(inputField)
        //    })

        //    const response =await response1.json()
            console.log(">>>res>",response)
            if(response.status===201){
                toast.success(response.data.message)

                setTimeout(()=>{
                    navigate('/view');
                })
                
            }
           
     }
    }
    catch(error){
        console.log(error)
        console.log(error?.response?.data?.message)
        toast.error(error?.response?.data?.message)
    }
    
   
}

    return (
        <>

           <div className="center_form">
            <h1 className="head_singnup">Login</h1>
           <form method="POST">
                <div className="mb-3 input_form">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    name="email"
                    value={inputField.email}
                    onChange={inputChangeHandler} />
                {
                        errorField.errEmail.length>0 && <span className='error'>{errorField.errEmail}</span>
                    }
                        
                </div>
                <div className="mb-3 input_form">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                     name="password"
                     value={inputField.password}
                     onChange={inputChangeHandler}/>
                  {
                        errorField.errPassword.length>0 && <span className='error'>{errorField.errPassword}</span>
                    }

                </div>
                
                
                <button type="submit" className="btn btn-primary" onClick={submitHandler}>Login</button>
                <p>create New account?<Link to='/signup'>Signup</Link> here</p>
                </form>
                </div>

                <ToastContainer/>
        </>
    )
}

export default Login;