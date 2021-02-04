import { Button } from "semantic-ui-react";

function ImageUpload() {
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
          />
          Choose a file
        </Button>
      </form>
    </div>
  );
}

export default ImageUpload;
