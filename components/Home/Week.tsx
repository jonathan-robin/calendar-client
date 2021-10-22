import React,{useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Todo } from '../../pages/home/Home';
import useAxios from '../../hooks/useAxios';
import { AxiosResponse } from 'axios';

function Week(props:{handleClickWeekSelectedDate:any,  todos:Todo[] | undefined, getTodos:any}) {
    const [prevMonday, setPrevMonday] = useState<Date>(new Date());
    let monday = prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
    var fullWeek:Date[] = [];
    const instance = useAxios();
    const [todos, setTodos] = useState<Todo[] | undefined>(props.todos);

    const getFullWeek = (monday:any) => {
        fullWeek = [];
        fullWeek.push(monday)
        for (var i = 1; i < 7; i++){ 
            fullWeek.push(new Date(monday.getTime() + (( 3600 * 1000 * 24)*i)));
        }
    }

    getFullWeek(new Date(monday));

    const handleOnClickNextWeek = () => {
        let monday = fullWeek[fullWeek.length - 1].getTime() + (( 3600 * 1000 * 24));
        setPrevMonday(new Date(monday)); 
        getFullWeek(new Date(monday));
    }
    const handleOnClickPrevWeek = () => {
        let monday = fullWeek[0].getTime() - ((( 3600 * 1000 * 24) * 7));
        setPrevMonday(new Date(monday)); 
        getFullWeek(new Date(monday));
    }


    return (
        <div className='calendar__background'>
            <div className="switchWeek">
                      <FontAwesomeIcon icon={faArrowLeft} onClick={handleOnClickPrevWeek}/>

                        <FontAwesomeIcon icon={faArrowRight} onClick={handleOnClickNextWeek}/>
            </div>
                <div className="calendar-week">
                        {fullWeek.map((day,index) => { 
                            return  <div className="calendar-week--day "> 
                            <div className="week-day--day stress">
                                {day.toLocaleDateString('fr-FR', 
                                    {weekday: "long", month: "long", day: "numeric"})}
                            </div>
                            <div className="calendar-todo" id={day.toString()} key={day.toString()}>
                        
                                    <div className="calendar-todo--add" id={day.toString()} key={day.toString()} onClick={(event) => props.handleClickWeekSelectedDate(event.currentTarget.id)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                    </div>

                                    <div className="todo">
                                        <div className="todo-content regular">
                                            {todos && todos.map((todo, index) => { 
                                                let nd = new Date(todo.day)
                                                if (nd.getMonth() === day.getMonth() && nd.getDate() === day.getDate() && nd.getFullYear() === day.getFullYear()){ 
                                                    return todo.content;
                                                }
                                            })}
                                        </div>

                                    </div>
                        </div>
                            </div>
                        })}
                </div> 
                
    </div>
    )
}

export default Week
