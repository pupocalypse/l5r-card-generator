import { useContext } from "react";
import { CardContext } from "../App";

function CardPhoto({ cardState, children }) {
  const { cardDetails } = useContext(CardContext);
  if (cardDetails?.photo?.cropped) {
    const photoStyle = { backgroundImage: `url(${cardDetails.photo.cropped})` };

    return (
      <div className="card__image" style={photoStyle}>
        {children}
      </div>
    );
  }

  return <div className="card__image">{children}</div>;
}

export default CardPhoto;
