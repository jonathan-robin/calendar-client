import React,{useState, useEffect, SyntheticEvent} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faTrashAlt, faEdit, faAd, faPlus} from '@fortawesome/free-solid-svg-icons'
import useAxios from '../../hooks/useAxios';
import AddTodo from '../Todos/AddTodo';
import { Todo } from '../../pages/home/Home';
import EditTodo from'../Todos/EditTodo';
import { AxiosResponse } from 'axios';

function Day(props:{selectedDate:Date, todos:Todo[] | undefined, getTodos:any}) {
    let hours = Array.apply(null, Array(12)).map(function () {})
    const instance = useAxios();
    const [displayAddTodo, setDisplayAddTodo] = useState(false);
    const [displayEditTodo, setDisplayEditTodo] = useState(false);
    const [displayDeleteMessage, setDisplayDeleteMessage] = useState(false);
    const [timeStartTodo, setTimeStartTodo] = useState();
    const [todoToDelete, setTodoToDelete] = useState<string>('');
    const [todoToEdit, setTodoToEdit] = useState<Todo[]>();
    const [deletingTodo, setDeletingTodo] = useState(false);
    const [todos, setTodos] = useState(props.todos);
    const [todoSelectedDate, setTodoSelectedDate] = useState(props.todos && props.todos.filter((todo) => {
            let tododay = new Date(todo.day);
            return tododay.getMonth() === props.selectedDate.getMonth() && tododay.getDate() === props.selectedDate.getDate() && tododay.getFullYear() === props.selectedDate.getFullYear();
        }));


    useEffect(() => {
        setTodoSelectedDate(props.todos && props.todos.filter((todo) => {
            let tododay = new Date(todo.day);
            return tododay.getMonth() === props.selectedDate.getMonth() && tododay.getDate() === props.selectedDate.getDate() && tododay.getFullYear() === props.selectedDate.getFullYear();
        }));
    },[todos])

    useEffect(() => { 
        props.getTodos();
        setTodos(props.getTodos())
    },[displayAddTodo, displayEditTodo])

    const HandleOnClickAddTodo = (e:any) => {
        setTimeStartTodo(e.currentTarget.id);
        setDisplayAddTodo(true);
    }

    const handleOnClickDeleteTodo = (e:React.BaseSyntheticEvent) =>{
        e.preventDefault();
        setTodoToDelete(e.currentTarget.id);
        setDisplayDeleteMessage(true);
    }

    const handleOnClickConfirmDelete = async () => { 
        await instance.post('/deleteTodo',{
            todo_id:parseInt(todoToDelete),
        })
        .then(async(res) => {
            if (res.status === 200){
                setTimeout(() => { 
                    setDeletingTodo(false)
                    setDisplayDeleteMessage(false)
                },1500)
                setDeletingTodo(true);
                let p = await props.getTodos();
                return p;
        }})
        .then((res) => {return setTodos(res)})
        }

    const HandleOnClickCancelDelete = () => { 
        setDisplayDeleteMessage(false);  
        setTodoToDelete('');
    }

    const handleOnClickEditTodo = async (e:SyntheticEvent) => {
        await instance.post('/getTodo',{
            todo_id:parseInt(e.currentTarget.id),
        })
        .then(async(res:AxiosResponse<any, Todo[]>) => {
            if (res.status === 200){
                setTodoToEdit(res.data)
        }})
        .then((res) => setDisplayEditTodo(true))
    }

    return (
      <>
     {displayAddTodo && <AddTodo timeStartTodo={timeStartTodo} setDisplayAddTodo={setDisplayAddTodo} date={props.selectedDate} getTodos={() => props.getTodos()}/>}
     {displayEditTodo && todoToEdit && <EditTodo todo={todoToEdit} setDisplayEditTodo={setDisplayEditTodo} getTodos={() => props.getTodos()}/>}
        <div className='calendar__background stress'>
                        {props.selectedDate.toLocaleDateString('fr-FR', 
                                    {weekday: "long", month: "long", day: "numeric"})}
        <div className="inner-calendar">

        <div className="calendar-hour left">
            {hours.map((hour, index) => { 
                let time:string;
                let todo_id:number=0;
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
                            {todoSelectedDate && todoSelectedDate.map((todo, i) => { 
                                if(todo.startingTime.toString() === index.toString()){ 
                                    todo_id = todo.todo_id;
                                    return <div>{todo.content}</div>
                                }
                        })
                        }
                            </div>
                            <div className="todo-actions">
                                <div className="calendar-todo--validate">
                                <FontAwesomeIcon icon={faCheckSquare} />
                                </div>
                                <div className="calendar-todo--edit">
                                <FontAwesomeIcon icon={faEdit} id={todo_id.toString()} onClick={handleOnClickEditTodo}/>
                                </div>
                                <div className="calendar-todo--delete">
                                <FontAwesomeIcon icon={faTrashAlt} id={todo_id.toString()} onClick={handleOnClickDeleteTodo}/>
                                </div>
                            </div>

                            </div>

            
                        </div></>
            })}
            </div> 
            <div className="calendar-hour right"> 
            {hours.map((hour, index) => { 
                let time:string;
                let todo_id:number=0;
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
                            {todoSelectedDate && todoSelectedDate.map((todo, i) => { 
                                if(todo.startingTime.toString() === id.toString()){ 
                                    todo_id = todo.todo_id;
                                    return <div>{todo.content}</div>
                                }
                        })
                        }
                            </div>
                            <div className="todo-actions">
                                <div className="calendar-todo--validate">
                                <FontAwesomeIcon icon={faCheckSquare} />
                                </div>
                                <div className="calendar-todo--edit">
                                <FontAwesomeIcon icon={faEdit} id={todo_id.toString()} onClick={handleOnClickEditTodo} />
                                </div>
                                <div className="calendar-todo--delete">
                                <FontAwesomeIcon icon={faTrashAlt} id={todo_id.toString()} onClick={handleOnClickDeleteTodo}/>
                                </div>
                            </div>

                            </div>

                       

                        </div>
                        </>
            })}
                        </div>  

        </div>
    </div>

{displayDeleteMessage && 
    <div className='Modal__add-todo'>
        <div className="Modal__add-todo--inner">
            {!deletingTodo && 
            <>
            <div className='tagAdded stress'>
                Êtes-vous sûr de vouloir supprimer le todo ?
            </div>
            <div className="buttons">
                <button className="button button-valid" onClick={handleOnClickConfirmDelete}>
                    Supprimer
                </button>
                <button className="button button-secondary" onClick={HandleOnClickCancelDelete}>
                    Annuler
                </button>
            </div>
            </>
            }
            {deletingTodo && 
        <div className='tagAdded stress'>
        Todo supprimé avec succès
        </div>
         } 
    </div>
    </div>
     } 
        </>
    )
}

export default Day
