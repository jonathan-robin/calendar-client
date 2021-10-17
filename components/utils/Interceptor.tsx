import React from 'react'; 
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../context/GlobalState';

function Interceptor() {
    const {instance} = useAxios(); 


    // instance.interceptors.response.use((response) =>{
    //     return response; 
    // }, async (error) => { 
    //     const originalRequest = error.config;
    //     if (error.config.url != '/refreshToken' && error.response.status === 401 && !originalRequest._retry !== true){ 
    //         originalRequest._retry = true; 
    //         if (refreshToken && refreshToken != ''){

    //         }
    //     }
    // });

}

export default Interceptor
