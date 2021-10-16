import { Axios } from 'axios';
import React from 'react'; 
import axios from 'axios';

function useAxios() {

    const instance = axios.create({
        baseURL:'http://localhost:5000/api/'
    });

    return {
        instance
    }
}

export default useAxios
