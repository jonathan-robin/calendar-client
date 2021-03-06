import React, { useEffect, useRef, useState, useContext} from "react";
import Background from "../commons/background";
import VanillaTilt from "vanilla-tilt";
import { useHistory } from "react-router";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../context/GlobalState";

function SignIn() {
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [passValue, setPassValue] = useState<string>('');
  const [passCheckValue, setPassCheckValue] = useState<string>('');
  const instance = useAxios();
  const [authState, setAuthState] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null >(null);

  useEffect(() => {
    const destroy: any = document.querySelectorAll(".input-form__signIn");
    destroy &&
      VanillaTilt.init(destroy, {
        max: 10,
        speed: 10,
        glare: true,
        "max-glare": 0.4,
      });
    inputRef.current && inputRef.current.focus();
  }, []);

  const handleClickLogin = () => {
    history.push("/login");
  };

  const handleClickCreateAccount = (e: any) => {
    e.preventDefault();
    if (passValue !== passCheckValue) {
      return setErrorMessage("Les mots de passe ne correspondent pas...");
    }
    else if (usernameValue === '' || passValue === ''){
        return setErrorMessage("Entrez un nom d'utilisateur et un mot de passe valide...")
    }
    else{
        return instance
        .post("/createAccount", {
            username: usernameValue,
            pass: passValue,
        })
        .then((res) => {
            if (res.status === 200){
                instance
                .post("/login", {
                  username: usernameValue,
                  pass: passValue,
                })
                .then(async (res: any) => {
                  if (res && res.status === 200) {
                    localStorage.setItem('token', res.data.accessToken);
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('id', res.data.id);

                    setAuthState({
                      ...authState,
                      token: res.data.accessToken,
                      refreshToken: res.data.refreshToken,
                      username: res.data.username,
                      id: res.data.id,
                    });
                    instance.defaults.headers.common[
                      "authorization"
                    ] = `Bearer ${res.data.accessToken}`;
                    const p = await instance.post("/home");
                    if (p.status === 200) {
                      return history.push("/home");
                    }
                    return false;
                  }
                  return false;
                });  
            }
        });
    }
  };

  const HandleOnChangeUsernameValue = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setUsernameValue(e.currentTarget.value);
  };
  const HandleOnChangePassValue = (e: React.FormEvent<HTMLInputElement>) => {
    setPassValue(e.currentTarget.value);
  };
  const HandleOnChangePassCheckValue = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setPassCheckValue(e.currentTarget.value);
  };
  const handleOnClickReset = () => { 
    setUsernameValue(''); 
    setPassValue(''); 
    setPassCheckValue(''); 
  }

  return (
    <div>
      <Background />
      <div className="content-box">
        <div className="content-box__signIn">
          <div className="title">Space Calendar</div>
          <div className="subTitle">Cr??ation de compte</div>
          <div className="regular">
            L'application qui vous permet de garder un oeil sur vos todos !
          </div>
          {errorMessage && 
          <div className="regular-error">
            {errorMessage}
          </div>
        }

          <div className="input-form input-form__signIn input-form__signIn--pseudo">
            <div className="input-form__signIn--label">Nom d'utilisateur</div>
            <input
              className="input input__signIn"
              ref={inputRef}
              value={usernameValue}
              onChange={HandleOnChangeUsernameValue}
              placeholder="Rentrez votre pseudo"
            ></input>
          </div>
          <div className="inline ">
            <div className="input-form input-form__signIn input-form__signIn--pass">
              <div className="input-form__signIn--label">Mot de passe</div>

              <input
                className="input input__signIn"
                placeholder="Rentrez un mot de passe"
                value={passValue}
                onChange={HandleOnChangePassValue}
              ></input>
            </div>

            <div className="input-form input-form__signIn input-form__signIn--verifPass">
              <div className="input-form__signIn--label">V??rification</div>
              <input
                className="input input__signIn"
                placeholder="Rentrez ?? nouveau le mot de passe"
                value={passCheckValue}
                onChange={HandleOnChangePassCheckValue}
              ></input>
            </div>
          </div>
          <div className="buttons buttons--signIn">
            <button
              className="button button-valid"
              onClick={handleClickCreateAccount}
            >
              Valider
            </button>
            <button className="button button-primary" onClick={handleOnClickReset}>Reinitialiser</button>
          </div>
          <div className="buttons buttons--signIn">
            <button
              className="button button-secondary"
              onClick={handleClickLogin}
            >
              J'ai d??j?? un compte !
            </button>
          </div>
        </div>
      </div>
      <script type="text/javascript" src="vanilla-tilt.js"></script>
      <script type="text/javascript"></script>
    </div>
  );
}

export default SignIn;
