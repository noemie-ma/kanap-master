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
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantite}">
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
  prenom.addEventListener("change", function () {
    validFirstName(this);
  });
  let nom = document.getElementById("lastName");
  nom.addEventListener("change", function () {
    validLastName(this);
  });
  let adresse = document.getElementById("address");
  adresse.addEventListener("change", function () {
    validAddress(this);
  });
  let ville = document.getElementById("city");
  ville.addEventListener("change", function () {
    validCity(this);
  });
  let email = document.getElementById("email");
  email.addEventListener("change", function () {
    validEmail(this);
  });
  /* fin contact */
  /* passer commande */
  let order = document.getElementById("order");
  // Eventlistener qui fonctionne seulement si tout les champs sont correctement rempli
  order.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Fonction fetch qui envoie à l'API un objet contenant l'objet 'contact' et le tableau 'products'
    sendData();
  });
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
  document.getElementById("totalPrice").innerHTML = totalPrix;
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
function validFirstName(inputfirstName) {
  let valid = false;
  let firstName = new RegExp(
    "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
    "g"
  );

  let p = inputfirstName.nextElementSibling;

  if (firstName.test(inputfirstName.value)) {
    p.innerHTML = "";
    valid = true;
  } else {
    p.innerHTML = "Prénom non valide, veuillez rééssayer";
    valid = false;
  }
  return valid;
}

function validLastName(inputlastName) {
  let valid = false;
  let lastName = new RegExp(
    "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
    "g"
  );

  let p = inputlastName.nextElementSibling;

  if (lastName.test(inputlastName.value)) {
    p.innerHTML = "";
    valid = true;
  } else {
    p.innerHTML = "Nom non valide, veuillez rééssayer";
    valid = false;
  }
  return valid;
}

function validAddress(inputaddress) {
  let valid = false;
  let address = new RegExp("[A-Za-z0-9'.-s,]$", "g");

  let p = inputaddress.nextElementSibling;

  if (address.test(inputaddress.value)) {
    p.innerHTML = "";
    valid = true;
  } else {
    p.innerHTML = "Adresse non valide, veuillez rééssayer";
    valid = false;
  }
  return valid;
}

function validCity(inputcity) {
  let valid = false;
  let city = new RegExp("^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$", "g");

  let p = inputcity.nextElementSibling;

  if (city.test(inputcity.value)) {
    p.innerHTML = "";
    valid = true;
  } else {
    p.innerHTML = "Nom de ville non valide, veuillez rééssayer";
    valid = false;
  }
  return valid;
}

function validEmail(inputEmailElement) {
  let valid = false;
  if (!inputEmailElement.checkValidity()) {
    inputEmailElement.nextElementSibling.innerHTML =
      inputEmailElement.validationMessage;
    valid = false;
  } else {
    inputEmailElement.nextElementSibling.innerHTML = "";
    valid = true;
  }
  return valid;
}

function sendData() {
  if (
    validLastName(document.querySelector("#lastName")) &&
    validFirstName(document.querySelector("#firstName")) &&
    validAddress(document.querySelector("#address")) &&
    validCity(document.querySelector("#city")) &&
    validEmail(document.querySelector("#email"))
  ) {
    //Récolte
    let contact = {
      lastName: document.querySelector("#lastName").value,
      firstName: document.querySelector("#firstName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };

    // Fontion qui envoie les id de tout les produits dans le tableau product
    let products = [];
    let productCartStorage = getLocalStorage();
    for (let product of productCartStorage) {
      products.push(product.id);
    }

    fetch("http://127.0.0.1:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact: contact, products: products }),
    })
      // Ensuite on stock la réponse de l'api (orderId)
      .then(function (res) {
        if (res.ok) return res.json();
      })
      .then(function (data) {
        orderId = data.orderId;
        // supprimer localstorage
        deleteLocalStorage();
        document.location.href = `./confirmation.html?orderId=${orderId}`;
      })
      .catch((erreur) => {
        console.log(erreur);
        alert(
          "une erreur est survenu veuillez contacter l'administrateur du site!"
        );
      });
  } else {
    alert("Veuillez verifier le formulaire contact!!");
  }
}
