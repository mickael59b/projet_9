import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date"; // Assurez-vous que cette fonction est correctement définie et importée

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(), // Ajouter une valeur par défaut pour date
  title,
  label,
  small = false,
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      {imageSrc ? (
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      ) : (
        <div className="EventCard__placeholder">Image non disponible</div>
      )}
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>
      <div className="EventCard__month">{getMonth(date)}</div>
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date), // Garder date comme non obligatoire
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  date: new Date(), // Valeur par défaut pour date
};

export default EventCard;