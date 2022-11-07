import "./topbar.scss"
import { Link,useLocation } from "react-router-dom"
const Topbar = ({menuOpen,setMenuOpen,recruiter}) => {
  const location=useLocation()
  let field=[]
  let field2=[]
  let field3=[]
  let field4=[]
  let field5=[]
  const token = localStorage.getItem("authorization");
  if(location.pathname==="/" && token.length<1){
    field4.push( <span><Link style={{textDecoration:"none", color:"gray"}} to="/loginRecruiter">Login As Recruiter</Link></span>)
  }
  if(location.pathname==="/" && token.length<1){
    field5.push(  <span><Link style={{textDecoration:"none", color:"gray"}} to="/loginApplicant">Login As Applicant</Link></span>)
  }
  if(location.pathname==="/Applied"){
    field3.push(<span><Link style={{textDecoration:"none",color:"gray"}} to="/postview">Find Job</Link></span>)
  }
  if(location.pathname==="/postview"){
    field2.push(<span><Link style={{textDecoration:"none",color:"gray"}} to="/Applied">Applied</Link></span>)
  }
  if(location.pathname==="/job"){
    field.push(<span><Link style={{textDecoration:"none",color:"gray",marginRight:"45px"}} to="/postJob">Post Job</Link></span>)
    field.push(<span><Link style={{textDecoration:"none",color:"gray"}} to="/application">Application</Link></span>)
  }
  return (
    <div className={"topbar " + (menuOpen &&"active")}>
    <div className="wrapper">
      <div className="left">
      <h1>Job Portal</h1>
      <div className="itemContainer">
        <span></span>
        </div>
        <div className="itemContainer">
        <span>Hudle</span>
        </div>
        <div className="itemContainer">
       {field4}
        </div>
        <div className="itemContainer">
       {field5}
        </div>
        <div className="itemContainer">
        <span>{recruiter.name}</span>
        </div>
        <div className="itemContainer">
        {field}
        </div>
        <div className="itemContainer">
        {field2}
        </div>
        <div className="itemContainer">
        {field3}
        </div>
        
      </div>
      <div className="right">
        <div className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
          <span className="line1"></span>
          <span className="line2"></span>
          <span className="line3"></span>
        </div>
      </div>
    </div>  
    </div>
  )
}

export default Topbar
