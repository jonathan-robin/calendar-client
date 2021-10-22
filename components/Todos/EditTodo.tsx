import React,{useState, SyntheticEvent, useRef, useEffect, InputHTMLAttributes, ChangeEventHandler, ButtonHTMLAttributes, useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faTrashAlt, faEdit, faAd, faPlus, faWindowClose} from '@fortawesome/free-solid-svg-icons'; 
import AddTags from '../Tags/AddTags';
import useAxios from '../../hooks/useAxios';
import { Todo } from '../../pages/home/Home';

export interface tags{
        id:number, 
        user_id:number,
        name:string
}

function EditTodo(props:{todo:Todo[], setDisplayEditTodo:any, getTodos:any}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [todoValue, setTodoValue] = useState(props.todo[0].content);
    const instance = useAxios();
    const [startingTime, setStartingTime] = useState<number | string>(props.todo[0].startingTime);
    var remainingHours:number[] = [];
    const [tags, setTags] = useState<any>(); 
    const [todoTags, setTodoTags] = useState<number[]>(props.todo[0].tags)
    const [endingTime, setEndingTime] = useState<number | null>(props.todo[0].endingTime);

    const [displayAddTag, setDisplayAddTag] = useState(false);
    const [successEditTodo, setSuccessEditTodo] = useState(false);

    const [formattedEndingTime, setFormattedEndingTime] = useState<string>();

    for (var i = 0; i < 24 - props.todo[0].startingTime; i++){
        remainingHours.push(parseInt(props.todo[0].startingTime.toString().split('h')[0]) + i + 1)
    }

    useEffect(() => { 
        getTags();
    },[displayAddTag])


    useEffect(() => {
        inputRef.current && inputRef.current.focus();
        props.todo[0].startingTime > 12 ? setStartingTime(props.todo[0].startingTime.toString() + "h00") : setStartingTime("0"+props.todo[0].startingTime.toString()+"h00");
        props.todo[0].endingTime > 12 ? setFormattedEndingTime(props.todo[0].endingTime.toString() + "h00") : setFormattedEndingTime("0"+props.todo[0].endingTime.toString()+"h00");
    },[])

    const handleOnChangeInputValue = (event:React.FormEvent<HTMLInputElement>) => { 
        setTodoValue(event.currentTarget.value);
    }


    const getTags = async() => {
        await instance.post('/tags')
        .then((res) => setTags(res.data))
        .then((res) => {
            let allTag = Array.from(document.querySelectorAll('div.tag-inactive'));
            let i:number[] = [...todoTags];
            i.forEach((todoTagId:number, index:number) =>{
            allTag.map((tagX,index) =>{ 
                    if (tagX.id === todoTagId.toString()){
                        allTag[index].classList.toggle('active');
                    }
                })
            })
        })
    }

    const HandleOnClickValider = async (e:SyntheticEvent) => {
        let f = Array.from(document.getElementsByClassName('active'));
        let tags:number[] = [];
        f.map((ff, index) =>{ 
            tags.push(parseInt(ff.id)); 
        })

        await instance.post('/deleteTodo',{
            todo_id:props.todo[0].todo_id,
        })
        .then(async(res) => {
            if (res.status === 200){
            await instance.post('/createTodo', {
                content:todoValue, 
                day:props.todo[0].day, 
                tags, 
                startingTime:props.todo[0].startingTime, 
                endingTime,
            }).then(res => {res.status === 200 && setTimeout(() => {
                setSuccessEditTodo(false);
                props.setDisplayEditTodo(false);
        
            },1500); setSuccessEditTodo(true)})
            
            let p = await props.getTodos();
            return p;
        }})
    }

    const HandleClickAddTags = () => {
        setDisplayAddTag(true);
    }

    const handleOnClickAddTag = (e:any) => {
        e.currentTarget.classList.toggle("active"); 
    }   

    const handleOnChangeEndingTime = (event:any) => { 
       setEndingTime(event.target[event.target.selectedIndex].getAttribute('data-value'))

    }

    return (
        <>
        <div className='Modal__add-todo'>
            <div className="Modal__add-todo--inner">
        {!successEditTodo? 
        <>
                <div className="todo__add-title stress">
                    Modifier un todo
                    <div className="close-add-todo">
                        <FontAwesomeIcon icon={faWindowClose} onClick={() => props.setDisplayEditTodo(false)}/>
                    </div>
                </div>
                <div className="todo__add-content regular">
                    Quel est le todo ?
                    <input type="text" onChange={handleOnChangeInputValue} value={todoValue} ref={inputRef} className="input-form input-form__signIn" id="" />
                </div>
                <div className="todo__add-time regular">
                Heure de début : {startingTime}
                </div>
                <div className="todo__add-time regular">
                    Heure de fin : {formattedEndingTime}
                    <div><select className='endingTime-todo' onChange={event => handleOnChangeEndingTime(event)}>
                        {remainingHours.map((hour, index) => {
                            return <option data-value={hour} value={hour}>{hour}h00</option>
                        })}
                    </select>
                    </div>
                </div>
                <div className="todo__add-tags regular">
                Ajouter des tags
                        <FontAwesomeIcon icon={faPlus} onClick={HandleClickAddTags}/>
                    <div className='added_tags'>
                    {tags && tags.map((tag:any, index:number) => {
                            return <div className='selectTag tag-inactive' id={tag.id} onClick={handleOnClickAddTag}>{tag.name}</div>
                        })}
                    </div>
                </div>

                <div className="buttons">
                    <button className="button button-valid" onClick={HandleOnClickValider}>
                        Modifier le TODO
                    </button>
                    <button className="button button-secondary" onClick={() => props.setDisplayEditTodo(false)}>
                        Annuler
                    </button>
                </div>

</>
:
            <div className='tagAdded stress'>
            Todo modifié avec succès ! 
            </div>
}
            </div>

        </div>
    {displayAddTag && <AddTags setDisplayAddTag={setDisplayAddTag}/>}
</>
    )
}

export default EditTodo

