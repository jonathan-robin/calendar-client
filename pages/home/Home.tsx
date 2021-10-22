import React, {useContext, useState, useEffect} from 'react'; 
import Background from '../commons/background';
import Shape from '../commons/Shape';
import { AuthContext } from '../../context/GlobalState';
import Day from '../../components/Home/Day';
import Week from '../../components/Home/Week';
import Month from '../../components/Home/Month';
import moment, { locale } from 'moment';
import SwitchFilter from '../../components/Home/SwitchFilter';
import useAxios from '../../hooks/useAxios';
import { getDefaultFormatCodeSettings } from 'typescript';
import { AxiosResponse } from 'axios';
import Header from '../commons/Header';

export interface Todo{ 
    todo_id:number, 
    user_id:number,
    content:string, 
    day:Date, 
    tags:number[],
    startingTime: number, 
    endingTime: number, 
    archived:boolean
}

function Home() {
    const [authState, setAuthState] = useContext(AuthContext);
    const [filter, setFilter] = useState({ week: false, month:false, day:false});
    const instance = useAxios();
    const [currentLayout ,setCurrentLayout] = useState<string>('');
    const [todos, setTodos] = useState<Todo[] | undefined>()
    const [currentDate, setCurrentDate] = useState<string>((new Date).getDate()  + " " + (new Date).toLocaleString('default', { month: 'long' }));
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => { 
        getTodos();
    },[])
    
    const handleClickWeekSelectedDate = (selectedDate:string) => {
        setSelectedDate(new Date(selectedDate)); 
        setFilter({week:false, month:false, day:true})
    }

    const handleClickMonthSelectedDate = (selectedDate:string) => {
        setSelectedDate(new Date(selectedDate)); 
        setFilter({week:false, month:false, day:true})
    }

    const handleClickDay = () => { 
        setFilter({month:false, week:false, day:true})
        setCurrentLayout("Day");
    }
    const handleClickWeek = () => {
        setFilter({month:false, week:true, day:false})
        setCurrentLayout("Week");
    }
    const handleClickMonth = () => {
        setFilter({month:true, week:false, day:false})
        setCurrentLayout("Month");
    }

    console.log(authState);


    const getTodos = async() => { 
        let p = await instance.get('./getTodos')
        .then((res:AxiosResponse<any, Todo>) =>  
        // {if (res && res.status === 200)
            {
            setTodos(res.data); return res
        // }
        })
        return p;
    }

    return (
        <div>
            <Background />
            <Header setFilter={setFilter}/>
            {!filter.week && !filter.month && !filter.day ? 
            <div className="content-box">
                <div className="chooseFilter stress" onClick={handleClickDay}>
                    Choisissez la vue Todo à afficher
                </div>
                <div className="content-box--chooseFilter stress">
                <div className="chooseFilter chooseFilter--day" onClick={handleClickDay}>
                           Par jour  ({currentDate})
                </div>
                <div className="chooseFilter chooseFilter--week" onClick={handleClickWeek}>
                            Par semaine
                        </div>

                <div className="chooseFilter chooseFilter--month" onClick={handleClickMonth}>
                            Par mois ({new Date(currentDate).getMonth()})
                        </div>
                    </div>
                    </div> : 
                    <>
                    <div>
                        {filter.day && 
                        <>
                        <SwitchFilter  currentDate={currentDate} setFilter={setFilter} current={currentLayout} setCurrentLayout={setCurrentLayout} setSelectedDate={setSelectedDate}/>
                        <Day todos={todos} selectedDate={selectedDate} getTodos={getTodos} />
                        </>
        }
                    </div>
                    <div>
                         {filter.week && 
                         <>
                        <SwitchFilter currentDate={currentDate} setFilter={setFilter} current={currentLayout} setCurrentLayout={setCurrentLayout} setSelectedDate={setSelectedDate}/>
                         <Week handleClickWeekSelectedDate={handleClickWeekSelectedDate} todos={todos} getTodos={getTodos}/>
                         </>
                         }
                     </div>
                     <div>
                         {filter.month && 
                         <>
                         <SwitchFilter currentDate={currentDate} setFilter={setFilter} current={currentLayout} setCurrentLayout={setCurrentLayout} setSelectedDate={setSelectedDate}/>
                         <Month handleClickMonthSelectedDate={handleClickMonthSelectedDate} todos={todos} getTodos={getTodos}/>
                        </>
                         }
                     </div>
                    </>
                    }
        </div>
    )
}

export default Home
