// Permet de récuperer l'ID du produit dans l'url (redirection, en gros)
function getParamId() {
  return new URL(location.href).searchParams.get("id");
}

// Fonction qui permet de recuperer le produit afin de l'afficher sur cette page
async function getProduct(productId) {
  return await fetch(`http://127.0.0.1:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((products) => products)
    .catch((error) => {
      alert("PLUS EN STOCK"); // Petite alerte en cas de manque de stock
    });
}

// Remplissage du menu des couleurs disponibles
function colorOptions(product) {
  const productColors = product.colors;
  const productOption = document.getElementById("productOption"); // Les couleurs s'adaptent par rapport au choix du produit sur la page index.html
  productColors.forEach((color) => {
    const optionColor = document.createElement("option");
    optionColor.setAttribute("value", color);
    optionColor.innerHTML = color;
    productOption.appendChild(optionColor);
  });
}

// Fonction pour que la demande ci-dessus s'affiche dans le html de la page product.html
function hydrateProduct(product) {
  document.getElementById("item_img").src = product.imageUrl;
  document.getElementById("title").textContent = product.name;
  document.getElementById("price").textContent = `${product.price / 100}.00 €`;
  document.getElementById("description").textContent = product.description;
  colorOptions(product);
}
