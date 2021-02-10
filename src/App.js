import { useState } from "react";
import Card from "./components/Card";
// import InputForm from "./components/InputForm";
import FormContainer from "./components/FormContainer";

function App() {
  const [cardState, setCardState] = useState({
    name: "Lastname Firstname",
    nameTitle: "",
    clan: "unaligned",
    experienced: false,
    expLevel: "1",
    titles: ["Title 1", "Title 2", "Title 3"],
    keywords: ["Keyword", "Keyword", "Keyword"],
    quote:
      "Optional quote from this character that probably takes up a couple of lines and maybe, just maybe, a third one as well?",
    photo: {
      original: null,
      cropped: null,
    },
  });

  return (
    <main className="App">
      <h1 className="heading">Visual Layout Test</h1>
      <Card cardState={cardState} />
      {/* <InputForm cardState={cardState} setCardState={setCardState} /> */}
      <section className="form-container">
        <FormContainer cardState={cardState} setCardState={setCardState} />
      </section>
    </main>
  );
}

export default App;
