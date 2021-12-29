import moment from "moment";
import 'moment/locale/es-mx';
import { types } from "../types/types";
moment.locale('es-mx');
const intitialStat = {
    events:[],
    activeEvent: null
};

export const calendarReducer = (state = intitialStat,action) => {
    switch(action.type){
        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return{
                ...state,
                events:[ ...state.events,action.payload ]
            }
        case types.eventClearActiveNote:
            return{
                ...state,
                activeEvent:null
            }
        case types.eventUpdateNote:
            return{
                ...state,
                events: state.events.map(
                    e => e.id === action.payload.id ? action.payload : e
                )
            }
        case types.eventDeleteNote:
            return {
                ...state,
                events: state.events.filter(
                    e => e.id !== state.activeEvent.id 
                ),
                activeEvent:null
            }
        default:
            return state 
    }

}