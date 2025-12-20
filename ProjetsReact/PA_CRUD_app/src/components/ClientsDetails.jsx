import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
 
const ClientDetails = () => { 
  const { id } = useParams(); 
  const [client, setClient] = useState({}); 
  const navigate = useNavigate(); 
 
  useEffect(() => { 
    const fetchClient = async () => { 
      try { 
        const response = await axios.get(`http://localhost:3002/clients/${id}`); 
        setClient(response.data); 
      } catch (error) { 
        console.error("Erreur de chargement :", error); 
      } 
    }; 
 
    fetchClient(); 
  }, [id]); 
 
  const handleRetour = () => { 
    navigate("/clients"); 
  }; 
 
  return ( 
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0">Détails du client</h2>
        </div>
        <div className="card-body">
          <p className="fw-bold">
            Nom du client : <span className="text-dark">{client.nom}</span>
          </p>
          <p>
            <i className="bi bi-geo-alt-fill text-secondary"></i> Adresse :{" "}
            <span className="text-muted">{client.adresse}</span>
          </p>
          <p>
            <i className="bi bi-telephone-fill text-success"></i> Téléphone :{" "}
            <span className="text-muted">{client.tel}</span>
          </p>
          <div className="text-center mt-4">
            <button onClick={handleRetour} className="btn btn-outline-primary px-4">
              <i className="bi bi-arrow-left-circle"></i> Retour à la liste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientDetails;