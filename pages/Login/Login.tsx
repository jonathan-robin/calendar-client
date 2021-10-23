import React, { SyntheticEvent, useState, useContext } from "react";
import { useHistory } from "react-router";
import Background from "../commons/background";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../context/GlobalState";

function Login() {
  const history = useHistory();
  const [inputUsernameValue, setInputUsernameValue] = useState<string>();
  const [inputPassValue, setInputPassValue] = useState<string>();
  const instance = useAxios();
  const [authState, setAuthState] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleClickSignIn = () => {
    history.push("/SignIn");
  };

  const handleClickLogin = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    instance
      .post("/login", {
        username: inputUsernameValue,
        pass: inputPassValue,
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
          return setErrorMessage('Problème interne au serveur...');
        }
        return setErrorMessage("Le mot de ou passe ou l'identifiant n'est pas valide");

      });
  };
  const handleOnChangeInputUsername = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setInputUsernameValue(event.currentTarget?.value);
  };
  const handleOnChangeInputPass = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setInputPassValue(event.currentTarget?.value);
  };
  const handleOnClickReset = () => { 
    setInputUsernameValue(''); 
    setInputPassValue(''); 
  }

  return (
    <div>
      <Background />
      <div className="content-box">
        <div className="content-box__signIn">
          <div className="title">Space Calendar</div>
          <div className="subTitle">Connexion</div>
          <div className="regular">
            Welcome back ! Que fait-on aujourd'hui ?
          </div>
          {errorMessage && 
          <div className="regular-error">
              {errorMessage}
          </div>
        }
          <div className="inline ">
            <div className="input-form input-form__signIn input-form__signIn--pseudo">
              <div className="input-form__signIn--label">Nom d'utilisateur</div>
              <input
                className="input input__signIn"
                value={inputUsernameValue}
                type=""
                onChange={handleOnChangeInputUsername}
                placeholder="Rentrez votre pseudo"
              ></input>
            </div>

            <div className="input-form input-form__signIn input-form__signIn--pass">
              <div className="input-form__signIn--label">Mot de passe</div>

              <input
                className="input input__signIn"
                value={inputPassValue}
                type="password"
                onChange={handleOnChangeInputPass}
                placeholder="Rentrez un mot de passe"
              ></input>
            </div>
          </div>

          <div className="buttons buttons--signIn">
            <button className="button button-valid" onClick={handleClickLogin}>
              Valider
            </button>
            <button className="button button-primary" onClick={handleOnClickReset}>Reinitialiser</button>
          </div>
          <div className="buttons buttons--signIn">
            <button
              className="button button-secondary"
              onClick={handleClickSignIn}
            >
              Je me crée un compte !
            </button>
          </div>
        </div>
      </div>
      <script type="text/javascript" src="vanilla-tilt.js"></script>
      <script type="text/javascript"></script>
    </div>
  );
}

export default Login;
