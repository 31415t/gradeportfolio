import React from "react"; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; 
//importation des composants 
import Header from "./components/header";
import Footer from "./components/footer";
import ClientList from "./components/ClientsList"; 
import CreateClient from "./components/CreateClient"; 
import ClientDetails from "./components/ClientsDetails"; 
import UpdateClient from "./components/UpdateClient"; 
const App = () => { 
return ( 
<Router>
<Header /> 
<Routes> 
<Route path="*" element={<Navigate to="/clients" replace />} /> 
<Route path="/clients" element={<ClientList />} />
<Route path="/clients/create" element={<CreateClient />} /> 
<Route path="/clients/:id" element={<ClientDetails />} /> 
<Route path="/clients/:id/update" element={<UpdateClient />} /> 
</Routes> 
<Footer />
</Router> 
); 
}; 
export default App;