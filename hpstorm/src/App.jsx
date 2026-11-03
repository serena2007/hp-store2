import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Accueil from "./pages/Accueil.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import Produit from "./pages/Produit.jsx";
import Panier from "./pages/Panier.jsx";
import Commande from "./pages/Commande.jsx";
import NonTrouve from "./pages/NonTrouve.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Accueil />} />
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="produit/:id" element={<Produit />} />
        <Route path="panier" element={<Panier />} />
        <Route path="commande" element={<Commande />} />
        <Route path="*" element={<NonTrouve />} />
      </Route>
    </Routes>
  );
}