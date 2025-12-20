import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ClientList = () => {
  const [clients, setClients] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3002/clients");
    setClients(response.data); // chargement du résultat de la requête
  };

  useEffect(() => {
    fetchData();
  }, []); // lancer la fonction fetchData une seule fois au premier render

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3002/clients/${id}`);
    fetchData();
  }; // axios.delete pour supprimer le client identifié par id

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary fw-bold">
        Liste des clients
      </h1>

      <div className="d-flex justify-content-center mb-3">
        <Link to={`/clients/create`}>
          <button className="btn btn-success btn-lg shadow-sm">
            <i className="bi bi-person-plus"></i> Ajouter
          </button>
        </Link>
      </div>

      <table className="table table-bordered table-hover text-center align-middle shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Tel</th>
            <th>Opérations</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <Link
                  to={`/clients/${client.id}`}
                  className="text-decoration-none fw-semibold text-dark"
                >
                  {client.nom}
                </Link>
              </td>
              <td>{client.adresse}</td>
              <td>{client.tel}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <Link to={`/clients/${client.id}/update`}>
                    <button className="btn btn-warning btn-sm">
                      <i className="bi bi-pencil-square"></i> Modifier
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-trash"></i> Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ClientList;
