import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
 
const CreateClient = () => { 
  const [client, setClient] = useState({ nom: "", adresse: "", tel: "" }); 
  const navigate = useNavigate(); 
 
  const handleCreate = async () => { 
    await axios.post("http://localhost:3002/clients", client); //ajout client 
    navigate("/clients", { replace: true }); //après l’ajout retour à la liste 
  }; 
 
  return ( 
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white text-center">
          <h2 className="mb-0">Créer un nouveau client</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label fw-bold">Nom du client :</label>
              <input
                type="text"
                className="form-control"
                value={client.nom}
                onChange={(e) => setClient({ ...client, nom: e.target.value })}
                placeholder="Entrez le nom"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Adresse :</label>
              <input
                type="text"
                className="form-control"
                value={client.adresse}
                onChange={(e) => setClient({ ...client, adresse: e.target.value })}
                placeholder="Entrez l'adresse"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Téléphone :</label>
              <input
                type="text"
                className="form-control"
                value={client.tel}
                onChange={(e) => setClient({ ...client, tel: e.target.value })}
                placeholder="Entrez le numéro de téléphone"
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleCreate}
                className="btn btn-success px-4 shadow-sm"
              >
                <i className="bi bi-check-circle"></i> Créer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ); 
}; 
export default CreateClient;