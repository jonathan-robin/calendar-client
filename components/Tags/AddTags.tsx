import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../hooks/useAxios";

function AddTags(props: { setDisplayAddTag: any }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tag, setTag] = useState("");
  const instance = useAxios();
  const [tagAdded, setTagAdded] = useState(false);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const handleOnChangeInputValue = (event: React.FormEvent<HTMLInputElement>) => {
    setTag(event.currentTarget.value);
  };

  const handleOnClickValider = () => {
    instance
      .post("/addTag", {
        tag,
      })
      .then((res) => {
        if (res.status === 200) {
          setTagAdded(true);
        }
      });
    setTimeout(() => {
      setTagAdded(false);
      props.setDisplayAddTag(false);
    }, 1000);
  };

  const HandleOnClickReset = () =>{ 
      setTag(" ");
  }

  return (
    <div className="Modal__add-todo Modal__add-todo--tag">
      <div className="Modal__add-todo--inner">
        {!tagAdded && (
          <>
            <div className="todo__add-title stress">
              Ajouter un todo
              <div className="close-add-todo">
                <FontAwesomeIcon icon={faWindowClose} onClick={() => props.setDisplayAddTag(false)}/>
              </div>
            </div>
            <div className="todo__add-content regular">
              Ajouter un tag
              <input
                type="text"
                onChange={handleOnChangeInputValue}
                ref={inputRef}
                value={tag}
                className="input-form input-form__signIn"
                id=""
              />
            </div>
            <div className="buttons">
              <button className="button button-valid" onClick={handleOnClickValider}>
                Ajouter Tag
              </button>
              <button className="button button-secondary" onClick={HandleOnClickReset}>R??initialiser</button>
            </div>
          </>
        )}
        {tagAdded && (
          <div className="tagAdded stress">Tag ajout?? avec succ??s !</div>
        )}
      </div>
    </div>
  );
}

export default AddTags;
