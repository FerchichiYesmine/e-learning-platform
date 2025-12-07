import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCours } from "../viewmodels/useCours";
import Modal from "../components/Modal";
import { Cours } from "../models/Cours";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { FiEdit, FiTrash2, FiPlus, FiBarChart2 } from "react-icons/fi";
import { db } from "../api/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const CoursList = () => {
  const { matiereTitre } = useParams();
  const { cours, saveCours, deleteCours } = useCours(matiereTitre);
  const [showModal, setShowModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [current, setCurrent] = useState(new Cours());
  const [editId, setEditId] = useState(null);
  const [statsData, setStatsData] = useState([]);

  const openModal = (c = null) => {
    if (c) {
      setCurrent({ ...c });
      setEditId(c.id);
    } else {
      setCurrent(new Cours("", "", "", matiereTitre));
      setEditId(null);
    }
    setShowModal(true);
  };

  const save = async () => {
    await saveCours(current, editId);
    setShowModal(false);
  };

  // Récupérer les statistiques dynamiques
  const fetchStats = async () => {
    const newStats = [];

    for (let c of cours) {
      // Nombre de consultations
      const consultQuery = query(
        collection(db, "consultation"),
        where("cours_id", "==", c.id)
      );
      const consultSnapshot = await getDocs(consultQuery);
      const consultCount = consultSnapshot.size;

      // Nombre de cours terminés
      const terminesQuery = query(
        collection(db, "cours_termines"),
        where("cours_id", "==", c.id)
      );
      const terminesSnapshot = await getDocs(terminesQuery);
      const terminesCount = terminesSnapshot.size;

      const pourcentage = consultCount ? Math.round((terminesCount / consultCount) * 100) : 0;

      newStats.push({
        titre: c.titre,
        consultes: consultCount,
        termines: terminesCount,
        pourcentage,
      });
    }

    setStatsData(newStats);
    setShowStats(true);
  };

  return (
    <div className="admin-interface">
      <Navbar />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Cours pour {matiereTitre}</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="add-btn"
            onClick={() => openModal()}
            style={{ fontSize: "20px", padding: "5px 10px" }}
          >
            <FiPlus />
          </button>
          <button
            onClick={fetchStats}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <FiBarChart2 /> Statistiques
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: "20px" }}>
        {cours.map((c) => (
          <Card key={c.id}>
            <h3 className="card-title">{c.titre}</h3>
            <p className="card-desc">{c.description}</p>
            {c.image && <img src={c.image} alt={c.titre} />}
            <div className="btns">
              <button className="edit-btn" onClick={() => openModal(c)}>
                <FiEdit /> Modifier
              </button>
              <button className="delete-btn" onClick={() => deleteCours(c.id)}>
                <FiTrash2 /> Supprimer
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Ajouter/Modifier */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>{editId ? "Modifier" : "Ajouter"} Cours</h2>
          <input
            placeholder="Titre"
            value={current.titre}
            onChange={(e) => setCurrent({ ...current, titre: e.target.value })}
          />
          <input
            placeholder="Description"
            value={current.description}
            onChange={(e) => setCurrent({ ...current, description: e.target.value })}
          />
          <input
            placeholder="Image URL"
            value={current.image}
            onChange={(e) => setCurrent({ ...current, image: e.target.value })}
          />
          <button onClick={save}>{editId ? "Modifier" : "Ajouter"}</button>
        </Modal>
      )}

      {/* Modal Statistiques */}
      {showStats && (
        <Modal onClose={() => setShowStats(false)}>
          <h2>Statistiques des cours</h2>
          {statsData.map((s, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <h3>{s.titre}</h3>
              <p>
                Consultées: {s.consultes} | Terminées: {s.termines} ({s.pourcentage}%)
              </p>
              <div
                style={{
                  backgroundColor: "#eee",
                  width: "100%",
                  height: "20px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${s.pourcentage}%`,
                    height: "100%",
                    backgroundColor:
                      s.pourcentage > 70
                        ? "#28a745"
                        : s.pourcentage > 40
                        ? "#ffc107"
                        : "#dc3545",
                    transition: "width 0.5s",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
};

export default CoursList;
