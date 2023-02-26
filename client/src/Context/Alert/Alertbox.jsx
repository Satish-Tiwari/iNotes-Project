import React,{useContext} from "react";
import AlertContext from "./alertContext";

function Alertbox() {

  const alertConte = useContext(AlertContext);
  const {alertState} = alertConte;
  
  return (
    <>
      <div className={`alert alert-${alertState.type}`} id="lol" role="alert">
        {alertState.msg}
      </div>
    </>
  );

}

export default Alertbox;


