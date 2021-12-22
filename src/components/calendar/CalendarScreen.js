import React,{ useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';

moment.locale('es');

const localizer = momentLocalizer(moment);
const myEventsList = [{
    title:'Cumpleaños de mi mama',
    start: moment().toDate(),
    end: moment().add(2,'hours').toDate(),
    notes: 'Comprar el pastel',
    user:{
        _id:123,
        name:'Maickol Rodriguez'
    }
}]

export const CalendarScreen = () => {
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );
    const onDoubleEvent = (e) => {
        console.log(e);
    }
    const onSelectEvent = (e) => {
        console.log(e);
    }
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView',e);
    }
    const eventStyleGetter = (event,start,end,isSelected) => {
        const style = {
            backgroundColor:'#367CF7',
            borderRadius: '0px',
            opacity:0.8,
            display:'block',
            color:'white'
        }
        return {
            style
        }
    }
    return (
        <div className='calendar-screen'>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleEvent}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                />
        </div>
    )
}
