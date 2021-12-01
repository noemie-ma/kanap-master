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
            <img class="product-picture" src="${product.imageUrl}" alt="${product.altTxt}" />
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            </div>
          </section>
        `
      )).join('')
  );
};

showProducts();