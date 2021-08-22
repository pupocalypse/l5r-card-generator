import { useState, useEffect, useRef } from "react";
import Croppie from "croppie";

function ImageUpload({ cardState, setCardState }) {
  const [croppie, setCroppie] = useState(null);
  const croppieContainer = useRef();
  const options = {
    viewport: {
      width: 168,
      height: 159,
    },
  };

  useEffect(() => {
    const croppieRef = croppieContainer.current;
    const card = { ...cardState };
    const event = () => {
      croppie.result("blob").then((result) => {
        result = URL.createObjectURL(result);
        card.photo.cropped = result;
        setCardState(card);
      });
    };
    if (croppie != null) {
      croppieRef.addEventListener("update", event);
      return () => {
        croppieRef?.removeEventListener("update", event);
      };
    } else if (card.photo.original) {
      addCroppieInstance(card.photo.original);
    }
  }, [cardState, setCardState, croppie]);

  const addCroppieInstance = (photo) => {
    let croppieInstance;
    if (!croppie) {
      croppieInstance = new Croppie(croppieContainer.current, options);
    } else {
      croppieInstance = croppie;
    }
    croppieInstance.bind({ url: photo });
    setCroppie(croppieInstance);
  };

  const changeImage = (e) => {
    const card = { ...cardState };
    card.photo.original = URL.createObjectURL(e.target.files[0]);
    card.photo.cropped = URL.createObjectURL(e.target.files[0]);
    card.photo.filename = e.target.files[0].name;
    setCardState(card);
    addCroppieInstance(card.photo.original);
  };

  const resetImage = (e) => {
    e.preventDefault();
    const card = { ...cardState };
    card.photo.original = null;
    card.photo.cropped = null;
    card.photo.filename = "";
    setCroppie(null);
    setCardState(card);
  };

  return (
    <>
      <div className="img-edit" id="img-edit" ref={croppieContainer}></div>
      <div className="img-upload">
        <form className="img-upload__form">
          <p className="img-upload__file-name">
            {cardState.photo.filename
              ? cardState.photo.filename
              : "no file selected"}
          </p>
          {cardState.photo.original ? (
            ""
          ) : (
            <input
              type="range"
              className="img-upload__input-placeholder"
              step="0.0001"
              min="0.2901"
              max="1.5000"
              value="0.5508"
              disabled
            />
          )}
          <div className="img-upload__buttons-wrapper">
            <label
              className="img-upload__upload-button button"
              htmlFor="file-upload"
            >
              <input
                type="file"
                className="img-upload__input vis-hidden"
                id="file-upload"
                name="file-upload"
                accept="image/*"
                onChange={changeImage}
              />
              Choose a file
            </label>
            <button className="button" onClick={resetImage} type="button">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ImageUpload;
