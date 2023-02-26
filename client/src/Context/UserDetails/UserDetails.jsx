import React,{useState} from 'react'
import UserContext from "../UserDetails/userContext"

const UserDetails = (props) => {

    const url = "https://light-jewelry-ray.cyclic.app/";

    const [uDetails, setuDetails] = useState({name:"",email:"",mobile:""});


    const [loadingState,setLoadingState] = useState(false);

    const getUser = async () => {
      setLoadingState(true);
        const response = await fetch(`${url}getuser`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "userToken": localStorage.getItem("userToken"),
          },
        });
        const json = await response.json();
        setuDetails({
          name:json.userFind.name,
          email:json.userFind.email,
          mobile:json.userFind.mobile
        });
      setLoadingState(false);
      };

    return (
    <UserContext.Provider value={{loadingState,getUser,uDetails}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserDetails