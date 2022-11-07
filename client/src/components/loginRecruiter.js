import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./login.scss"
const Login=()=>{
    const navigate=useNavigate()
    const [error,setError]=useState(false)
    const [passtype,setPasstype]=useState(true)
    const handlepass=()=>{
      setPasstype(!passtype)
    }
    const handleclicklogin= ()=>{
        navigate("/job")
    }
    const [login, setLogin] = useState({user: "", password: ""})
    const handleLogin = (e)=> {
      e.preventDefault();
        axios({
            url: "http://localhost:3004/recruiter/login",
            method: "POST",
            headers: {
            },
            data: login
        }).then((loginData)=> {
          console.log(loginData)
           localStorage.setItem("authorization", loginData.data.authToken);
            handleclicklogin()
        }).catch((err)=> {
            console.log(err)
            setError(true)
        })
    }
    return(
        <div className="signIn">
        <form style={{height:"400px",marginTop:"100px"}}>
        <h1>WELCOME TO HUDLE</h1>
           <div className="login">
           <div className="labl">
                <label htmlFor="phone">Phone/email</label>
                <input type="text" placeholder="&nbsp;" onChange={(e)=> {setLogin({...login, user: e.target.value})}}/>
            </div>
            <div className="labl">
                <label htmlFor="password">Password</label>
                <input type={passtype? "password":"text"} placeholder="&nbsp;" onChange={(e)=> {setLogin({...login, password: e.target.value})}}/>
            </div>
            <img onClick={handlepass} className='padlock-image-signin' src="/assets/padlock.svg" alt="show-pass" />
            <p className='signin-forgot-password'>Forget Password?</p>
            <p className='signin-error'>{error ? "Invalid Details":""}</p>
            <button className='sigin-button' onClick={handleLogin}>Sign In</button>
           </div>
        </form>
        </div>
    )
}
export default Login