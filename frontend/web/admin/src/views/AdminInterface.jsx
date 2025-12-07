import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMatieres } from "../viewmodels/useMatieres";
import { useUsers } from "../viewmodels/useUsers";
import Modal from "../components/Modal";
import { Matiere } from "../models/Matiere";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { FiEdit, FiTrash2, FiPlus, FiUsers } from "react-icons/fi";

const AdminInterface = () => {
  const navigate = useNavigate();
  const { matieres, saveMatiere, deleteMatiere } = useMatieres();
  const { users } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(new Matiere());
  const [editId, setEditId] = useState(null);

  const [showAbonnes, setShowAbonnes] = useState(false);
  const [abonnesParMatiere, setAbonnesParMatiere] = useState({});

  // Calculer le nombre d'abonnés par matière
  useEffect(() => {
    const map = {};
    matieres.forEach((matiere) => {
      map[matiere.titre] = users.filter((u) =>
        u.abonnes && u.abonnes.includes(matiere.titre)
      );
    });
    setAbonnesParMatiere(map);
  }, [matieres, users]);

  const openModal = (matiere = null) => {
    if (matiere) {
      setCurrent({ ...matiere });
      setEditId(matiere.id);
    } else {
      setCurrent(new Matiere());
      setEditId(null);
    }
    setShowModal(true);
  };

  const save = async () => {
    await saveMatiere(current, editId);
    setShowModal(false);
  };

  return (
    <div className="admin-interface">
      <Navbar />

      <h1>Gestion des matières</h1>

      {/* Bouton Liste des abonnés à droite sous le titre */}
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => setShowAbonnes(true)}
          style={{
            padding: "8px 12px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <FiUsers /> Liste des abonnés
        </button>
      </div>

      {/* Bouton ajouter matière */}
      <button className="add-btn" onClick={() => openModal()}>
        <FiPlus /> Ajouter matière
      </button>

      <div className="container">
        {matieres.map((m) => (
          <Card
            key={m.id}
            onClick={() => navigate(`/cours/${encodeURIComponent(m.titre)}`)}
            style={{ cursor: "pointer" }}
          >
            <h3 className="card-title">{m.titre}</h3>
            <p className="card-desc">{m.description}</p>
            <p className="card-category">{m.category}</p>
            <p className="card-prix">{m.prix} DT</p>

            <div className="btns">
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(m);
                }}
              >
                <FiEdit /> Modifier
              </button>

              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMatiere(m.id);
                }}
              >
                <FiTrash2 /> Supprimer
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal pour ajouter/modifier matière */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>{editId ? "Modifier" : "Ajouter"} Matière</h2>
          <input
            placeholder="Titre"
            value={current.titre}
            onChange={(e) => setCurrent({ ...current, titre: e.target.value })}
          />
          <input
            placeholder="Description"
            value={current.description}
            onChange={(e) =>
              setCurrent({ ...current, description: e.target.value })
            }
          />
          <input
            placeholder="Catégorie"
            value={current.category}
            onChange={(e) =>
              setCurrent({ ...current, category: e.target.value })
            }
          />
          <input
            placeholder="Prix"
            type="number"
            value={current.prix}
            onChange={(e) => setCurrent({ ...current, prix: e.target.value })}
          />
          <button onClick={save}>{editId ? "Modifier" : "Ajouter"}</button>
        </Modal>
      )}

      {/* Modal pour liste des abonnés */}
      {showAbonnes && (
        <Modal onClose={() => setShowAbonnes(false)}>
          <h2>Liste des abonnés par matière</h2>
          {matieres.map((m) => (
            <div key={m.id} style={{ marginBottom: "15px" }}>
              <h3>{m.titre} ({abonnesParMatiere[m.titre]?.length || 0})</h3>
              <ul>
                {abonnesParMatiere[m.titre]?.map((u) => (
                  <li key={u.id}>
                    {u.prenom} {u.nom} - {u.email}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
};

export default AdminInterface;
