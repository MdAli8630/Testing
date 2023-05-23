import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [inputField,setInputField] = useState({
        email:"",
        password:"",
       
    })

const [errorField,setErrorField] = useState({
   
    errEmail:"",
    errPassword:""
   
})


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

const submitHandler=(event)=>{
    event.preventDefault();
    console.log(">>>>>>>",inputField)
    formValidation()
}

    return (
        <>

           <div className="center_form">
            <h1 className="head_singnup">Login</h1>
           
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
                
                
                <button type="submit" className="btn btn-primary" onClick={submitHandler}>Submit</button>
                <p>create New account?<Link to='/signup'>Signup</Link> here</p>
                </div>
        </>
    )
}

export default Login;