import React, {SyntheticEvent, useEffect, useRef, useState, useContext} from 'react'; 
import { useHistory } from 'react-router';
import Background from '../commons/background';
import Shape from '../commons/Shape';
import useAxios from '../../hooks/useAxios';
import { AxiosResponse } from 'axios';
import { AuthContext } from '../../context/GlobalState';
import LoadUserInfos from '../../components/utils/LoadUserInfos';

function Login() {
    const history = useHistory(); 
    const [inputUsernameValue, setInputUsernameValue] = useState<string>();
    const [inputPassValue, setInputPassValue] = useState<string>();
    const instance = useAxios()
    const [authState, setAuthState] = useContext(AuthContext)

    // Stocker globalement refreshToken

    const handleClickSignIn = () => { 
        history.push('/SignIn')
    }
    
    const handleClickLogin  = (event:SyntheticEvent):void  => { 
        event.preventDefault();
        instance.post('/login',{
            username:inputUsernameValue, 
            pass:inputPassValue
        })
        .then(async(res:any) => {
            if(res && res.status === 200 ){
                console.log(res.data.accessToken)
                setAuthState({token:res.data.accessToken, refreshToken:res.data.refreshToken});
                instance.defaults.headers.common['authorization'] = `Bearer ${authState.token}`;
                console.log(authState.token);
                console.log(authState.refreshToken);
                console.log(res.status)
                console.log('enter 200 login')
                await LoadUserInfos({instance, headers:authState.token});
            }
        })
        .then(res => console.log(res))
    }

    const handleOnChangeInputUsername = (event:React.FormEvent<HTMLInputElement>) => { 
        setInputUsernameValue(event.currentTarget?.value);
    }
    const handleOnChangeInputPass = (event:React.FormEvent<HTMLInputElement>) => { 
        setInputPassValue(event.currentTarget?.value);
    }

    return (
        <div>
            <Background />
            <Shape />
            <div className="content-box">
                <div className="content-box__signIn">
                    <div className="title">
                        Space Calendar
                    </div>
                    <div className="subTitle">
                        Connexion
                    </div>
                    <div className="regular">
                       Welcome back ! 
                       Que fait-on aujourd'hui ?
                    </div>
                    <div className="inline ">

                    <div className="input-form input-form__signIn input-form__signIn--pseudo">
                        <div className="input-form__signIn--label">
                            Nom d'utilisateur
                        </div>
                            <input className="input input__signIn"  value={inputUsernameValue} type="" onChange={handleOnChangeInputUsername} placeholder="Rentrez votre pseudo">
                            </input>
                    </div>

                        <div className="input-form input-form__signIn input-form__signIn--pass">
                            <div className="input-form__signIn--label" >
                                Mot de passe
                            </div>

                                <input className="input input__signIn" value={inputPassValue} type="password" onChange={handleOnChangeInputPass} placeholder="Rentrez un mot de passe">

                                </input>
                                </div>

                    </div>

                    <div className="buttons buttons--signIn">
                        <button className='button button-valid' onClick={handleClickLogin}>
                            Valider
                        </button>
                        <button className='button button-primary'>
                            Reinitialiser
                        </button>
                    </div>
                    <div className="buttons buttons--signIn">
                    <button className='button button-secondary' onClick={() => handleClickSignIn} >
                           Je me crée un compte !
                        </button>
                    </div>
                </div>
            </div>
            <script type="text/javascript" src="vanilla-tilt.js"></script>
            <script type="text/javascript">

            </script>
        </div>
    )
}

export default Login