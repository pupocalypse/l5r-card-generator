import { Tab } from "semantic-ui-react";
import InputForm from "./InputForm";
import ImageUpload from "./ImageUpload";

function FormContainer({ cardState, setCardState }) {
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
          <ImageUpload />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
}

export default FormContainer;
