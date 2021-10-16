import React, {ChangeEventHandler, InputHTMLAttributes, SyntheticEvent, useEffect, useRef, useState} from 'react'; 
import { useHistory } from 'react-router';
import Background from '../background';
import Shape from '../Shape';
import useAxios from '../../../hooks/useAxios';


function Login() {
    const history = useHistory(); 
    const [inputUsernameValue, setInputUsernameValue] = useState<string>();
    const [inputPassValue, setInputPassValue] = useState<string>();
    const {instance} = useAxios()

    const handleClickSignIn = () => { 
        history.push('/SignIn')
    }
    
    const handleClickLogin  = (event:SyntheticEvent):void  => { 
        event.preventDefault();
       
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
