import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faTrashAlt, faEdit, faAd, faPlus} from '@fortawesome/free-solid-svg-icons'

function Day() {
    let hours = Array.apply(null, Array(12)).map(function () {})

    // Récupérer les Todos depuis la bdd
    // map id de la div hours par rapport à l'heure du todo
    // Envoyer un todo dans la bdd event pour l'id de la div cliqué pour l'heure pop up input heure todo tag
    // supprimer un todo event pour l'id delete dans la bdd
    

    return (
        <div className='calendar__background'>
        <div className="inner-calendar">

        <div className="calendar-hour left">
            {hours.map((hour, index) => { 
                let time:string;
                if (index < 10 ) time = "0" + index.toString() + "h00";
                else time = index.toString() + "h00"
                    return <>
                        <div className="calendar-todo" id={index} key={index}>
                        <div className="calendar-time regular">
                            {time} 
                        <div className="calendar-todo--add">
                                <FontAwesomeIcon icon={faPlus} />
                        </div>
                        </div>
                        <div className="todo">
                            <div className="todo-content">

                            </div>
                            <div className="todo-actions">
                                <div className="calendar-todo--validate">
                                <FontAwesomeIcon icon={faCheckSquare} />
                                </div>
                                <div className="calendar-todo--edit">
                                <FontAwesomeIcon icon={faEdit} />
                                </div>
                                <div className="calendar-todo--delete">
                                <FontAwesomeIcon icon={faTrashAlt} />
                                </div>
                            </div>

                            </div>

            
                        </div></>
            })}
            </div> 
            <div className="calendar-hour right"> 
            {hours.map((hour, index) => { 
                let time:string;
                let id = 12 + index;
                time =id.toString() + "h00";
                    return                            <>
                        <div className="calendar-todo" id={id} key={id}>
                        <div className="calendar-time regular">
                            {time} 
                        <div className="calendar-todo--add">
                                <FontAwesomeIcon icon={faPlus} />
                        </div>
                        </div>
                        <div className="todo">
                            <div className="todo-content">

                            </div>
                            <div className="todo-actions">
                                <div className="calendar-todo--validate">
                                <FontAwesomeIcon icon={faCheckSquare} />
                                </div>
                                <div className="calendar-todo--edit">
                                <FontAwesomeIcon icon={faEdit} />
                                </div>
                                <div className="calendar-todo--delete">
                                <FontAwesomeIcon icon={faTrashAlt} />
                                </div>
                            </div>

                            </div>

                       

                        </div>
                        </>
            })}
                        </div>  

        </div>
    </div>
    )
}

export default Day
