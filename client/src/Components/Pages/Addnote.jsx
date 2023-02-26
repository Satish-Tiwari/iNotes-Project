import React, { useContext,useState } from 'react'
import NoteContext from '../../Context/notes/noteContext';
import Loading from '../Loading';

function Addnote() {

    const context = useContext(NoteContext);
    const {loadingState,addNote,getAllNotes} = context;

    const [note, setNote] = useState({ title: "", description: "",  tag: "" });

    const handleChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }
    
    const formSubmit = async(e) => {
        e.preventDefault();
        await addNote(note)
        setNote({ title: "", description: "",tag:"" });
        await getAllNotes();
    }

    return (
        <>
            <div className="container">
                <h1>Add Note : </h1>
                <form>
                    <div className="form-group">
                        {/* <label htmlFor="title">Title</label> */}
                        <input type="text" className="form-control my-1" name='title' value={note.title} id="title" placeholder='Title' onChange={handleChange} />
                    </div>
                    <div className="form-group my-2">
                        {/* <label htmlFor="description">Description</label> */}
                        <textarea type="text" className="form-control my-1" name='description' value={note.description} id="description" placeholder="Description" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="tag">Tag</label> */}
                        <input type="text" className="form-control my-1" name='tag' value={note.tag} id="tag" aria-describedby="tag" placeholder="Tag" onChange={handleChange} />
                    </div>
                    <button style={{"cursor":"pointer"}} disabled={note.title.length < 1 | note.description.length < 3} type="submit" className="btn btn-success my-1" onClick={formSubmit}>{loadingState===true?<Loading />:"Add Note" }</button>
                </form>
            </div>
        </>
    )
}

export default Addnote