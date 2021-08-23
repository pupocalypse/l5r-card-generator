const { clanOptions } = require("../js/formData");

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
    const { name, value, checked } = e.target;

    if (typeof index === "number") {
      data[name][index] = value;
    } else if (typeof checked === "boolean") {
      data[name] = checked;
    } else {
      data[name] = value;
    }

    setCardState(data);
  };

  // TO DO: save current card to 'Collection' tab
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
  );
}

export default InputForm;
