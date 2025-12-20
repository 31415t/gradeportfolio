import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
 
const UpdateClient = () => { 
  const { id } = useParams();//récupération id du client à modifier 
  const [client, setClient] = useState({ nom: '', adresse: '', tel: '' }); 
  const navigate = useNavigate(); 
 
  useEffect(() => { 
    const fetchClient = async () => { 
      const response = await axios.get(`http://localhost:3002/clients/${id}`); 
      setClient(response.data);//récupération infos du client à modifier 
    }; 
 
    fetchClient(); 
  }, [id]); 
 
  const handleUpdate = async () => { 
    await axios.put(`http://localhost:3002/clients/${id}`, client); 
    navigate('/clients', { replace: true });//retour à la liste 
 
  }; 
 
  return ( 
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-warning text-dark text-center">
          <h2 className="mb-0">Mettre à jour le client</h2>
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
                onClick={handleUpdate}
                className="btn btn-warning px-4 shadow-sm"
              >
                <i className="bi bi-pencil-square"></i> Mettre à jour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ); 
}; 
export default UpdateClient;