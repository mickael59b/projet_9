import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });

const Form = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    type: '',
    email: '',
    message: ''
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi(); // Appeler l'API fictive
        setSending(false);
        onSuccess(); // Appeler onSuccess si tout s'est bien passé
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder="Nom"
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
          <Field
            placeholder="Prénom"
            label="Prénom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            label="Personel / Entreprise"
            name="type"
            value={formData.type}
            onChange={handleChange}
            type="large"
            titleEmpty
          />
          <Field
            placeholder="Email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="Message"
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
