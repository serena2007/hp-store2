import { Link } from "react-router-dom";

export default function NonTrouve() {
  return (
    <>
      <h1>Page introuvable</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/" className="bouton">Retour à l'accueil</Link>
    </>
  );
}