import React,{useContext} from 'react'; 
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../context/GlobalState';



async function LoadUserInfos(props:{instance:any, headers:any}) {

    console.log(props.headers)
    props.instance.defaults.headers.common['authorization'] = `Bearer ${props.headers}`;

    await props.instance.get('/home')
    .then((response:any) => {
        console.log('enter /home')
        console.log(response.data)
        return (response.data)
    }).catch((err:any) => {
        console.log(err.response.status)
        return err.response.status
    })



}
export default LoadUserInfos;

