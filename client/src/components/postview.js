import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"
import "./post.scss"
const Postview = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("authorization");
    if (token.length < 0) {
        navigate("/")
    }

    const [job, setJob] = useState([])
    const [err, setErr] = useState(false)
    const [applicant, setApplicant] = useState([])
    // useEffect(() => {
    //     fetch("http://localhost:3004/job/applicantData", {
    //         headers: {
    //             authorization: token,
    //         },
    //     }).then((res) => res.json())
    //         .then((data) => {
    //            setApplicant(data)
    //         });
    // }, [token]);
    // useEffect(() => {
    //     fetch("http://localhost:3004/job/posts", {
    //         headers: {
    //             authorization: token,
    //         },
    //     }).then((res) => res.json())
    //         .then((data) => {
    //             if(data && data.length>0){
    //                 setJob(data);
    //             }
    //         });
    // }, [token]);
    useEffect(() => {
        axios.all([
            axios.get("http://localhost:3004/job/posts", {
                headers: {
                    authorization: token,
                },
            }
            ),

            axios.get("http://localhost:3004/job/applicantData", {
                headers: {
                    authorization: token,
                },
            })
        ]).then(

                axios.spread((resp1, resp2) => {
                    const relevantJobs = []
                    const allJobs = [];
                    resp2.data[0].skills[0].split(",").forEach((skill)=> {
                        
                        resp1.data.forEach((job)=> {
                            
                            if(job.skillsets.indexOf(skill) >= 0) {
                                relevantJobs.push(job)
                            } else {
                                allJobs.push(job)
                            }
                        })
                    });
                    
                    setJob(relevantJobs.concat(allJobs))

                    // const filteredRes=getFilteredData(resp1.data,resp2.data)
                })
            )
            .catch((error) => console.log(error))

    }, [token])

    const handleApplied = (data) => {
        axios({
            url: "http://localhost:3004/applied",
            method: "POST",
            headers: {
                "authorization": token
            },
            data: data
        })
            .then((response) => {
                toast.success("uploaded Success")
                navigate("/applied")
            })
            .catch((e) => {
                toast.error('Upload Error')
                setErr(false)

            })
    }
    console.log(job)
    return (
        <>
            <div className="mainContainer">
                {
                    job && job.length > 0 &&
                    job.map((data) => {
                        return (
                            <>
                                <div className="cont">
                                    <h1>{data.title}</h1>
                                    <p>{data.jobType}</p>
                                    <p>Salary in RS: {data.salary}</p>
                                    <p>Skills Required: {(data.skillsets.join(" "))}</p>
                                    <p className='signin-error'>{err ? "Invalid Details" : ""}</p>
                                    <button onClick={() => { handleApplied(data) }}>Apply</button>
                                    <ToastContainer />
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Postview