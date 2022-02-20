import { useState } from "react";
import FormNav from "./FormNav";
import InputForm from "./InputForm";
import ImageUpload from "./ImageUpload";

function FormContainer() {
  const [activeTab, setActiveTab] = useState([true, false, false]);
  const [details, upload, collection] = activeTab;

  const clickActiveTab = (_e, index) => {
    let data = activeTab;
    data = data.map((_tab, i) => i === index);
    setActiveTab(data);
  };

  const tabView = () => {
    if (details) {
      // return <InputForm cardState={cardState} setCardState={setCardState} />;
      return <InputForm />;
    } else if (upload) {
      // return <ImageUpload cardState={cardState} setCardState={setCardState} />;
      return <ImageUpload />;
    } else if (collection) {
      return <p>Nothing here yet</p>;
    }
  };

  return (
    <section className="form-container">
      <FormNav activeTab={activeTab} clickActiveTab={clickActiveTab} />
      <div className="form-container__pane">{tabView()}</div>
    </section>
  );
}

export default FormContainer;
