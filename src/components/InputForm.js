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
    // <section className="form-container">
    <Form size="small" onSubmit={updateHandler}>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          size="mini"
          name="name"
          label="Name (Family, Given)"
          value={name}
          onChange={changeHandler}
        />
        <Form.Input
          fluid
          size="mini"
          name="nameTitle"
          label="Title (Optional)"
          value={nameTitle}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group inline>
        <Form.Select
          // fluid
          size="mini"
          search
          name="clan"
          label="Clan"
          options={clanOptions}
          value={clan}
          onChange={changeHandler}
        />
        <Form.Checkbox
          name="experienced"
          label="Experienced?"
          checked={experienced}
          onChange={changeHandler}
        />
        <Form.Select
          compact
          size="mini"
          name="expLevel"
          options={[
            { text: "1", value: "1" },
            { text: "2", value: "2" },
            { text: "3", value: "3" },
          ]}
          value={expLevel}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          size="mini"
          name="titles"
          label="Title 1"
          value={titles[0]}
          onChange={(e, data) => changeHandler(e, data, 0)}
        />
        <Form.Input
          fluid
          size="mini"
          name="titles"
          label="Title 2"
          value={titles[1]}
          onChange={(e, data) => changeHandler(e, data, 1)}
        />
        <Form.Input
          fluid
          size="mini"
          name="titles"
          label="Title 3"
          value={titles[2]}
          onChange={(e, data) => changeHandler(e, data, 2)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          size="mini"
          name="keywords"
          label="Keyword"
          value={keywords[0]}
          onChange={(e, data) => changeHandler(e, data, 0)}
        />
        <Form.Input
          fluid
          size="mini"
          name="keywords"
          label="Keyword"
          value={keywords[1]}
          onChange={(e, data) => changeHandler(e, data, 1)}
        />
        <Form.Input
          fluid
          size="mini"
          name="keywords"
          label="Keyword"
          value={keywords[2]}
          onChange={(e, data) => changeHandler(e, data, 2)}
        />
      </Form.Group>
      <Form.TextArea
        fluid
        name="quote"
        label="Quote (Optional)"
        value={quote}
        onChange={changeHandler}
      />
      {/* upload image */}
      {/* image edit controls? scaling, transform? */}
      {/* try croppie library */}
      {/* <Form.Button>Update</Form.Button> */}
    </Form>
    // </section>
  );
}

export default InputForm;
