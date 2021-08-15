// import { Form } from "semantic-ui-react";

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

  const selectOptionsClans = clanOptions.map((clan, i) => {
    return (
      <option value={clan.value} key={i}>
        {clan.text}
      </option>
    );
  });

  const titlesFields = [0, 1, 2].map((i) => {
    const id = `titles${i}`;
    return (
      <label htmlFor={id} key={i}>
        <span>Title {i + 1}</span>
        <input
          type="text"
          name="titles"
          id={id}
          value={titles[i]}
          onChange={(e, data) => changeHandler(e, i)}
        />
      </label>
    );
  });

  const keywordsFields = [0, 1, 2].map((i) => {
    const id = `keywords${i}`;
    return (
      <label htmlFor={id} key={i}>
        <span>Keyword</span>
        <input
          type="text"
          name="keywords"
          id={id}
          value={keywords[i]}
          onChange={(e, data) => changeHandler(e, i)}
        />
      </label>
    );
  });

  // update internal form state to see changes on card preview
  const changeHandler = (e, index) => {
    const data = { ...cardState };
    // console.log("e.target:", e.target);
    const { name, value, checked } = e.target;
    // console.log("name, value, checked:", name, value, checked);

    if (typeof index === "number") {
      data[name][index] = value;
    } else if (typeof checked === "boolean") {
      data[name] = checked;
    } else {
      data[name] = value;
    }

    setCardState(data);
  };

  // save current card to 'Collection' tab
  const updateHandler = () => {
    console.log("button was clicked");
  };

  return (
    <form className="form" onSubmit={updateHandler}>
      <fieldset>
        <label htmlFor="name">
          <span>
            Name <em>(Family, Given)</em>
          </span>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="nameTitle">
          <span>
            Title <em>(Optional)</em>
          </span>
          <input
            type="text"
            name="nameTitle"
            id="nameTitle"
            value={nameTitle}
            onChange={changeHandler}
          />
        </label>
      </fieldset>

      <fieldset>
        <label htmlFor="clan">
          <span>Clan</span>
          <select name="clan" id="clan" value={clan} onChange={changeHandler}>
            {selectOptionsClans}
          </select>
        </label>

        <label htmlFor="experienced">
          <input
            type="checkbox"
            name="experienced"
            id="experienced"
            value={experienced}
            onChange={changeHandler}
          />
          <span>Experienced?</span>
        </label>

        <label htmlFor="expLevel">
          <span>Exp. Level</span>
          <select
            name="expLevel"
            id="expLevel"
            disabled={!experienced}
            onChange={changeHandler}
          >
            <option value={expLevel}>1</option>
            <option value={expLevel}>2</option>
            <option value={expLevel}>3</option>
          </select>
        </label>
      </fieldset>

      <fieldset>{titlesFields}</fieldset>

      <fieldset>{keywordsFields}</fieldset>

      <fieldset>
        <label htmlFor="quote">
          <textarea
            name="quote"
            id="quote"
            value={quote}
            onChange={changeHandler}
          ></textarea>
        </label>
      </fieldset>

      <button type="button" className="form-container__button">
        Save Card
      </button>
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
