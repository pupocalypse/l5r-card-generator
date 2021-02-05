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
      <h2 class="card__name-banner-text">{name}</h2>
    ) : (
      <>
        <h2 class="card__name-banner-text two-lines__main">{name}</h2>
        <h3 class="card__name-banner-text two-lines__sub">{nameTitle}</h3>
      </>
    );
  };

  return (
    <section class={clan !== "unaligned" ? `card ${clan}` : "card"}>
      {/* name banner section */}
      <div class="card__name-banner">
        <div class="card__name-banner-end card__name-banner-end--left"></div>
        <div className="card__name-banner-backdrop">{nameScrollText()}</div>
        <div class="card__name-banner-end card__name-banner-end--right"></div>
      </div>

      {/* image & status banner section */}
      <CardPhoto cardState={cardState}>
        <div class="card__status-banner">
          <div className="card__status-banner-backdrop"></div>
        </div>
      </CardPhoto>

      {/* scroll section */}
      <div class="card__scroll">
        <div class="card__scroll-end card__scroll-end--top">
          <div class="card__scroll-end-wraps card__scroll-end-wraps--outer"></div>
          <div class="card__scroll-end-foil card__scroll-end-foil--skinny"></div>
          <div class="card__scroll-end-underlay"></div>
          <div class="card__scroll-end-foil"></div>
          <div class="card__scroll-end-wraps card__scroll-end-wraps--middle"></div>
          <div class="card__scroll-end-foil"></div>
          <div class="card__scroll-end-underlay"></div>
          <div class="card__scroll-end-foil card__scroll-end-foil--skinny"></div>
          <div class="card__scroll-end-wraps card__scroll-end-wraps--outer"></div>
        </div>
        <div className="card__scroll-backdrop">
          <div class="card__scroll-inner-text">
            <h3 class="card__scroll-heading-text">
              {experienced
                ? `Experienced${
                    (expLevel > 1 && ` ${expLevel}`) || ""
                  } | ${titlesString}`
                : titlesString}
            </h3>
            <ul class="card__scroll-list">{keywordsList}</ul>
            <p class="card__scroll-quote">{quote}</p>
          </div>
        </div>
        <div class="card__scroll-end card__scroll-end--bottom">
          <div class="card__scroll-end-wraps card__scroll-end-wraps--outer"></div>
          <div class="card__scroll-end-foil card__scroll-end-foil--skinny"></div>
          <div class="card__scroll-end-underlay"></div>
          <div class="card__scroll-end-foil"></div>
          <div class="card__scroll-end-wraps card__scroll-end-wraps--middle"></div>
          <div class="card__scroll-end-foil"></div>
          <div class="card__scroll-end-underlay"></div>
          <div class="card__scroll-end-foil card__scroll-end-foil--skinny"></div>
          <div class="card__scroll-end-wraps card__scroll-end-wraps--outer"></div>
        </div>
      </div>
    </section>
  );
}

export default Card;
