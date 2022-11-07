import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Topbar from "./components/topbar/topbar";
import Menu from "./components/menubar/menubar";
import ApplicantSignUp from "./components/applicant";
import Login from "./components/loginRecruiter";
import LoginApplicant from "./components/loginApplicant";
import Job from "./components/job";
import RecruiterSignup from "./components/recruiterSignup";
import PostJob from "./components/postJob";
import Postview from "./components/postview";
import Applied from "./components/applied";
import Application from "./components/application";
import Home from "./components/home";
function App() {
  const [recruiter, setRecruiter] = useState([])
  let token = localStorage.getItem("authorization")

  if (token === null) {
    localStorage.setItem("authorization", "")
  }
  useEffect(() => {
    fetch("http://localhost:3004/applicant/details", {
      headers: {
        authorization: token,
      },
    }).then(res => res.json())
      .then(res => {
        setRecruiter(res)
      })
  }, [token]);
  useEffect(() => {
    fetch("http://localhost:3004/recruiter/details", {
      headers: {
        authorization: token,
      }
    }).then((res) => res.json()).then((data) => {
        setRecruiter(data)
      }).catch((err)=>{
        console.log(err)
      })
  }, [token]);
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} recruiter={recruiter} setRecruiter={setRecruiter} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/applicant" element={<ApplicantSignUp />}></Route>
          <Route exact path="/loginRecruiter" element={<Login />}></Route>
          <Route exact path="/recruiter" element={<RecruiterSignup />}></Route>
          <Route exact path="/job" element={<Job />}></Route>
          <Route exact path="/postJob" element={<PostJob />}></Route>
          <Route exact path="/loginApplicant" element={<LoginApplicant />}></Route>
          <Route exact path="/postview" element={<Postview />}></Route>
          <Route exact path="/Applied" element={<Applied />}></Route>
          <Route exact path="/application" element={<Application />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
