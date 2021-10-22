import Background from "../commons/background";
import { useHistory } from "react-router";

function LandingPage() {
  const history = useHistory();
  const handleOnClickCreateAccount = () => {
    history.push("/SignIn");
  };
  const handleOnClickLogin = () => {
      history.push("/Login")
  }

  return (
    <div>
      <Background />
      <div className="content-box">
        <div className="content-box--home">
          <div className="title ">Bienvenue sur</div>
          <div className="title">Space Calendar</div>
          <div className="regular">Pour commencer, créez vous un compte !</div>
          <div className="buttons buttons--home">
            <button
              className="button button-primary"
              onClick={handleOnClickCreateAccount}
            >
              Je me crée un compte !
            </button>
            <button className="button button-secondary" onClick={handleOnClickLogin}>
              J'ai déjà un compte !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
