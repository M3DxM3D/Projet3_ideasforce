import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import "./SubmenuIdeaButton.scss";
import ModifiedIdeaModal from "../../components/ModifiedIdeaModal/ModifiedIdeaModal";

export default function SubmenuIdeaButton({
  setShowSubmenu,
  ideaId,
  setIsIdeaDeleted,
  setIsModifiedIdeaModalOpen,
}) {
  const { userToken } = useContext(AuthContext);
  const [isModifiedIdeaModalOpen, setIsModifiedIdeaModalOpenLocal] =
    useState(false);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    // Charger les idées au montage du composant
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ideas`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setIdeas(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des idées:", error);
      });
  }, [userToken]);

  const handleDeleteIdea = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/ideas/${ideaId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        if (res.affectedRows === 0) {
          console.error("L'idée n'a pas été supprimée");
        } else {
          setIsIdeaDeleted(true);
          setShowSubmenu(false);
          setTimeout(() => {
            setIsIdeaDeleted(false);
          }, 3000);
          // Mettre à jour la liste des idées après la suppression
          setIdeas(ideas.filter((idea) => idea.id !== ideaId));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCloseModal = () => {
    setIsModifiedIdeaModalOpenLocal(false);
    setShowSubmenu(false); // Fermer la modale de sous-menu
  };

  return (
    <>
      <div>
        <ul className="submenu-idea">
          <div onClick={() => setShowSubmenu(false)} aria-hidden="true">
            <i className="fi fi-rr-cross" />
          </div>
          <li
            aria-hidden="true"
            onClick={() => setIsModifiedIdeaModalOpenLocal(true)}
          >
            <i className="fi fi-rr-attribution-pencil" />
            <p>Modifier</p>
          </li>
          <li aria-hidden="true" onClick={handleDeleteIdea}>
            <i className="fi fi-rr-trash" />
            <p>Supprimer</p>
          </li>
        </ul>
      </div>

      {/* Modal de modification d'idée */}
      {isModifiedIdeaModalOpen && (
        <ModifiedIdeaModal
          setIsModifiedIdeaModalOpen={handleCloseModal}
          currentIdea={{ id: ideaId, title: "", description: "" }}
        />
      )}
    </>
  );
}

SubmenuIdeaButton.propTypes = {
  setShowSubmenu: PropTypes.func.isRequired,
  ideaId: PropTypes.number.isRequired,
  setIsIdeaDeleted: PropTypes.func.isRequired,
  setIsModifiedIdeaModalOpen: PropTypes.func.isRequired,
};
