import React, { useContext } from 'react'
import NoteContext from '../../Context/notes/noteContext';

function Noteitem(props) {
    
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <span className="card-title border-bottom text-danger">{note.tag}</span><br />
                    <i style={{"cursor":"pointer"}} className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id) }}></i>
                    <i style={{"cursor":"pointer"}}  className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem