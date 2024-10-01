import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Vérifie si data.focus est un tableau et trie les événements du plus ancien au plus récent
  const byDateAsc = Array.isArray(data?.focus)
    ? data.focus.sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date))
    : [];

  // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex < byDateAsc.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000); // Utilisation de setInterval

    return () => clearInterval(interval); // Nettoyage à la désinstallation
  }, [byDateAsc.length]); // Dépendance sur la longueur des événements

  return (
    <div className="SlideCardList">
      {byDateAsc.map((event, idx) => (
        <div key={event.id} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((event, radioIdx) => (
            <input
              key={event.id} // Utilisation de l'ID de l'événement comme clé
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // Vérifie si le bouton radio est sélectionné
              onChange={() => setIndex(radioIdx)} // Met à jour l'index sur changement
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;