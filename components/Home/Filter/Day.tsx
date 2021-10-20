import React,{useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faTrashAlt, faEdit, faAd, faPlus} from '@fortawesome/free-solid-svg-icons'
import useAxios from '../../../hooks/useAxios';
import AddTodo from '../../AddTodo';

function Day(props:{selectedDate:Date}) {
    let hours = Array.apply(null, Array(12)).map(function () {})
    const instance = useAxios();
    const [displayAddTodo, setDisplayAddTodo] = useState(false);

    const [timeStartTodo, setTimeStartTodo] = useState();
    // const [todoDay, setTodoDay] = useState(new Date());


    const HandleOnClickAddTodo = (e:any) => {
        setTimeStartTodo(e.currentTarget.id);
        setDisplayAddTodo(true);
        // instance.post('/createTodo', {
        //     content:'test add todo', 
        //     time:e.currentTarget.id, 
        //     day:props.selectedDate,
        //     tags:['sport', 'work']

        // })
        // .then((res) => console.log(res))
    }

    return (
      <>
     {displayAddTodo && <AddTodo timeStartTodo={timeStartTodo} setDisplayAddTodo={setDisplayAddTodo}/>}
        <div className='calendar__background stress'>
                        {props.selectedDate.toLocaleDateString('fr-FR', 
                                    {weekday: "long", month: "long", day: "numeric"})}
        <div className="inner-calendar">

        <div className="calendar-hour left">
            {hours.map((hour, index) => { 
                let time:string;
                if (index < 10 ) time = "0" + index.toString() + "h00";
                else time = index.toString() + "h00"
                    return <>
                        <div className="calendar-todo" id={index.toString()} key={index.toString()}>
                        <div className="calendar-time regular">
                            {time} 
                        <div className="calendar-todo--add" id={index.toString()} onClick={HandleOnClickAddTodo}>
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
                        <div className="calendar-todo" id={id.toString()} key={id.toString()}>
                        <div className="calendar-time regular">
                            {time} 
                        <div className="calendar-todo--add" id={id.toString()} onClick={HandleOnClickAddTodo}>
                                <FontAwesomeIcon id={id.toString()} icon={faPlus} />
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
        </>
    )
}

export default Day
