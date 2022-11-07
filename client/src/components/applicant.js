import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./applicant.scss";
const ApplicantSignUp = () => {
    const navigate=useNavigate()
    const [error,setError]=useState(false)
    const [passtype, setPasstype] = useState(true)
    const handlepass = () => {
        setPasstype(!passtype)
    }
    const [details, setDetails] = useState({
        type: "applicant",
        name: "",
        email: "",
        password: "",
        education: [],
        numberOfEducation: 1,
        skills: []
    });
    const [edu, setEdu] = useState([])
    const [resume, setResume] = useState([])
    const [profile, setProfile] = useState([])
    const handleProfile = (e) => {
        setProfile(e.target.files[0])
    }
    const onInputChange = (e) => {
        setResume(e.target.files[0])
        console.log(e.target.files[0])
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(details, resume, profile, edu)
        let data = new FormData();
        data.append('type', details.type)
        data.append('name', details.name)
        data.append('phone', details.phone)
        data.append('email', details.email)
        data.append('password', details.password)
        data.append('education', edu)
        data.append('skills', details.skills)
        data.append('file',resume)
        data.append('file',profile)
        // for (let i = 0; i < profile.length; i++) {
        //     data.append('profile', profile[i]);
        //   }
        // for (let i = 0; i < resume.length; i++) {
        //     data.append('resume', resume[i]);
        // }
        axios.post('http://localhost:3004/applicant/register', data,
        {'content-type': 'multipart/form-data'}   
        )
            .then((response) => {
                toast.success('Upload Success');
                alert("Registration Successfull")
                navigate("/loginApplicant")

            })
            .catch((e) => {
                toast.error('Upload Error')
                setError(true)
            })

        console.log(data)
    }
   
    const onEducationChange = (e, i) => {
        e.preventDefault()
        let updatedEducation = [...edu]
        updatedEducation[i - 1] = e.target.value
        setEdu(updatedEducation)
        console.log(edu, updatedEducation)
    }
    let fields = [];
    for (let i = 1; i <= details.numberOfEducation; i++) {

        fields.push(<input type="text" placeholder={`institute ${i}`} id={i} key={i} onChange={(e) => { onEducationChange(e, i) }} />);
    }
    return (

        <>
        <h1 className="heading">Welcome to Hudle</h1>
        <h3>all the best</h3>

          <div className="container">
          <form method="post" action="#" id="#form" className="app" onSubmit={onSubmit}>
          <h1>Register</h1>
                <div className="form-data">

                   <label  htmlFor="name">Name</label>

                    <input type="text" id="name" name="name" onChange={(e) => { (setDetails({ ...details, name: e.target.value })) }}></input>
                </div>
                <div className="form-data">
   
                  <label htmlFor="email">Email</label>
       
                    <input type="text" id="email" name="email" onChange={(e) => { (setDetails({ ...details, email: e.target.value })) }}></input>
                </div>
                <div className="form-data">
        
                   <label htmlFor="password">Password</label>
   
                    <input type={passtype ? "password" : "text"} placeholder="&nbsp;" onChange={(e) => { setDetails({ ...details, password: e.target.value }) }} />
                    <img onClick={handlepass} className='padlock-image-signin' src="/assets/padlock.svg" alt="show-pass" />
                </div>
                <div className="form-data"  style={{margin:"0px",position:"relative",right:"33px"}}>
                
                   <label htmlFor="password">Contact Number</label>
                   
                    <input type="text" placeholder="Phone number" onChange={(e) => { setDetails({ ...details, phone: e.target.value }) }} />
                </div>
                <div className="form-data">
                    <label htmlFor="education">Education</label>
                    {
                        fields
                    }

                </div>
                <button className="btn" onClick={(e) => { (setDetails({ ...details, numberOfEducation: details.numberOfEducation + 1 })) }}>Add another institute</button>
                <div className="form-data">
                 <div>
                 <label htmlFor="skills">Skills(give , seperated value)</label>
                 </div>
                    <input type="text" id="skills" name="skills" onChange={(e) => { (setDetails({ ...details, skills: e.target.value })) }}></input>
                </div>
                <div className="file_attach">
                   <span type="button" className="btn_upload">
                   <span className="file_info">Upload Resume</span>
                    <input type="file" id="resume" name="resume" onChange={onInputChange} multiple></input>
                    </span>
                </div>
                <div className="file_attach">
                <span type="button" className="btn_upload">
                   <span className="file_info">Upload Profile Image</span>
                    
                    <input type="file" id="profile" name="profile" onChange={handleProfile} multiple></input>
                    </span>
                </div>
                <button type="submit" className="bt">Register</button>
            </form>
            <p className='signin-error'>{error ? "Invalid Details":""}</p>
          </div>
        </>
    )
}
export default ApplicantSignUp