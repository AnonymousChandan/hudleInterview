
import { useNavigate,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./post.scss"
const Application=()=>{
    const params=useParams()
    const navigate=useNavigate()
    const token = localStorage.getItem("authorization");
    if (token.length<0) {
        navigate("/")
      } else if (token.length > 0) {
        
      }
      const [applied,setApplied]=useState([])
      const [status,setStatus]=useState({status:""})
      useEffect(() => {
        fetch("http://localhost:3004/job/application", {
          headers: {
            authorization: token,
          },
        }).then((res) => res.json())
          .then((data) => {
            setApplied(data);
          }).catch((err)=>{
            console.log(err)
          })
      }, [token]);
          const handleOption=(dataId,e)=>{
            axios.put(`http://localhost:3004/job/update`,{
                headers: {
                    authorization: token
                  },
                  data: {
                    source:dataId,
                    payload:e
                  }
          })
               
      }
    return(
        <>
        <div className="mainContainer">
            {
                applied.map((data)=>{
                    console.log(data)
                    return(
                        <>
                          <div className="cont">
                          <h1>{data.title}</h1>
                            <p>{data.jobType}</p>
                            <p>{data.email}</p>
                            <p>Salary in RS: {data.salary}</p>
                            <p>Skills Required: {(data.skillsets)}</p>
                            <li><select className="dropDown" onChange={(e)=>handleOption(data._id,e.target.value)}>
                <option value="accepted">Accept</option>
                <option value="pending">Pending</option>
                <option value="rejected">Reject</option>
                <option value="shortlisted">Shortlist</option>
                <option value="finished">Finish</option>
              </select></li>
                            <p style={{color:"green"}}>{data.status}</p>
                          </div>
                        </>
                    )
                })
            }
        </div>
        </>
    )
}
export default Application