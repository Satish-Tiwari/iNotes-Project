import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../../Context/Alert/alertContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

const Signup = () => {

    const alert = useContext(alertContext)
    const { showAlert } = alert;

    const url = "https://light-jewelry-ray.cyclic.app";


    const [loadingState, setLoadingState] = useState(false);


    let navigatePath = useNavigate();

    const [credintials, setCredintials] = useState({ name: "", email: "", mobile: "", password: "" })

    const changeState = (e) => {
        setCredintials({ ...credintials, [e.target.name]: e.target.value })
    }

    const submitFrom = async (e) => {
        e.preventDefault();
        setLoadingState(true);
        const response = await fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name: credintials.name, email: credintials.email, mobile: String(credintials.mobile), password: credintials.password })
        });

        const json = await response.json();

        if (json.success === true) {
            localStorage.setItem("userToken", json.awthToken);
            showAlert("Account created successfully", "success")
            navigatePath("/")
        } else {
            showAlert("Invalid Credintials", "danger")
        }
        setLoadingState(false);
    }

    return (
        <div className="container mt-3">
            <h3 className='my-'>Create a new account : </h3>
            <form onSubmit={submitFrom}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="name" name="name" onChange={changeState} className="form-control" id="exampleInputName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={changeState} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputMobile" className="form-label">Mobile</label>
                    <input type="number" name="mobile" onChange={changeState} className="form-control" id="exampleInputMobile" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" onChange={changeState} className="form-control" id="exampleInputPassword1"
                        aria-describedby="passwordHelp" />
                    <div id="passwordHelp" className="form-text">Length of the password should not be lesser than 8-digits</div>
                </div>
                <button type="submit" className="btn btn-primary">{loadingState === true ? <Loading /> : "Signup"}</button>
                <div className='flex-row'>
                    <p className='align-item-center'>Already Account Exist?  <span className='btn btn-info'><Link to="/Login">Login</Link></span></p>
                </div>
            </form>
        </div>
    )
}

export default Signup