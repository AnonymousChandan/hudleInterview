import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Job=()=>{
    const navigate=useNavigate()
    const token = localStorage.getItem("authorization");
    if (token.length<0) {
        navigate("/")
      } else if (token.length > 0) {
        
      }
      const [job,setJob]=useState([])
      useEffect(() => {
        fetch("http://localhost:3004/job/post", {
          headers: {
            authorization: token,
          },
        }).then((res) => res.json())
          .then((data) => {
            setJob(data);
          });
      }, [token]);
      const [err,setErr]=useState(false)
     const handleDelete=(dataId)=>{
    axios.delete("http://localhost:3004/job/delete", {
      headers: {
        Authorization: token
      },
      data: {
        source: dataId
      }
    }).then((data)=>{

    }).catch((err)=>{
      setErr(true)
    })
    
     }
    return(
        <>
        <div className="mainContainer">
            {
                job.map((data)=>{
                    return(
                        <>
                           <div className="cont">
                           <h1>{data.title}</h1>
                            <p>{data.jobType}</p>
                            <p>Salary in RS: {data.salary}</p>
                            <p>Skills Required: {(data.skillsets.join(" "))}</p>
                            <p className='signin-error'>{err ? "Invalid Details":""}</p>
                            <button onClick={()=>handleDelete(data._id)}>Delete</button>
                           </div>
                        </>
                    )
                })
            }
        </div>
        </>
    )
}
export default Job