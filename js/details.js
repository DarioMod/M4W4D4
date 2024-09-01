const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyMzNiY2NlOWJmYTAwMTU4MTkzNDEiLCJpYXQiOjE3MjUwNTE4MzYsImV4cCI6MTcyNjI2MTQzNn0.IUk9CBRe1qZwQfm-NKVOT17RT8xJU7M_-7z7svJF1zM";
const url = new URLSearchParams(window.location.search);
const id = url.get("id");
const container = document.getElementById("container");
const backBtn= document.createElement("button");
backBtn.classList.add("btn","btn-secondary");
backBtn.innerText="Torna alla Vetrina";
backBtn.addEventListener("click",() => {
  window.location.href = "vetrina.html";
})

const cardFetch = async () => {
  const data = await fetch(endpoint + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const result = await data.json();
  console.log(result);
  fillProduct(result, container);
};

cardFetch();

const fillProduct = (cardData, append) => {
  const col = document.createElement("div");
  col.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

  const card = document.createElement("div");
  card.classList.add("product-card", "h-100", "p-3");

  const img = document.createElement("img");
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
  rating.innerHTML = "&#9733;&#9733;&#9733;&#9733;&#9734;"; // Example rating (4 stars)
  cardBody.append(
    productName,
    rating,
    productDescription,
    productBrand,
    productPrice
  );
  card.append(img, cardBody);
  col.append(card,backBtn);
  append.appendChild(col);
};
