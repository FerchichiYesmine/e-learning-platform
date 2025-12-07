import { useState, useEffect } from "react";
import { db } from "../api/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  return { users };
};
