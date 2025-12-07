import { db } from "./firebase"; // chemin relatif correct après le déplacement

import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

// Matières
export const fetchMatieres = (callback) => {
  return onSnapshot(collection(db, "matiere"), snapshot => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const saveMatiere = async (matiere, id = null) => {
  if (id) {
    await updateDoc(doc(db, "matiere", id), matiere);
  } else {
    await addDoc(collection(db, "matiere"), matiere);
  }
};

export const deleteMatiere = async (id) => {
  await deleteDoc(doc(db, "matiere", id));
};

// Cours
export const fetchCoursByMatiere = (matiereTitre, callback) => {
  return onSnapshot(collection(db, "cours"), snapshot => {
    const data = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(c => c.matiere === matiereTitre);
    callback(data);
  });
};

export const saveCours = async (cours, id = null) => {
  if (id) {
    await updateDoc(doc(db, "cours", id), cours);
  } else {
    await addDoc(collection(db, "cours"), cours);
  }
};

export const deleteCours = async (id) => {
  await deleteDoc(doc(db, "cours", id));
};
