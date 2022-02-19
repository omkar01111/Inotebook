import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note,updateNote } = props;
    return (
        <div className="col-md-3 note_card mx-4 my-4  ">
            <div className="card my-3 note_card_content ">
                <div className="card-body  ">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title note_card_title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("deleted successfully","danger")}}></i>
                        <i className="far fa-edit mx-2"onClick={() =>{updateNote(note);props.showAlert("Updated successfully","success")}}></i>
                    </div>
                    <p className="card-text note_card_info">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
export default Noteitem