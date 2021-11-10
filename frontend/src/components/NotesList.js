import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
let numid_note = 0;
export default class NotesList extends Component {

    
    state = {
        notes: []
    }

    async componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({
            notes: res.data
        });
    }

    deleteNote = async (noteId) => {
        await axios.delete('http://localhost:4000/api/notes/' + noteId);
        this.getNotes();
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <Link to={"/edit/" + note._id} className="btn btn-secondary">
                                        <i className="material-icons">
                                            border_color</i>
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>
                                        {note.content}
                                    </p>
                                    <p>
                                        Author: {note.author}
                                    </p>
                                    <p>
                                        {format(note.createdAt)}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={() => numid_note = note._id}>
                                     Borrar Nota
                                    </button>

                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">¿Borrar Nota?</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    La nota no se podrá recuperar.
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => this.deleteNote(numid_note)}>Borrar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        )
    }
}
