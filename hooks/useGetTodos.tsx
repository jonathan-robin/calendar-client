import { AxiosResponse } from 'axios';
import React, {useState, useEffect} from 'react'; 
import { Todo } from '../pages/home/Home';
import useAxios from './useAxios';

async function useGetTodos() {

    const instance = useAxios();
    const [todos, setTodos] = useState<Todo[]>();
 
    const res = await instance.get('/getTodos');
    const res_1 = res.data;
    return res_1;
}

export default useGetTodos
