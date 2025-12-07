import { useState, useEffect } from "react";
import { fetchCoursByMatiere, saveCours, deleteCours } from "../api/firebaseService";

export const useCours = (matiereTitre) => {
  const [cours, setCours] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchCoursByMatiere(matiereTitre, setCours);
    return () => unsubscribe();
  }, [matiereTitre]);

  return { cours, saveCours, deleteCours };
};
