import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../../Context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from '../Pages/Addnote';
import Loading from '../Loading';

import { useNavigate } from "react-router-dom";

function Notes() {
    const noteContext = useContext(NoteContext)
    const {loadingState, notes, getAllNotes, editNote } = noteContext;

    const navigatePath = useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem("userToken")){
            getAllNotes();
        }else{
            navigatePath("/login")
        }
        // eslint-disable-next-line
    }, [])
    
    const ref = useRef(null);
    const refClose = useRef(null);
    
    const [note, setNote] = useState({ id: "", etitle: "", etag: "", edescription: "" });

    const updateNote = async(currentNote) => {
        await setNote({ id: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description });
        ref.current.click();
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    //  //! Update Function...
    const formEditSubmit = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    return (
        <>
            <Addnote />

            {/* For Update the notes, Using bootstrap moldel ... */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control my-1" value={note.etitle} name='etitle' id="etitle" onChange={handleChange} />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="description">Description</label>
                                    <textarea type="text" className="form-control my-1" value={note.edescription} name='edescription' id="edescription" placeholder="Description" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control my-1" value={note.etag} name='etag' id="etag" aria-describedby="etag" placeholder="Your tag ?" onChange={handleChange} />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button style={{"cursor":"pointer"}} disabled={note.etitle.length < 1 | note.edescription.length < 3} onClick={formEditSubmit} type="button" className="btn btn-primary">{loadingState===true?<Loading/>:"Update" }</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-5">
                <h2>Your Notes : </h2>
                <div className="container mx-3 text-info">
                    {notes.length===0 && "No notes to show."}
                </div>
                {notes.map((e) => {
                    return <Noteitem key={e._id} note={e} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes;