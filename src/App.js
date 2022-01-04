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
      original: "",
      cropped: null,
      filename: "",
      position: {
        startX: 0,
        startY: 0,
        newX: 0,
        newY: 0,
      },
    },
  });

  return (
    <div className="App">
      <header>
        <h1 className="heading">L5R Character Card Generator</h1>
      </header>

      <main>
        <div className="card-form">
          <Card cardState={cardState} />
          {/* <section className="form-container"> */}
          <FormContainer cardState={cardState} setCardState={setCardState} />
          {/* <nav className="form-container__nav">
              <button
                className="form-container__tab form-container__tab--active button"
                onClick={setActiveTab}
              >
                Details
              </button>
              <button className="form-container__tab" onClick={setActiveTab}>
                Upload Artwork
              </button>
              <button className="form-container__tab" onClick={setActiveTab}>
                Collection
              </button>
            </nav>
            <InputForm cardState={cardState} setCardState={setCardState} />
          </section> */}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
