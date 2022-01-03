// API REQUEST
const urlApi = "http://127.0.0.1:3000/api/products";
const fetchProducts = async () => {
  await fetch(urlApi)
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
    })
    .then((products) => {
      console.log(products);
      showProducts(products);
    })
    .catch((erreur) => {
      console.log(erreur);
      alert(
        "Une erreur est survenue ! Veuillez contacter l'adiministrateur du site"
      );
    });
};
fetchProducts();

// Showing products on the index page
function showProducts(produits) {
  let html = "";

  produits.forEach((product) => {
    html =
      html +
      `
    <a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}" />
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>
  `;
  });

  document.getElementById("items").innerHTML = html;
}
