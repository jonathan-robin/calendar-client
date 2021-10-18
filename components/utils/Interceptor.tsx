import React, {useContext} from 'react'; 
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../context/GlobalState';
import { AxiosPromise, AxiosResponse, AxiosResponseHeaders } from 'axios';

export interface ServerResponseToken{
    accessToken:'string', 
    refreshToken:'string'
}

export function Interceptor() {

}

export default Interceptor
