// import { Tab } from "semantic-ui-react";
import { useState } from "react";
import FormNav from "./FormNav";
import InputForm from "./InputForm";
// import ImageUpload from "./ImageUpload";

function FormContainer({ cardState, setCardState }) {
  const [activeTab, setActiveTab] = useState([true, false, false]);
  const [details, upload, collection] = activeTab;

  const clickActiveTab = (e, index) => {
    let data = activeTab;
    data = data.map((tab, i) => i === index);
    setActiveTab(data);
  };

  const tabView = () => {
    if (details) {
      return <InputForm cardState={cardState} setCardState={setCardState} />;
    } else if (upload) {
      return <p>Nothing here yet</p>;
    } else if (collection) {
      return <p>Nothing here yet</p>;
    }
  };
  // const panes = [
  //   {
  //     menuItem: "Text",
  //     render: () => (
  //       <Tab.Pane attached={false}>
  //         <InputForm cardState={cardState} setCardState={setCardState} />
  //       </Tab.Pane>
  //     ),
  //   },
  //   {
  //     menuItem: "Upload Image",
  //     render: () => (
  //       <Tab.Pane attached={false}>
  //         <h2>Image Uploader goes here</h2>
  //         <ImageUpload cardState={cardState} setCardState={setCardState} />
  //       </Tab.Pane>
  //     ),
  //   },
  // ];

  // return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
  return (
    <section className="form-container">
      <FormNav activeTab={activeTab} clickActiveTab={clickActiveTab} />
      <div className="form-container__pane">{tabView()}</div>
    </section>
  );
}

export default FormContainer;
