import { useContext,useRef } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";

import alertContext from "../../Context/Alert/alertContext";
import UserContext from "../../Context/UserDetails/userContext";

export const Navbar = () => {

  const ref1 = useRef(null);

  const navigatePath = useNavigate();

  const location = useLocation();
  // console.log(location);

  const alertContex = useContext(alertContext)
  const {showAlert} = alertContex

  const userDetail = useContext(UserContext);
  const {getUser,uDetails} = userDetail
  
  const removeToken = ()=>{
    localStorage.removeItem("userToken");
    showAlert("Logout successfully","success")
    navigatePath("/login")
  }

  const user = ()=>{
    ref1.current.click();
    getUser();
  }


  return <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem("userToken")?<form className="d-flex">
            <Link className="btn btn-sm btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-sm btn-info mx-1" to="/signup" role="button">Signup</Link>
          </form>:<div className="d-flex">
              <button className="btn btn-sm mx-2 btn-success" onClick={user}><i className="fa-solid fa-user"></i></button>
              <button className="btn btn-sm btn-info mx-2" onClick={removeToken}>Logout</button>
          </div>}
        </div>
      </div>

      <div className="userDetail">

        <button ref={ref1} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">My Profile</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                <input type="text" value={uDetails.name} className="form-control my-1" id="exampleInputEmail1" aria-describedby="emailHelp" readOnly/>
                <input type="email" value={uDetails.email} className="form-control my-1" id="exampleInputEmail1" aria-describedby="emailHelp" readOnly/>
                <input type="text" value={uDetails.mobile} className="form-control my-1" id="exampleInputEmail1" aria-describedby="emailHelp" readOnly/>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  </>;
};

