import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify"; 
const PostJob = () => {
    const navigate=useNavigate()
    const token = localStorage.getItem("authorization");
    if (token.length<0) {
        navigate("/")
      } else if (token.length > 0) {
        
      }
    var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const [error,setError]=useState(false)
   const [data,setData]=useState({
    title:"",
    date:date,
    skillsets:[],
    salary:0,
    jobType:"",
    email:token
   })
   const onSubmit=(e)=>{
    e.preventDefault()
    axios({
        url: "http://localhost:3004/job/post",
        method: "POST",
        headers: {
            "authorization":token
        },
        data: data
   })
        .then((response) => {
            toast.success('Upload Success');
            console.log(response)
        })
        .catch((e) => {
            toast.error('Upload Error')
            setError(true)
        })
    console.log(data)
   }
    return (
        <div>
            <form action="post"  onSubmit={onSubmit}>
                <div className="joblabl">
                    <label htmlFor='title'>Title</label>
                    <input type="text" id="title" name="title" onChange={(e) => { (setData({ ...data, title: e.target.value })) }}></input>
                </div>
                <div className="joblabl">
                    <label htmlFor='activeApplications'>Job Type</label>
                    <input type="text" id="jobType" name="jobType" onChange={(e)=>{setData({...data,jobType:e.target.value})}}></input>
                </div>
                <div className="joblabl">
                    <label htmlFor='skillsets'>skillsets (,) S</label>
                    <input type="text" id="skillsets" name="skillsets" onChange={(e)=>{setData({...data,skillsets:e.target.value})}}></input>
                </div>
                <div className="joblabl">
                    <label htmlFor='salary'>salary</label>
                    <input type="Number" id="salary" name="salary" onChange={(e)=>{setData({...data,salary:e.target.value})}}></input>
                </div>
                <p className='signin-error' style={{color:"red"}}>{error ? "Invalid Details":""}</p>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default PostJob
