import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); // Définit type sur null par défaut
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage par type, pas de tri par date
  const filteredEvents = (data?.events || []).filter((event) => !type || event.type === type);

  // Pagination
  const totalEvents = filteredEvents.length;
  const pageNumber = Math.ceil(totalEvents / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + PER_PAGE);

  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialise à la première page lorsque le type change
    setType(evtType || null); // Utilise null si evtType est vide
  };

  return (
    <>
      {error && <div>Une erreur s&apos;est produite : {error.message}</div>}
      {data === null ? (
        <div>Chargement...</div>
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={[...new Set(data?.events.map((event) => event.type))]} // Assurez-vous que cette ligne fonctionne correctement
            onChange={(value) => changeType(value || null)}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)} // Affiche la date de l'événement
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {/* Affichage des numéros de page */}
            {[...Array(pageNumber)].map((_, index) => (
              <a 
                key={`page-${index + 1}`} 
                href="#events" 
                onClick={() => setCurrentPage(index + 1)} 
                className={currentPage === index + 1 ? 'active' : ''} // Optionnel : pour styliser la page active
              >
                {index + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;