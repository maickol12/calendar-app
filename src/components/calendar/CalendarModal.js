import React,{ useState,useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch,useSelector } from 'react-redux';
import { uiCloseModalAction } from '../../actions/uiActions';
import { eventAddNew, eventClearActiveNote, eventUpdateNote } from '../../actions/eventsActions';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

  const now = moment().minutes(0).seconds(0).add(1,'hours');
  const nowOneHourAHead = now.clone().add(1,'hours');
  
  const initEvent =
  {
    title:'',
    notes:'',
    start: now.toDate(),
    end: nowOneHourAHead.toDate()
  };

export const CalendarModal = () => {
    const [dateStart, setDateStart]       = useState(now.toDate());
    const [dateEnd, setDateEnd]           = useState(nowOneHourAHead.toDate());
    const [titleIsValid, setTitleIsValid] = useState(true);
    const { modalOpen }     = useSelector(state => state.ui);
    const { activeEvent }   = useSelector(state => state.calendar);

    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initEvent);
    const { notes, title, start, end } = formValues;

    useEffect(() => {
      if(activeEvent){
        setFormValues(activeEvent);
      }else{
        setFormValues(initEvent);
      }
    }, [activeEvent])

    const handleInputChange = ({ target }) => {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      });
    }

    const closeModal = () => {
      dispatch(uiCloseModalAction());
      setFormValues(initEvent);
      dispatch(eventClearActiveNote());
    }
    const handleStartDateChange = ( e ) => {
      setFormValues({
        ...formValues,
        start: e
      })
    }
    const handleEndDateChange = ( e ) => {
      setFormValues({
        ...formValues,
        end: e
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const momentStart = moment( start );
      const momentEnd   = moment( end );

      if( momentStart.isSameOrAfter( momentEnd ) ){
        Swal.fire('Error','La fecha fin debe ser mayor a la fecha de inicio','error');
      }
      if( title.trim().length < 2 ){
        return setTitleIsValid(false);
      }

      if( activeEvent ){
        dispatch( eventUpdateNote({
          ...formValues,
          user: {_id: 123, name: 'Maickol Rodriguez'}
        }) );
      }else{
        dispatch( eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {_id: 123, name: 'Maickol Rodriguez'}
        }) );
      }

      setTitleIsValid(true);
      closeModal();

    }

    return (
        <Modal
            isOpen={ modalOpen }
            //onAfterOpen={afterOpenModal}
            onRequestClose={ closeModal }
            className="modal"
            closeTimeoutMS={ 200 }
            overlayClassName="modal-fondo"
            style={customStyles}>
                <h1> { activeEvent ? 'Editar': 'Nuevo' } evento </h1>
                <hr />
                <form className="container" onSubmit={ handleSubmit }>

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker 
                          className='form-control'
                          onChange={ handleStartDateChange }
                          value={ start } />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker 
                          className='form-control'
                          onChange={ handleEndDateChange }
                          minDate={ start }
                          value={ end } />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input 
                            type="text" 
                            className={`form-control ${ !titleIsValid && 'is-invalid' }`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={ title }
                            onChange={ handleInputChange }
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea 
                            type="text" 
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={ notes }
                            onChange={ handleInputChange }
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
        </Modal>
    )
}
