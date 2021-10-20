import React,{useState, SyntheticEvent, useRef, useEffect, InputHTMLAttributes, ChangeEventHandler, ButtonHTMLAttributes, useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faTrashAlt, faEdit, faAd, faPlus, faWindowClose} from '@fortawesome/free-solid-svg-icons'; 
import AddTags from './AddTags';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../context/GlobalState';

function AddTodo(props:{setDisplayAddTodo:any, timeStartTodo:any}) {
    const [todoValue, setTodoValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [displayAddTag, setDisplayAddTag] = useState(false);
    const [startingTime, setStartingTime] = useState<string | null>(null);
    var remainingHours:number[] = [];
    const [tags, setTags] = useState<any>(['']); 
    const instance = useAxios();
    const [authState, setAuthState] = useContext(AuthContext);


    for (var i = 0; i < 24 - props.timeStartTodo; i++){
        remainingHours.push(parseInt(props.timeStartTodo) + i + 1)
    }

    useEffect(() => { 
        instance.post('/tags')
        .then((res) => setTags(res.data))
    },[displayAddTag])

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
        props.timeStartTodo > 12 ? setStartingTime(props.timeStartTodo.toString() + "h00") : setStartingTime("0"+props.timeStartTodo.toString()+"h00");
    },[])

    const handleOnChangeInputValue = (event:React.FormEvent<HTMLInputElement>) => { 
        setTodoValue(event.currentTarget.value);
    }

    const HandleOnClickValider = (e:SyntheticEvent) => {
        console.log(todoValue); 
        console.log(startingTime); 
        let f = Array.from(document.getElementsByClassName('active'));
        let tags:number[] = [];
        f.map((ff, index) =>{ 
            tags.push(parseInt(ff.id)); 
        })

    }

    const HandleClickAddTags = () => {
        setDisplayAddTag(true);
    }

    const handleOnClickAddTag = (e:any) => {
        e.currentTarget.classList.toggle("active"); 
    }   

    return (
        <>
        <div className='Modal__add-todo'>
            <div className="Modal__add-todo--inner">
                <div className="todo__add-title stress">
                    Ajouter un todo
                    <div className="close-add-todo">
                        <FontAwesomeIcon icon={faWindowClose} onClick={() => props.setDisplayAddTodo(false)}/>
                    </div>
                </div>
                <div className="todo__add-content regular">
                    Quel est le todo ?
                    <input type="text" onChange={handleOnChangeInputValue} ref={inputRef} className="input-form input-form__signIn" id="" />
                </div>
                <div className="todo__add-time regular">
                Heure de début : {startingTime}
                </div>
                <div className="todo__add-time regular">
                    Ajouter une heure de fin
                    <div><select>
                        {remainingHours.map((hour, index) => {
                            return <option>{hour}h00</option>
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
                        Ajouter TODO
                    </button>
                    <button className="button button-secondary">
                        Réinitialiser
                    </button>
                </div>

            </div>

        </div>
    {displayAddTag && <AddTags setDisplayAddTag={setDisplayAddTag}/>}
</>
    )
}

export default AddTodo
