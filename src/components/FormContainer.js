import { useEffect, useRef } from "react";
import { Tab } from "semantic-ui-react";
import InputForm from "./InputForm";
import ImageUpload from "./ImageUpload";

// import Croppie from "croppie";

function FormContainer({ cardState, setCardState }) {
  // const croppieContainer = useRef();

  // useEffect(() => {
  //   const options = {};
  //   const croppie = new Croppie(document.getElementById("img-edit"), options);
  // });

  const panes = [
    {
      menuItem: "Text",
      render: () => (
        <Tab.Pane attached={false}>
          <InputForm cardState={cardState} setCardState={setCardState} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Upload Image",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Image Uploader goes here</h2>
          {/* <div
            className="img-edit"
            id="img-edit"
            ref={croppieContainer}
            style={{ width: "50%" }}
          ></div> */}
          {/* {croppieContainer} */}
          <ImageUpload cardState={cardState} setCardState={setCardState} />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
}

export default FormContainer;
