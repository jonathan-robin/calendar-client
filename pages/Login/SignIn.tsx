import React, {useEffect, useRef, useState} from 'react'; 
import Background from '../commons/background';
import Shape from '../commons/Shape';
import VanillaTilt from 'vanilla-tilt';
import { useHistory } from 'react-router';
import useAxios from '../../hooks/useAxios';

function SignIn() {
    const inputRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const [usernameValue, setUsernameValue] = useState<string | null>(); 
    const [passValue, setPassValue] = useState<string | null>(); 
    const [passCheckValue, setPassCheckValue] = useState<string | null>(); 
    const instance = useAxios();

    useEffect(() => {
        const destroy:any = document.querySelectorAll('.input-form__signIn'); 
        destroy && VanillaTilt.init(destroy, {
            max:10, 
            speed:10, 
            glare:true,
            "max-glare":0.4
        })
        inputRef.current && inputRef.current.focus();
    },[])

    const handleClickLogin = () => {
        history.push('./login');
    }

    const handleClickCreateAccount = (e:any) => {
        console.log(usernameValue); 
        console.log(passValue)
        e.preventDefault();
        if (passValue !== passCheckValue){ 
            return ("Pass doesn't match")
        }
        instance.post('/createAccount', {
            username:usernameValue, 
            pass:passValue
        })
        .then((res) => {
            console.log(res)
        })
    }

    const HandleOnChangeUsernameValue = (e:React.FormEvent<HTMLInputElement>) => { 
        setUsernameValue(e.currentTarget.value);
    }
    const HandleOnChangePassValue = (e:React.FormEvent<HTMLInputElement>) => { 
        setPassValue(e.currentTarget.value);
    }
    const HandleOnChangePassCheckValue = (e:React.FormEvent<HTMLInputElement>) => { 
        setPassCheckValue(e.currentTarget.value);
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
                        Création de compte
                    </div>
                    <div className="regular">
                        L'application qui vous permet de garder un oeil sur vos todos !
                    </div>

                    <div className="input-form input-form__signIn input-form__signIn--pseudo">
                        <div className="input-form__signIn--label">
                            Nom d'utilisateur
                        </div>
                            <input className="input input__signIn" ref={inputRef} onChange={HandleOnChangeUsernameValue} placeholder="Rentrez votre pseudo">
                            </input>
                    </div>

                    <div className="inline ">
                        <div className="input-form input-form__signIn input-form__signIn--pass">
                            <div className="input-form__signIn--label" >
                                Mot de passe
                            </div>

                                <input className="input input__signIn" placeholder="Rentrez un mot de passe" onChange={HandleOnChangePassValue}> 

                                </input>
                        </div>

                        <div className="input-form input-form__signIn input-form__signIn--verifPass">
                            <div className="input-form__signIn--label">
                                Vérification
                            </div>
                                <input className="input input__signIn" placeholder="Rentrez à nouveau le mot de passe" onChange={HandleOnChangePassCheckValue}>
                                </input>
                        </div>
                    </div>

                    <div className="buttons buttons--signIn">
                        <button className='button button-valid' onClick={handleClickCreateAccount}>
                            Valider
                        </button>
                        <button className='button button-primary'>
                            Reinitialiser
                        </button>
                    </div>
                    <div className="buttons buttons--signIn">
                    <button className='button button-secondary' onClick={handleClickLogin}>
                           J'ai déjà un compte !
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

export default SignIn
