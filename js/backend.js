const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyMzNiY2NlOWJmYTAwMTU4MTkzNDEiLCJpYXQiOjE3MjUwNTE4MzYsImV4cCI6MTcyNjI2MTQzNn0.IUk9CBRe1qZwQfm-NKVOT17RT8xJU7M_-7z7svJF1zM"
const showProduct = document.getElementById("showProduct");

const cardFetch = async() => {
    const data = await fetch(endpoint, { 
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${apiKey}`
        },
    })
    const result = await data.json()
    console.log(result);
    result.forEach(p => cardProduct(p,showProduct));
}

cardFetch();

const cardProduct = (cardData,append) => {
   const card =document.createElement("div");
   const cardName =document.createElement("h4");
   const cardDescription =document.createElement("p");
   const cardImg =document.createElement("img");
   const cardPrice =document.createElement("p");
   const cardBody =document.createElement("div");
   const modifyBtn = document.createElement("button");
   const deleteBtn = document.createElement("button");
   

   modifyBtn.classList.add("btn","btn-warning");
   card.classList.add("card");
   cardName.classList.add("card-text");
   cardName.textContent = cardData.name;
   cardDescription.textContent = cardData.description;
   cardImg.src=cardData.imageUrl;
   cardImg.classList.add("card-img-top");
   cardPrice.textContent=cardData.price;
   cardBody.classList.add("card-body");
   modifyBtn.innerText="Modifica";
   deleteBtn.innerText="Elimina";
   deleteBtn.classList.add("btn","btn-danger");

   cardBody.append(cardName,cardDescription,cardPrice);
   card.append(cardImg,cardBody,modifyBtn,deleteBtn);
   append.appendChild(card);

   modifyBtn.addEventListener("click", ()=> {
    window.location.href="./modify.html?id="+cardData._id;
   })

   deleteBtn.addEventListener("click", () => {
    Swal.fire({
        title: "Do you want to Delete the Product?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't Delete`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            if(cardData._id){
                deleteProduct(cardData._id, card);
            }
          Swal.fire("Deleted!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
   })

}

const deleteProduct = async(id, card) => {
    const data = await fetch(endpoint+id, { 
        method:"DELETE",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${apiKey}`
        },
    })
    const result = await data.json()
    console.log(result);
    card.remove();
}







