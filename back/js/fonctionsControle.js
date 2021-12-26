// controler la quantité
function controleQuantite(quantite) {
  let valid = true;
  if (quantite < 1 || quantite > 100) {
    valid = false;
    alert("Veuillez choisir une quantite entre 1 et 100! ");
  }
  return valid;
}

function controleColor(color) {
  let valid = true;
  if (color == "") {
    valid = false;
    alert("Veuillez choisir une couleur !");
  }
  return valid;
}
