import CardPhoto from "./CardPhoto";

function Card({ cardState }) {
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

  const keywordsList = keywords.map((keyword, index) => (
    <li key={index}>{keyword}</li>
  ));

  const titlesString = titles.join(` | `);

  const nameScrollText = () => {
    return !nameTitle ? (
      <h2 className="card__name-banner-text">{name}</h2>
    ) : (
      <>
        <h2 className="card__name-banner-text two-lines__main">{name}</h2>
        <h3 className="card__name-banner-text two-lines__sub">{nameTitle}</h3>
      </>
    );
  };

  return (
    <section className={clan !== "unaligned" ? `card ${clan}` : "card"}>
      {/* name banner section */}
      <div className="card__name-banner">
        <div className="card__name-banner-end card__name-banner-end--left"></div>
        <div className="card__name-banner-backdrop">{nameScrollText()}</div>
        <div className="card__name-banner-end card__name-banner-end--right"></div>
      </div>

      {/* image & status banner section */}
      <CardPhoto cardState={cardState}>
        <div className="card__status-banner">
          <div className="card__status-banner-backdrop"></div>
        </div>
      </CardPhoto>

      {/* scroll section */}
      <div className="card__scroll">
        <div className="card__scroll-end card__scroll-end--top">
          <div className="card__scroll-end-wraps card__scroll-end-wraps--outer"></div>
          <div className="card__scroll-end-foil card__scroll-end-foil--skinny"></div>
          <div className="card__scroll-end-underlay"></div>
          <div className="card__scroll-end-foil"></div>
          <div className="card__scroll-end-wraps card__scroll-end-wraps--middle"></div>
          <div className="card__scroll-end-foil"></div>
          <div className="card__scroll-end-underlay"></div>
          <div className="card__scroll-end-foil card__scroll-end-foil--skinny"></div>
          <div className="card__scroll-end-wraps card__scroll-end-wraps--outer"></div>
        </div>
        <div className="card__scroll-backdrop">
          <div className="card__scroll-inner-text">
            <h3 className="card__scroll-heading-text">
              {experienced
                ? `Experienced${
                    (expLevel > 1 && ` ${expLevel}`) || ""
                  } | ${titlesString}`
                : titlesString}
            </h3>
            <ul className="card__scroll-list">{keywordsList}</ul>
            <p className="card__scroll-quote">{quote}</p>
          </div>
        </div>
        <div className="card__scroll-end card__scroll-end--bottom">
          <div className="card__scroll-end-wraps card__scroll-end-wraps--outer"></div>
          <div className="card__scroll-end-foil card__scroll-end-foil--skinny"></div>
          <div className="card__scroll-end-underlay"></div>
          <div className="card__scroll-end-foil"></div>
          <div className="card__scroll-end-wraps card__scroll-end-wraps--middle"></div>
          <div className="card__scroll-end-foil"></div>
          <div className="card__scroll-end-underlay"></div>
          <div className="card__scroll-end-foil card__scroll-end-foil--skinny"></div>
          <div className="card__scroll-end-wraps card__scroll-end-wraps--outer"></div>
        </div>
      </div>
    </section>
  );
}

export default Card;
