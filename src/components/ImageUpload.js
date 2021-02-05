import { Button } from "semantic-ui-react";

function ImageUpload({ cardState, setCardState }) {
  const changeHandler = (e) => {
    const data = { ...cardState };
    data.photo = URL.createObjectURL(e.target.files[0]);
    setCardState(data);
  };

  return (
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
            onChange={changeHandler}
          />
          Choose a file
        </Button>
      </form>
    </div>
  );
}

export default ImageUpload;
