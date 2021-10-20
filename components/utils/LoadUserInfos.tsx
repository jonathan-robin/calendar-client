import React,{useContext} from 'react'; 
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../context/GlobalState';
import { useHistory } from 'react-router';


async function LoadUserInfos(props:{instance:any, headers:any, history:any, authState:any}) {

    console.log(props.authState)


    props.instance.defaults.headers.common['authorization'] = `Bearer ${props.headers}`;


    // .then((res:any) => {
    //     if(res && res.status === 200 ){
    //         console.log(res.data.accessToken)
    //         setAuthState({...authState, token:res.data.accessToken, refreshToken:res.data.refreshToken});
    //         instance.defaults.headers.common['authorization'] = `Bearer ${authState.token}`;
    //         console.log('authstate token',authState.token);
    //         console.log('authstate refreshtoken', authState.refreshToken);
    //         console.log('resstatus',res.status)
    //         console.log('enter 200 login')
    //         LoadUserInfos({instance, headers:authState.token, history:history, authState:[authState, setAuthState]})
    //     }
    // })



}
export default LoadUserInfos;

