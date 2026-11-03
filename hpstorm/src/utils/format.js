const formateurPrix = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export function formatPrix(montant) {
  return formateurPrix.format(montant);
}

// Chemin d'une image de public/images/, correct aussi sur GitHub Pages
export function urlImage(fichier) {
  return `${import.meta.env.BASE_URL}images/${fichier}`;
}