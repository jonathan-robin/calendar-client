import React, {useEffect, useRef} from 'react'; 
import Background from '../background';
import Shape from '../Shape';
import VanillaTilt from 'vanilla-tilt';
import { useHistory } from 'react-router';

function SignIn() {
    const inputRef = useRef<HTMLInputElement>(null);
    const history = useHistory();


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
                            <input className="input input__signIn" ref={inputRef} placeholder="Rentrez votre pseudo">
                            </input>
                    </div>

                    <div className="inline ">
                        <div className="input-form input-form__signIn input-form__signIn--pass">
                            <div className="input-form__signIn--label" >
                                Mot de passe
                            </div>

                                <input className="input input__signIn" placeholder="Rentrez un mot de passe">

                                </input>
                        </div>

                        <div className="input-form input-form__signIn input-form__signIn--verifPass">
                            <div className="input-form__signIn--label">
                                Vérification
                            </div>
                                <input className="input input__signIn" placeholder="Rentrez à nouveau le mot de passe">
                                </input>
                        </div>
                    </div>

                    <div className="buttons buttons--signIn">
                        <button className='button button-valid'>
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
