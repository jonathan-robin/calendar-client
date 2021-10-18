import React, {useContext, useState} from 'react'; 
import Background from '../commons/background';
import Shape from '../commons/Shape';
import { AuthContext } from '../../context/GlobalState';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faTrashAlt, faEdit, faAd, faPlus} from '@fortawesome/free-solid-svg-icons'


function Home() {
    const [authState, setAuthState] = useContext(AuthContext)
    const [filter, setFilter] = useState({ week: false, month:false, day:false})
    let hours = Array.apply(null, Array(12)).map(function () {})

    const handleClickDay = () => { 
        setFilter({month:false, week:false, day:true})
    }
    const handleClickWeek = () => {
        setFilter({month:false, week:true, day:false})

    }
    const handleClickMonth = () => {
        setFilter({month:true, week:false, day:false})
    }

    console.log(authState);

    return (
        <div>
            <Background />
            <Shape />
            {!filter.week && !filter.month && !filter.day ? 
            <div className="content-box">
                <div className="content-box__signIn">
            <div className="input-form input-form__signIn">
                <div className="home-label home-label--day" onClick={handleClickDay}>
                            Lundi 8 novembre
                </div>
                </div>
                    <div className="input-form input-form__signIn input-form__signIn--pseudo">
                        <div className="input-form__signIn--label">
                <div className="home-label home-label--week" onClick={handleClickDay}>
                            Semaine 44
                        </div>
                        </div>
                    </div>
                    <div className="input-form input-form__signIn input-form__signIn--pseudo">
                        <div className="input-form__signIn--label">
                <div className="home-label home-label--month" onClick={handleClickDay}>
                            Novembre
                        </div>
                        </div>
                    </div>
                    </div>
                    </div> : 
                    <div>
                        {filter.day &&
                        <div className='calendar__background'>
                            <div className="inner-calendar">

                            <div className="calendar-hour left">
                                {hours.map((hour, index) => { 
                                    let time:string;
                                    if (index < 10 ) time = "0" + index.toString() + "h00";
                                    else time = index.toString() + "h00"
                                        return <>
                                            <div className="calendar-todo">
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
                                    time = (12 + index).toString() + "h00";
                                        return                            <>
                                            <div className="calendar-todo">
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
                        }
                    </div>
                    }
        </div>
    )
}

export default Home
