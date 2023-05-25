
import React,{useEffect, useState} from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


function View() {

const [data,setData] = useState([])
const BASE_API_URL = process.env.REACT_APP_PRO_MODE;

    useEffect(()=>{ 

        loadUser()
    },[])

    

    const loadUser = async () =>{
         
        const response = await axios.get(`${BASE_API_URL}/user/fetch-user`);
          console.log("response>>>",response)
          setData(response.data.data)
    
    }

    console.log("data>>>>>",data)


    const onDeleteUser = async (id)=>{


        const response = await axios.delete(`${BASE_API_URL}/user/delete-user/${id}`)
    }

    return (
        <>

            <table className="table">



                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item,index)=>{
                        return(
                            <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>
         
                            <Link to={`/edit/${item._id}`}>
                                     <button className='btn btn-edit btn-outline-primary m-2'>Edit</button>
                                </Link>
                                         <button className='btn btn-delete btn-danger m-2' 
                                       onClick={()=>onDeleteUser(item._id)}
                                          >Delete</button>

                            </td>
                        </tr>
                        )
                    })}
                   
                    
                </tbody>
            </table>
        </>
    )
}

export default View;