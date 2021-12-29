import { types } from '../types/types';

export const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveNote = ( ) => ({
    type: types.eventClearActiveNote
});

export const eventUpdateNote = ( event ) => ({
    type: types.eventUpdateNote,
    payload: event
});


export const eventDeleteNote = ( ) => ({
    type: types.eventDeleteNote
})