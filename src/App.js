import { useState, createContext, useMemo } from "react";
import Card from "./components/Card";
import FormContainer from "./components/FormContainer";

export const CardContext = createContext({
  cardDetails: {},
  setCardDetails: () => {},
});

function App() {
  const [cardDetails, setCardDetails] = useState({
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
      filename: "",
      position: {
        top: 0,
        left: 0,
      },
      scale: 120,
    },
  });
  const context = useMemo(
    () => ({ cardDetails, setCardDetails }),
    [cardDetails]
  );

  // TO DO: useEffect for mounting that reads localStorage for saved and last
  // modified character and updates cardState appropriately

  return (
    <div className="App">
      <header>
        <h1 className="heading">L5R Character Card Generator</h1>
      </header>

      <main>
        <div className="card-form">
          <CardContext.Provider value={context}>
            <Card />
            <FormContainer />
          </CardContext.Provider>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
