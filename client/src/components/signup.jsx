import React, { useState } from "react";
import {useNavigate, Link } from "react-router-dom";
import axios from 'axios'

function Signup() {
    const [inputField,setInputField] = useState({
        name:"",
        email:"",
        password:"",
        address:""
    })

    const navigate = useNavigate()

const [errorField,setErrorField] = useState({
    errName:"",
    errEmail:"",
    errPassword:"",
    errAddress:""
})



const BASE_API_URL =process.env.REACT_APP_PRO_MODE

const inputChangeHandler=(event)=>{
    setInputField({...inputField,[event.target.name]:event.target.value})
}




const formValidation=()=>{
    let formIsValid = true
    const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);



    setErrorField({
        errName:"",
        errEmail:"",
        errPassword:"",
        errAddress:""
    })

    if(inputField.name ===""){
        formIsValid = false;
    setErrorField(prevstate=>({...prevstate,errName:"** Please enter name"}))
    }

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


    if(inputField.address ===""){
        formIsValid = false;
        setErrorField(prevstate=>({...prevstate,errAddress:"** Please enter  address"}))
    }

    return formIsValid;

}

const submitHandler= async (event)=>{
    event.preventDefault();
    console.log(">>>>>>>",inputField)
    
    if(formValidation()){
        navigate('/login')

        const response = await axios.post(`${BASE_API_URL}/user/signup`,inputField);
           console.log(">>>response>>>>",response)
    }
   
}

    return (
        <>

           <div className="center_form">
            <h1 className="head_singnup">Signup</h1>
           <div className="mb-3 input_form">
                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputName1" 
                    aria-describedby="emailHelp" 
                    name="name"
                    value={inputField.name}
                    onChange={inputChangeHandler}/>
                        
                    {
                        errorField.errName.length>0 && <span className='error'>{errorField.errName}</span>
                    }
                </div>
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
                <div className="mb-3 input_form">
                    <label htmlFor="exampleInputAddres1" className="form-label">Address</label>
                    <input type="email" className="form-control" id="exampleInputAddres1" 
                     name="address"
                     value={inputField.address}
                     onChange={inputChangeHandler}/>
                     {
                        errorField.errAddress.length>0 && <span className='error'>{errorField.errAddress}</span>
                    }
                        
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={submitHandler}>Signup</button>
                <p>Already have on account?<Link to="/login">Login</Link> here</p>
                </div>
        </>
    )
}

export default Signup;