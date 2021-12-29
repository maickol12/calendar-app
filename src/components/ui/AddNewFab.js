import React from 'react';
import { useDispatch } from 'react-redux';
import { eventClearActiveNote } from '../../actions/eventsActions';
import { uiOpenModalAction } from '../../actions/uiActions';



export const AddNewFab = () => {
    const dispatch = useDispatch();
    const openModal = () => {
        dispatch( uiOpenModalAction() );
        dispatch( eventClearActiveNote() );
    }
    return (
        <button className='btn btn-primary fab' onClick={ openModal }>
            <i className='fas fa-plus'></i>
        </button>
    )
}
