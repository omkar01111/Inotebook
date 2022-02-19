import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {useHistory} from 'react-router';

const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useHistory();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {

            getNotes()
            
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line 

    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ is: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.etag });

    }


    const handleClick = (e) => {
        // console.log("updatting note");
        editNote(note.id, note.etitle, note.edescription, note.etag);
        e.preventDefault();
        refClose.current.click();

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            
               
            
            <AddNote showAlert={props.showAlert} />

            <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter " ref={ref} >
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body ">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label  ">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label ">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />

                                </div>

                            </form>

                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onSubmit={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className="row my-3 container d-flex justify-content-between ">
                <h2>You Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'no notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}
export default Notes