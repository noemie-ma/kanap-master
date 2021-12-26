const priceTotal = document.getElementById("priceTotal");
const panier = JSON.parse(localStorage.getItem("panier")) || []; // Récupérer le panier du localStorage et le parse OU si le panier est vide créer un tableau vide
let total = 0; // Créer une variable "Total" qui a pour valeur 0

// Créer une boucle forEach pour affiche le produit et ses otpions sélectionnés sur la page d'accueil
panier.forEach(function (product) {
  fetch("http://127.0.0.1:3000/api/products" + product._id)
    .then((response) => response.json())
    .then((result) => {
      const div = document.createElement("div");
      const clear = document.getElementById("clear");
      div.id = product._id;
      div.innerHTML = `
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
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
      `;
      containerHtml.appendChild(div);
    });

    controle.log();
});
