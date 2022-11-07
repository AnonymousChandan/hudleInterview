
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./post.scss"
const Applied=()=>{
    const navigate=useNavigate()
    const token = localStorage.getItem("authorization");
    if (token.length<0) {
        navigate("/")
      } else if (token.length > 0) {
        
      }
      const [applied,setApplied]=useState([])
      useEffect(() => {
        fetch("http://localhost:3004/applied", {
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
                            <p>Salary in RS: {data.salary}</p>
                            <p>Skills Required: {(data.skillsets.join(" "))}</p>
                            <p>{data.status}</p>
                          </div>
                        </>
                    )
                })
            }
        </div>
        </>
    )
}
export default Applied