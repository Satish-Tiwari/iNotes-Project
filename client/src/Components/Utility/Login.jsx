import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../../Context/Alert/alertContext'
import {Link} from 'react-router-dom';
import Loading from '../Loading';

const Login = () => {

    const alertContex = useContext(alertContext)
    const {showAlert} = alertContex

    const url = "https://light-jewelry-ray.cyclic.app/"


    const [loadingState,setLoadingState] = useState(false);

    const navigatePath = useNavigate();

    const [credintials, setCredintials] = useState({email:"",password:""})

    const changeState = (e)=>{
        setCredintials({...credintials,[e.target.name]:e.target.value})
    }

    const submitFrom = async(e)=>{
        e.preventDefault();
        setLoadingState(true);
        const response = await fetch(`${url}/login`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({email:credintials.email, password:credintials.password})
        })
        const json = await response.json();
        if(json.success===true){
            localStorage.setItem("userToken",json.awthToken);
            showAlert("Login successfully","success");
            navigatePath("/");
        }else{
            showAlert("Login failed","danger")
        }
        setLoadingState(false);
    }

  return (
      <div className="container mt-3">
        <h3 className='my-2'>Login to your accout :</h3>
        <form  onSubmit={submitFrom}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" onChange={changeState} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="text" name="password" onChange={changeState} className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-success"> {loadingState===true?<Loading/>:"Login" }  </button>
            <div className='flex-row'>
                <p className='align-item-center'>New User? <span className='btn btn-info'><Link to = "/Signup">Signup</Link></span></p>
            </div>
        </form>
    </div>
  )
}

export default Login