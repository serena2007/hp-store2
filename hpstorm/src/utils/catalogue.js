export const CATEGORIES = [
  { valeur: "pc-portables", libelle: "PC portables" },
  { valeur: "pc-bureau", libelle: "PC de bureau" },
  { valeur: "imprimantes", libelle: "Imprimantes" },
  { valeur: "accessoires", libelle: "Accessoires" },
];

export const USAGES = [
  { valeur: "maison", libelle: "Maison" },
  { valeur: "pro", libelle: "Professionnel" },
  { valeur: "gaming", libelle: "Gaming" },
];

export const SEUIL_STOCK_FAIBLE = 5;

// Les clés du JSON sont sans accent : on les transforme pour l'affichage
const LIBELLES_CARACTERISTIQUES = {
  processeur: "Processeur",
  ram: "Mémoire (RAM)",
  stockage: "Stockage",
  ecran: "Écran",
  "carte-graphique": "Carte graphique",
  systeme: "Système d'exploitation",
  autonomie: "Autonomie",
  connectique: "Connectique",
  resolution: "Résolution",
  couleur: "Couleur",
  technologie: "Technologie",
};

export function libelleCaracteristique(cle) {
  if (LIBELLES_CARACTERISTIQUES[cle]) return LIBELLES_CARACTERISTIQUES[cle];
  const texte = cle.replace(/[-_]/g, " ");
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}

export function libelleUsage(usage) {
  return [].concat(usage)
    .map((u) => USAGES.find((x) => x.valeur === u)?.libelle ?? u)
    .join(", ");
}

// "Écran" et "ecran" doivent donner le même résultat
export function normaliser(texte) {
  return String(texte).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// f = { q, categorie, usage, min, max, dispo, tri } (toutes des chaînes, comme dans l'URL)
export function filtrerEtTrier(produits, f) {
  const recherche = normaliser(f.q);
  const min = parseFloat(f.min);
  const max = parseFloat(f.max);

  const resultat = produits.filter((p) => {
    if (recherche && !normaliser(`${p.nom} ${p.reference}`).includes(recherche)) return false;
    if (f.categorie && p.categorie !== f.categorie) return false;
    if (f.usage && ![].concat(p.usage).includes(f.usage)) return false;
    if (!Number.isNaN(min) && p.prix < min) return false;
    if (!Number.isNaN(max) && p.prix > max) return false;
    if (f.dispo === "1" && p.stock <= 0) return false;
    return true;
  });

  if (f.tri === "prix-asc") resultat.sort((a, b) => a.prix - b.prix);
  else if (f.tri === "prix-desc") resultat.sort((a, b) => b.prix - a.prix);
  else if (f.tri === "nom") resultat.sort((a, b) => a.nom.localeCompare(b.nom, "fr"));

  return resultat;
}