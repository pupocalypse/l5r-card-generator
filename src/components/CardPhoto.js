function CardPhoto({ cardState, children }) {
  if (cardState.photo) {
    const photoStyle = { backgroundImage: `url(${cardState.photo})` };

    return (
      <div class="card__image" style={photoStyle}>
        {children}
      </div>
    );
  }

  return <div class="card__image">{children}</div>;
}

export default CardPhoto;
