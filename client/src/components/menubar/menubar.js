import "./menubar.scss"
import { Link } from "react-router-dom"
const Menu = ({menuOpen,setMenuOpen}) => {
  const handleLogout=()=>{
    setMenuOpen(false)
    localStorage.setItem("authorization", "");
  }
   const token = localStorage.getItem("authorization");
   let field=[]
  if(token.length>0){
    field.push(<li onClick={(handleLogout)}>
    <Link to="/">Log Out</Link>
</li>)
  }
  return (
    <div className={"menu " +(menuOpen && "active")}>
      <ul>
        <li onClick={()=>setMenuOpen(false)}>
            <Link to="/">HOME</Link>
        </li>
        <li onClick={()=>setMenuOpen(false)}>
            <Link to="/applicant">Applicant</Link>
        </li>
        <li onClick={()=>setMenuOpen(false)}>
            <Link to="/recruiter">Recruiter</Link>
        </li>
        {
          field
        }
      </ul>
    </div>
  )
}

export default Menu
