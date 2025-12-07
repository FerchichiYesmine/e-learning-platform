import React from "react";
import { useUsers } from "../viewmodels/useUsers";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const UserList = () => {
  const { users } = useUsers();

  const sortedUsers = [...users].sort(
    (a, b) => new Date(a.dateNaissance) - new Date(b.dateNaissance)
  );

  return (
    <div className="admin-interface">
      <Navbar />
      <h1>Liste des utilisateurs</h1>
      <div className="container">
        {sortedUsers.map((u) => (
          <Card key={u.id}>
            <h3 className="card-title">
              {u.prenom} {u.nom}
            </h3>
            <p>Email: {u.email}</p>
            <p>Rôle: {u.role}</p>
            <p>Date de naissance: {u.dateNaissance}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserList;
