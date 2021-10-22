import React,{useContext} from 'react'; 
import { AuthContext } from '../../context/GlobalState';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserAlt, faUserAltSlash, faUserCog, faUserEdit, faUserLock, faUsersSlash } from '@fortawesome/free-solid-svg-icons'; 
import { useHistory } from 'react-router';

function Header(props:{setFilter:any}) {
    const [authState, setAuthState] = useContext(AuthContext);
    const history = useHistory();
    const handleOnClickLogOut = () => {
        setAuthState({token:'', refreshToken:'',username:'', id:0})
        history.push('/login');
    }
    const handleOnClickHome = () => { 
        props.setFilter({day:false, month:false, week:false})
    }
    return (
        <div className="header">
            <div className="header--right stress">
                <div>Connected as {authState.username}</div>
                <div><FontAwesomeIcon className='Homelogo' icon={faUserAlt} onClick={handleOnClickHome}/></div>
                <div><FontAwesomeIcon icon={faSignOutAlt} onClick={handleOnClickLogOut}/></div>
                </div>            
        </div>
    )
}

export default Header
