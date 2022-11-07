import React, { useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify"; 
const RecruiterSignup = () => {
    const [error,setError]=useState(false)
    const[user,setUser]=useState({name:"",email:"",password:"",phone:"",bio:""})
    const [passtype,setPasstype]=useState(true)
    const handlepass=()=>{
        setPasstype(!passtype)
      }
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3004/recruiter/register', user,
        {'content-type': 'multipart/form-data'}   
        )
            .then((response) => {
                toast.success('Upload Success');
                console.log(response)
            })
            .catch((e) => {
                toast.error('Upload Error')
                setError(true)
            })
        console.log(user)
    }
  return (
    <div>
      <h1 className="heading">Welcome to Hudle</h1>
        <h3>all the best</h3>

     <div className="container">
     <form className="for" method="post" action="#" id="#form"  onSubmit={onSubmit}>
     <h1>Register</h1>
                <div className="form-data">
                    <label htmlFor="name">Good Name</label>
                    <input type="text" id="name" name="name" onChange={(e) => { (setUser({ ...user, name: e.target.value })) }}></input>
                </div>
                <div className="form-data">
                    <label htmlFor="name">Email</label>
                    <input type="text" id="email" name="email" onChange={(e) => { (setUser({ ...user, email: e.target.value })) }}></input>
                </div>
                <div className="form-data">
                    <label htmlFor="name">Password</label>
                    <input type={passtype? "password":"text"} placeholder="&nbsp;" onChange={(e)=> {setUser({...user, password: e.target.value})}}/>
                    <img onClick={handlepass} className='padlock-image-signin' src="/assets/padlock.svg" alt="show-pass" />
                </div>
                <div className="form-data"  style={{margin:"0px",position:"relative",right:"33px"}}>
                    <label htmlFor="name">Contact Number</label>
                    <input type="text" id="phone" name="phone" onChange={(e) => { (setUser({ ...user, phone: e.target.value })) }}></input>

                </div>
                <div className="form-data">
                    <label htmlFor="name">Bio</label>
                    <input style={{height:"100px"}} type="text" id="bio" name="bio" onChange={(e) => { (setUser({ ...user, bio: e.target.value })) }}></input>
                    
                </div>
                <p className='signin-error' style={{color:"red"}}>{error ? "Invalid Details":""}</p>
                <button className="bt">Register</button>
                </form>
               
     </div>
    </div>
  )
}

export default RecruiterSignup
