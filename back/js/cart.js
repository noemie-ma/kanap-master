function getPanier() {
  // Json.parse convertit les donnée au format json qui sont dans le local en objet javascript
  const productCartStorage = JSON.parse(localStorage.getItem("products"));

  // Selection de la classe où le code HTML sera injecté
  let containerPanier = document.querySelector("#cart_items");
  // Selection bouton envoie formulaire
  const submitForm = document.querySelector("#order");
  // Si panier vide
  const cartIsEmpty =
    productCartStorage === null || productCartStorage.length === 0;

  (async () => {
    hydrateCart();
    totalPrice();
    await onSubmitOrderForm();
  })();
}

// Récupère les produits dans le localStorage pour hydrater la page panier
function hydrateCart() {
  let htmlValue = "";

  if (cartIsEmpty) {
    htmlValue = `<article class="cart__item" Le panier est vide </article> `;
  }

  if (!cartIsEmpty) {
    for (i = 0; i < productCartStorage.length; i++) {
      htmlValue =
        htmlValue +
        `
        <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}" />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.color}</p>
          <p>${product.price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : ${product.quantity} </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
        `;
    }
  }
  containerPanier.innerHTML = htmlValue;
}

// Ajoute tous les prix des produits dans le tableau et calcule le prix total (reducer)
function totalPrice() {
  // Nombres d'articles selectionnés dans le tableau
  let getQuantity = [];
  for (let p = 0; p < productCartStorage.length; p++) {
    productCartStorage[p].quantity;
    getQuantity.push(productCartStorage[p].quantity);
  }

  // Tout les prix des produits mis dans un tableau pour être calculé (reducer)
  let getPrice = [];
  for (let p = 0; p < productCartStorage.length; p++) {
    productCartStorage[p].price;
    getPrice.push(productCartStorage[p].price);
  }

  // additionne tous les prix du tableau
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = getPrice.reduce(reducer, 0);

  // Afficher nombre d'articles dans le HTML
  const displayTotalQuantity = `<span id="totalQuantity">
  ${totalQuantity}</span> articles`;
  containerPanier.insertAdjacentHTML("beforeend", displayTotalQuantity);

  // Afficher prix total dans le HTML
  const displayTotalPrice = `<span id="totalPrice">
  ${totalPrice}</span> €`;
  containerPanier.insertAdjacentHTML("beforeend", displayTotalPrice);
}

function cartOrderDetails() {
  let cartOrderDetails = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  };
}
