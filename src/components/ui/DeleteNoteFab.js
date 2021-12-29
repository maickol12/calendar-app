import React from 'react';
import { useDispatch } from 'react-redux';
import {  eventDeleteNote } from '../../actions/eventsActions';


export const DeleteNoteFab = () => {
    const dispatch = useDispatch();
    const deleteNote = () => {
        dispatch( eventDeleteNote() );
    }
    return (
        <button className='btn btn-danger fab-danger' onClick={ deleteNote }>
            <i className='fas fa-trash'></i>
            <span> Borrar Evento</span>
        </button>
    )
}
