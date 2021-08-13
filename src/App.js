import { useState } from "react";
import Card from "./components/Card";
// import InputForm from "./components/InputForm";
import FormContainer from "./components/FormContainer";

const clanOptions = [
  { text: "Crab", value: "crab" },
  { text: "Crane", value: "crane" },
  { text: "Dragon", value: "dragon" },
  { text: "Lion", value: "lion" },
  { text: "Mantis", value: "mantis" },
  { text: "Phoenix", value: "phoenix" },
  { text: "Scorpion", value: "scorpion" },
  { text: "Spider", value: "spider" },
  { text: "Unicorn", value: "unicorn" },
  { text: "Unaligned", value: "unaligned" },
];

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

  const selectOptionsClans = clanOptions.map((clan) => {
    return (
      <option
        value={clan.value}
        selected={clan.text === "Unaligned" ? true : false}
      >
        {clan.text}
      </option>
    );
  });

  return (
    <main className="App">
      <h1 className="heading">L5R Character Card Generator</h1>
      <Card cardState={cardState} />
      {/* <InputForm cardState={cardState} setCardState={setCardState} /> */}
      <section className="form-container">
        {/* <FormContainer cardState={cardState} setCardState={setCardState} /> */}
        <nav className="form-container__nav">
          <button className="form-container__tab">Details</button>
          <button className="form-container__tab">Upload Artwork</button>
          <button className="form-container__tab">Collection</button>
        </nav>

        <form className="form">
          <fieldset>
            <label htmlFor="name">
              <span>
                Name <em>(Family, Given)</em>
              </span>
              <input type="text" name="name" id="name" value={cardState.name} />
            </label>
            <label htmlFor="nameTitle">
              <span>
                Title <em>(Optional)</em>
              </span>
              <input
                type="text"
                name="nameTitle"
                id="nameTitle"
                value={cardState.nameTitle}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="clan">
              <span>Clan</span>
              <select name="clan" id="clan">
                {selectOptionsClans}
              </select>
            </label>

            <label htmlFor="experienced">
              <input
                type="checkbox"
                name="experienced"
                id="experienced"
                value={cardState.experienced}
              />
              <span>Experienced?</span>
            </label>

            <label htmlFor="expLevel">
              <select
                name="expLevel"
                id="expLevel"
                disabled={!cardState.experienced}
              >
                <option value={cardState.expLevel}>1</option>
                <option value={cardState.expLevel}>2</option>
                <option value={cardState.expLevel}>3</option>
              </select>
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="titles0">
              <span>Title 1</span>
              <input
                type="text"
                name="titles"
                id="titles0"
                value={cardState.titles[0]}
              />
            </label>
            <label htmlFor="titles1">
              <span>Title 2</span>
              <input
                type="text"
                name="titles"
                id="titles1"
                value={cardState.titles[1]}
              />
            </label>
            <label htmlFor="titles2">
              <span>Title 3</span>
              <input
                type="text"
                name="titles"
                id="titles2"
                value={cardState.titles[2]}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="keywords0">
              <span>Keyword</span>
              <input
                type="text"
                name="keywords"
                id="keywords0"
                value={cardState.keywords[0]}
              />
            </label>
            <label htmlFor="keywords1">
              <span>Keyword</span>
              <input
                type="text"
                name="keywords"
                id="keywords1"
                value={cardState.keywords[1]}
              />
            </label>
            <label htmlFor="keywords2">
              <span>Keyword</span>
              <input
                type="text"
                name="keywords"
                id="keywords2"
                value={cardState.keywords[2]}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="quote">
              <textarea
                name="quote"
                id="quote"
                value={cardState.quote}
              ></textarea>
            </label>
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default App;
