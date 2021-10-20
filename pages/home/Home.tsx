import React, {useContext, useState, useEffect} from 'react'; 
import Background from '../commons/background';
import Shape from '../commons/Shape';
import { AuthContext } from '../../context/GlobalState';

import Day from '../../components/Home/Filter/Day';
import Week from '../../components/Home/Filter/Week';
import Month from '../../components/Home/Filter/Month';
import moment, { locale } from 'moment';
import SwitchFilter from '../../components/Home/Filter/SwitchFilter';
import useAxios from '../../hooks/useAxios';
import { getDefaultFormatCodeSettings } from 'typescript';
import { AxiosResponse } from 'axios';

export interface Todo{ 
    todo_id:number, 
    user_id:number,
    content:string, 
    day:Date, 
    tags:number[]
    startingTime: number, 
    endingTime: number, 
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
        let p = await instance.get('./getTodo')
        .then((res:AxiosResponse<any, Todo>) =>  {setTodos(res.data); return res})
        return p;
    }

    return (
        <div>
            <Background />
            <Shape />
            {!filter.week && !filter.month && !filter.day ? 
            <div className="content-box">
                <div className="content-box__signIn">
            <div className="input-form input-form__signIn">
                <div className="home-label home-label--day" onClick={handleClickDay}>
                            {currentDate}
                </div>
                </div>
                    <div className="input-form input-form__signIn input-form__signIn--pseudo">
                        <div className="input-form__signIn--label">
                <div className="home-label home-label--week" onClick={handleClickWeek}>
                            Semaine 44
                        </div>
                        </div>
                    </div>
                    <div className="input-form input-form__signIn input-form__signIn--pseudo">
                        <div className="input-form__signIn--label">
                <div className="home-label home-label--month" onClick={handleClickMonth}>
                            {new Date(currentDate).getMonth()}
                        </div>
                        </div>
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
                         <Week handleClickWeekSelectedDate={handleClickWeekSelectedDate}/>
                         </>
                         }
                     </div>
                     <div>
                         {filter.month && 
                         <>
                         <SwitchFilter currentDate={currentDate} setFilter={setFilter} current={currentLayout} setCurrentLayout={setCurrentLayout} setSelectedDate={setSelectedDate}/>
                         <Month handleClickMonthSelectedDate={handleClickMonthSelectedDate}/>
                        </>
                         }
                     </div>
                    </>
                    }
        </div>
    )
}

export default Home
