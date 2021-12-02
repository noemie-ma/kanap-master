let products;

// API REQUEST
const fetchProducts = async() => {
  products = await fetch(
    'http://127.0.0.1:3000/api/products').then(res =>
    res.json());

    console.log(products);
};

const showProducts = async() => {
  await fetchProducts();

  results.innerHTML = (

    products
      .map(product => (
        `
          <a href="./product.html?id=42">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}" />
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
        `
      )).join('')
  );
};

showProducts();