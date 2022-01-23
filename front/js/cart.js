getPanier();

function getPanier() {
  //Récupérer le contenu du localStorage et le parcourir pour afficher les articles
  let tableau = getLocalStorage();
  let htmlValue = "";
  tableau.forEach((product) => {
    htmlValue =
      htmlValue +
      `
        <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}" />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>Couleur : ${product.color}</p>
          <p>Prix : ${product.price} € </p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
        `;
  });

  document.getElementById("cart__items").innerHTML = htmlValue;

  document.querySelectorAll(".itemQuantity").forEach((element) => {
    let oldValue = this.value;
    element.addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();
      // Interception de l'évènement de modification de la quantité totale
      //1/ Controle de la quantité : est bonne si elle est entre 0 et 100
      let valid = controleQuantite(parseInt(this.value));
      //2/ Met à jour l'element dans le local storage
      if (valid) {
        oldValue = this.value;
        updateElementLocalStorage(
          tableau,
          this.closest(".cart__item").dataset.id,
          this.closest(".cart__item").dataset.color,
          this.value
        );
      } else {
        this.value = oldValue;
      }
      //3/ Met à jour les totaux
      totalPrice();
    });
  });
  document.querySelectorAll(".deleteItem").forEach((element) => {
    element.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      //1/ chercher l'element dans le tableau LS et le suuprimer
      let newTable = deleteElementFromTable(
        tableau,
        this.closest(".cart__item").dataset.id,
        this.closest(".cart__item").dataset.color
      );
      //2/ Met à jour local storage
      setLocalStorage(newTable);
      //3/ Supprimer l'element du html
      this.closest(".cart__item").remove();
      //4/ Mettre à jour les totaux le table
      totalPrice();
    });
  });
  totalPrice();

  /* fin du panier */
  /* set de l'objet contact */

  // Récupérer la valeur des champs
  let prenom = document.getElementById("firstName");
  prenom.addEventListener("change", function () {});
  let nom = document.getElementById("lastName");
  nom.addEventListener("change", function () {
    validlastName(this);
  });
  let adresse = document.getElementById("address");
  adresse.addEventListener("change", function () {});
  let ville = document.getElementById("city");
  ville.addEventListener("change", function () {});
  let email = document.getElementById("email");
  email.addEventListener("change", function () {
    validEmail(this);
  });
  /* fin contact */
}
//------ Fonction qui recalcule le total des quantité et du prix
function totalPrice() {
  let cart = getLocalStorage();
  let quantiteTotal = 0;
  let totalPrix = 0;
  cart.forEach((article) => {
    quantiteTotal += parseInt(article.quantite);
    totalPrix += parseFloat(article.price) * parseInt(article.quantite);
  });

  document.getElementById("totalQuantity").innerHTML = quantiteTotal;
  document.getElementById("totalPrice").innerHTML =
    totalPrix; /*Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(totalPrix);*/
}

function deleteElementFromTable(tableau, id, color) {
  let foundElement = -1;
  tableau.forEach((element) => {
    if (element.id == id && element.color == color) {
      foundElement = tableau.indexOf(element);
    }
  });

  tableau.splice(foundElement, 1);
  return tableau;
}
function updateElementLocalStorage(tableau, id, color, quantite) {
  tableau.forEach((element) => {
    if (element.id == id && element.color == color) {
      element.quantite = parseInt(quantite);
    }
  });

  setLocalStorage(tableau);
}

// FORMULAIRE DE RENSEIGNEMENTS
function validlastName(inputfirstName) {
  let firstName = new RegExp(
    "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
    "g"
  );

  let p = inputfirstName.nextElementSibling;

  if (firstName.test(inputfirstName.value)) {
    p.innerHTML = "";
  } else {
    p.innerHTML = "Prénom non valide, veuillez rééssayer";
  }
}

function validlastName(inputlastName) {
  let lastName = new RegExp(
    "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
    "g"
  );

  let p = inputlastName.nextElementSibling;

  if (lastName.test(inputlastName.value)) {
    p.innerHTML = "";
  } else {
    p.innerHTML = "Nom non valide, veuillez rééssayer";
  }
}

function validlastName(inputaddress) {
  let address = new RegExp(
    "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
    "g"
  );

  let p = inputaddress.nextElementSibling;

  if (address.test(inputaddress.value)) {
    p.innerHTML = "";
  } else {
    p.innerHTML = "Adresse non valide, veuillez rééssayer";
  }
}

function validlastName(inputcity) {
  let city = new RegExp(
    "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
    "g"
  );

  let p = inputcity.nextElementSibling;

  if (city.test(inputcity.value)) {
    p.innerHTML = "";
  } else {
    p.innerHTML = "Nom de ville non valide, veuillez rééssayer";
  }
}

function validEmail(inputEmailElement) {
  if (!inputEmailElement.checkValidity()) {
    inputEmailElement.nextElementSibling.innerHTML =
      inputEmailElement.validationMessage;
  } else {
    inputEmailElement.nextElementSibling.innerHTML = "";
  }
}

let contact = {
  lastName: document.querySelector("#lastName").value,
  firstName: document.querySelector("#firstName").value,
  address: document.querySelector("#address").value,
  city: document.querySelector("#city").value,
  email: document.querySelector("#email").value,
};
console.log(contact);

let order = document.querySelector(".cart_order_from_submit");
let products = [];
let productCartStorage = getLocalStorage();
for (product of productCartStorage) {
  product.push(product._id);
}
console.log(products);
