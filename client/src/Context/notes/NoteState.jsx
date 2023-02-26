import { useState,useContext } from "react";
import NoteContext from "./noteContext";
import AlertContext from "../Alert/alertContext";

const Notestate = (props) => {
  const url = "https://light-jewelry-ray.cyclic.app/";
  var authToken = localStorage.getItem("userToken");

  const [notes, setnotes] = useState([]);

  const alertContext = useContext(AlertContext)
  const {showAlert} = alertContext;

  const [loadingState,setLoadingState] = useState(false);


  const getAllNotes = async () => {
    setLoadingState(true);
    const response = await fetch(`${url}fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "userToken": authToken,
      },
    });
    const json = await response.json();
    if(json.success === true){
      setnotes(json.userNotes);
    }
    setLoadingState(false);
  };

  // Add notes on server...
  const addNote = async ({ title, description, tag }) => {
    setLoadingState(true);

    const response = await fetch(`${url}addnotes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "userToken": authToken
      },
      body: JSON.stringify({ tag, title, description }),
    });
    const json = await response.json();
    setnotes(notes.concat(json));
    showAlert("Added Successfully","success")
    setLoadingState(false);

  };

  // Update a note...
  const editNote = async (id, title, description, tag) => {
    // Call API for edit in server side...
    setLoadingState(true);

    const response = await fetch(`${url}updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "userToken": authToken
      },
      body: JSON.stringify({ title, description, tag }),
    });
    await response.json();
    const newNotes = JSON.parse(JSON.stringify(notes));
    // Edit in Client side ...
    for (let i = 0; i < newNotes.length; i++) {
      const ele = newNotes[i];
      if (ele._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
    showAlert("Updated Successfully","info")
    setLoadingState(false);
  };

  // Delete a note...
  const deleteNote = async (id) => {
    setLoadingState(true);

    const response = await fetch(`${url}deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "userToken":authToken
      },
    });
    await response.json();
    // const json = await response.json();
    // console.log("I'd of deleted notes : ", id);
    const delNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(delNote);
    showAlert("Deleted Successfully","danger")
    setLoadingState(false);

  };

  return (
    <>
      <NoteContext.Provider
        value={{ loadingState,notes, addNote, editNote, deleteNote, getAllNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default Notestate;
