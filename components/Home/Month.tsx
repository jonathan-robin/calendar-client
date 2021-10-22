import React,{useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faTrashAlt, faEdit, faAd, faPlus, faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Todo } from '../../pages/home/Home';

function Month(props:{handleClickMonthSelectedDate:any, todos:Todo[] | undefined, getTodos:any}) {

    const [todos, setTodos] = useState<Todo[] | undefined>(props.todos)
    const [month, setMonth] = useState<number>(new Date().getMonth());
    let date = new Date;
    var fullMonth:Date[] = [];


    const getFullMonth = (firstDayOfTheMonth:any) => {
        let numberDay:number;
        if (firstDayOfTheMonth.getMonth()%2 !== 0 && firstDayOfTheMonth.getMonth() !== 1 && firstDayOfTheMonth.getMonth() < 7 ){
            numberDay = 30;
        }
        else if (firstDayOfTheMonth.getMonth() === 1){ 
            numberDay= 28;
        }
        else if(firstDayOfTheMonth.getMonth()%2 === 0 && firstDayOfTheMonth.getMonth() !== 1 && firstDayOfTheMonth.getMonth() >= 8 ){
            numberDay = 30;
        }
        else{
            numberDay= 31;
        }
        fullMonth = [];
        fullMonth.push(firstDayOfTheMonth)
        for (var i = 1; i < numberDay; i++){ 
            fullMonth.push(new Date(firstDayOfTheMonth.getTime() + (( 3600 * 1000 * 24)*i)));
        }
    }

    getFullMonth( new Date(date.getFullYear(), month, 1));

    const handleOnClickNextMonth = () => {
        setMonth(month + 1);
        month === 11 && setMonth(11);
        let firstDayOfNextMonth = new Date(date.getFullYear(), month, 1);
        getFullMonth(new Date(firstDayOfNextMonth));
    }
    const handleOnClickPrevMonth = () => {
        setMonth(month - 1)
        month === 0 && setMonth(0);
        let firstDayOfPrevMonth = new Date(date.getFullYear(), month, 1);
        getFullMonth(new Date(firstDayOfPrevMonth));
    }


    let monthString = new Date(); 
    monthString.setDate(1); 
    monthString.setFullYear(2021);
    monthString.setMonth(month);

    return (
        <div className='calendar__background cb_month'>
            <div className="switchWeek stress">
                      <FontAwesomeIcon icon={faArrowLeft} onClick={handleOnClickPrevMonth}/>
                      {monthString.toLocaleDateString('fr-FR', 
                                    {month: "long"})}
                        <FontAwesomeIcon icon={faArrowRight} onClick={handleOnClickNextMonth}/>
            </div>
            <div className="inner-calendar">
                <div className="calendar-month">
                         {fullMonth.map((day,index) => { 
                            return  <div className="calendar-month--day "> 
                            <div className="month-day--day regular">
                                {day.toLocaleDateString('fr-FR', 
                                    {weekday: "short", month: "short", day: "numeric"})}
                            </div>
                            <div className="calendar-todo" id={index.toString()} key={index.toString()}>
                        
                                    <div className="calendar-todo--add" id={day.toString()} onClick={(event) => props.handleClickMonthSelectedDate(event.currentTarget.id)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                    </div>

                                    <div className="todo">
                                        <div className="todo-content regular">
                                            {todos?.map((todo, index) =>{
                                                let nd = new Date(todo.day) 
                                                if (day.getMonth() === nd.getMonth() && day.getFullYear() === nd.getFullYear() && day.getDate() === nd.getDate()){
                                                    return todo.content
                                                }
                                            })}
                                        </div>
                                        </div>
                        </div>
                            </div>
                        })}
                </div> 
                
            </div>
    </div>
    )
}

export default Month
