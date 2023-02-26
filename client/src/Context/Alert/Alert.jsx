import React,{useState} from "react";
import AlertContext from "./alertContext";

function Alert(props) {
  const msg = "",type="";
  const [alertState, setAlertState] = useState({msg,type});
  const showAlert = (msg,type)=>{
    setAlertState({
      msg:msg,
      type:type
    })
  }
  // console.log("msg ",alertState.msg);

  return (
    <>
      <AlertContext.Provider value={{alertState,showAlert}}>{props.children}</AlertContext.Provider>
    </>
  );
}

export default Alert;
