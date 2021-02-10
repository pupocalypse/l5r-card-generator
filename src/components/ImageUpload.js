import { useState, useEffect, useRef } from "react";
import { Button } from "semantic-ui-react";
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
    const event = () => {
      croppie.result("blob").then((result) => {
        result = URL.createObjectURL(result);
        const data = { ...cardState };
        data.photo.cropped = result;
        setCardState(data);
      });
    };
    if (croppie != null) {
      croppieRef.addEventListener("update", event);
      return () => {
        croppieRef?.removeEventListener("update", event);
      };
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
    const data = { ...cardState };
    data.photo.original = URL.createObjectURL(e.target.files[0]);
    data.photo.cropped = URL.createObjectURL(e.target.files[0]);
    setCardState(data);
    addCroppieInstance(data.photo.original);
  };

  return (
    <>
      <div
        className="img-edit"
        id="img-edit"
        ref={croppieContainer}
        style={{ width: "50%", height: "12rem" }}
      ></div>
      <div className="img-upload">
        <form className="img-upload__form">
          <Button
            as="label"
            htmlFor="file-upload"
            circular
            type="button"
            size="mini"
          >
            <input
              className="img-upload__input"
              type="file"
              id="file-upload"
              name="file-upload"
              accept="image/*"
              onChange={changeImage}
            />
            Choose a file
          </Button>
        </form>
      </div>
    </>
  );
}

export default ImageUpload;
