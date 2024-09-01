const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyMzNiY2NlOWJmYTAwMTU4MTkzNDEiLCJpYXQiOjE3MjUwNTE4MzYsImV4cCI6MTcyNjI2MTQzNn0.IUk9CBRe1qZwQfm-NKVOT17RT8xJU7M_-7z7svJF1zM";
const container = document.getElementById("container");

const cardFetch = async () => {
  const data = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const result = await data.json();
  console.log(result);
  result.forEach((p) => fillProduct(p, container));
};

cardFetch();

const fillProduct = (cardData, append) => {
  const col = document.createElement("div");
  col.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

  const card = document.createElement("div");
  card.classList.add("product-card", "h-100", "p-3");

  const img = document.createElement("img");
  const detailBtn = document.createElement("button");
  detailBtn.classList.add("add-to-cart-btn");
  detailBtn.textContent = "Dettagli Prodotto";
  img.classList.add("product-img");
  img.src = cardData.imageUrl;
  img.alt = cardData.name;

  const cardBody = document.createElement("div");
  cardBody.classList.add("d-flex", "flex-column", "h-100");

  const productName = document.createElement("h5");
  productName.classList.add("product-title");
  productName.innerText = cardData.name;

  const productDescription = document.createElement("p");
  productDescription.classList.add("card-text");
  productDescription.innerText = cardData.description;

  const productBrand = document.createElement("p");
  productBrand.classList.add("text-muted");
  productBrand.innerHTML = `<small>Brand: ${cardData.brand}</small>`;

  const productPrice = document.createElement("p");
  productPrice.classList.add("product-price");
  productPrice.innerText = `€${cardData.price}`;

  const rating = document.createElement("p");
            rating.classList.add("rating");
            rating.innerHTML = "&#9733;&#9733;&#9733;&#9733;&#9734;";  // Example rating (4 stars)

  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add-to-cart-btn", "mt-auto");
  addToCartBtn.innerText = "Add to Cart";

  cardBody.append(
    productName,
    rating,
    productDescription,
    productBrand,
    productPrice,
    detailBtn
  );
  card.append(img, cardBody);
  col.appendChild(card);
  append.appendChild(col);

  detailBtn.addEventListener("click", () => {
    window.location.href = "./details.html?id=" + cardData._id;
  });
};
