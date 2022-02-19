import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-4 layered-card" style={{
            border: "1px solid"
            , padding: "22px",
            backgroundColor: "#d0d0d0",
            borderRadius:"2px"

        }}>
            <div className="d-flex justify-content-center my-4">

            <h2>Add a Note</h2>
            </div>
            <form className=" my-4">
                <div className=" my-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                </div>
                <div className=" my-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className=" my-4">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>

                <div className="d-flex justify-content-center my-4">

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}
export default AddNote