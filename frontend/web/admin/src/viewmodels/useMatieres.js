import { useState, useEffect } from "react";
import { fetchMatieres, saveMatiere, deleteMatiere } from "../api/firebaseService";

export const useMatieres = () => {
  const [matieres, setMatieres] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchMatieres(setMatieres);
    return () => unsubscribe();
  }, []);

  return { matieres, saveMatiere, deleteMatiere };
};
