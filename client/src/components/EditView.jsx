import React, { useEffect, useState } from "react";
import {useNavigate, Link ,useParams} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

function EditView() {
    const [state, setState] = useState({
        name: "",
        email: "",
        address: ""

    })
    const { name, email, address } = state
    const navigate = useNavigate()

const {id} = useParams()
console.log(">>>>>>id>",id)


const BASE_API_URL =process.env.REACT_APP_PRO_MODE


const inputChangeHandler=(event)=>{
    setState({...state,[event.target.name]:event.target.value})
    
}


useEffect(()=>{
    loadUser()
},[])





const submitHandler= async (event)=>{
    event.preventDefault();
   
    try{
        const result = await axios.put(`${BASE_API_URL}/user/update-user/${id}`,state)
        console.log(">>>result>>",result)
        if(result.status===201){
              toast.success(result.data.message)
              setTimeout(()=>{
                navigate("/view")
              },2000)
           
        }
       
    }
    catch(error){
        console.log(error)
    }
   
   
}


const loadUser =async () =>{
    const response = await axios.get(`${BASE_API_URL}/user/fetch-signle-user/${id}`)
      console.log(">>response>>>>",response)
      setState(response.data.data)
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
                    value={name}
                    onChange={inputChangeHandler}/>
                        
                    
                </div>
                <div className="mb-3 input_form">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    name="email"
                    value={email}
                    onChange={inputChangeHandler} />
               
                        
                </div>
               
                <div className="mb-3 input_form">
                    <label htmlFor="exampleInputAddres1" className="form-label">Address</label>
                    <input type="email" className="form-control" id="exampleInputAddres1" 
                     name="address"
                     value={address}
                     onChange={inputChangeHandler}/>
                    
                        
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={submitHandler}>Update</button>
                
                </div>
                <ToastContainer/>
        </>
    )
}

export default EditView;