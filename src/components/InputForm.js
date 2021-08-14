import { Form } from "semantic-ui-react";

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

function InputForm({ cardState, setCardState }) {
  const {
    name,
    nameTitle,
    clan,
    experienced,
    expLevel,
    titles,
    keywords,
    quote,
  } = cardState;

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

  // update internal form state
  const changeHandler = (e, { name, value, checked }, index) => {
    const data = { ...cardState };

    if (typeof index === "number") {
      data[name][index] = value;
    } else if (typeof checked === "boolean") {
      data[name] = checked;
    } else {
      data[name] = value;
    }

    setCardState(data);
  };

  // send changes up to the parent to give access to Card
  const updateHandler = () => {
    console.log("button was clicked");
  };

  return (
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
          <textarea name="quote" id="quote" value={cardState.quote}></textarea>
        </label>
      </fieldset>

      <button type="button">Save Card</button>
    </form>
    // // <section className="form-container">
    // <Form size="small" onSubmit={updateHandler}>
    //   <Form.Group widths="equal">
    //     <Form.Input
    //       fluid
    //       size="mini"
    //       name="name"
    //       label="Name (Family, Given)"
    //       value={name}
    //       onChange={changeHandler}
    //     />
    //     <Form.Input
    //       fluid
    //       size="mini"
    //       name="nameTitle"
    //       label="Title (Optional)"
    //       value={nameTitle}
    //       onChange={changeHandler}
    //     />
    //   </Form.Group>
    //   <Form.Group inline>
    //     <Form.Select
    //       // fluid
    //       size="mini"
    //       search
    //       name="clan"
    //       label="Clan"
    //       options={clanOptions}
    //       value={clan}
    //       onChange={changeHandler}
    //     />
    //     <Form.Checkbox
    //       name="experienced"
    //       label="Experienced?"
    //       checked={experienced}
    //       onChange={changeHandler}
    //     />
    //     <Form.Select
    //       compact
    //       size="mini"
    //       name="expLevel"
    //       options={[
    //         { text: "1", value: "1" },
    //         { text: "2", value: "2" },
    //         { text: "3", value: "3" },
    //       ]}
    //       value={expLevel}
    //       onChange={changeHandler}
    //     />
    //   </Form.Group>
    //   <Form.Group widths="equal">
    //     <Form.Input
    //       fluid
    //       size="mini"
    //       name="titles"
    //       label="Title 1"
    //       value={titles[0]}
    //       onChange={(e, data) => changeHandler(e, data, 0)}
    //     />
    //     <Form.Input
    //       fluid
    //       size="mini"
    //       name="titles"
    //       label="Title 2"
    //       value={titles[1]}
    //       onChange={(e, data) => changeHandler(e, data, 1)}
    //     />
    //     <Form.Input
    //       fluid
    //       size="mini"
    //       name="titles"
    //       label="Title 3"
    //       value={titles[2]}
    //       onChange={(e, data) => changeHandler(e, data, 2)}
    //     />
    //   </Form.Group>
    //   <Form.Group widths="equal">
    //     <Form.Input
    //       fluid
    //       size="mini"
    //       name="keywords"
    //       label="Keyword"
    //       value={keywords[0]}
    //       onChange={(e, data) => changeHandler(e, data, 0)}
    //     />
    //     <Form.Input
    //       fluid
    //       size="mini"
    //       name="keywords"
    //       label="Keyword"
    //       value={keywords[1]}
    //       onChange={(e, data) => changeHandler(e, data, 1)}
    //     />
    //     <Form.Input
    //       fluid
    //       size="mini"
    //       name="keywords"
    //       label="Keyword"
    //       value={keywords[2]}
    //       onChange={(e, data) => changeHandler(e, data, 2)}
    //     />
    //   </Form.Group>
    //   <Form.TextArea
    //     fluid
    //     name="quote"
    //     label="Quote (Optional)"
    //     value={quote}
    //     onChange={changeHandler}
    //   />
    //   {/* upload image */}
    //   {/* image edit controls? scaling, transform? */}
    //   {/* try croppie library */}
    //   {/* <Form.Button>Update</Form.Button> */}
    // </Form>
    // // </section>
  );
}

export default InputForm;
