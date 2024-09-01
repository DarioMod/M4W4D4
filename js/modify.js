const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyMzNiY2NlOWJmYTAwMTU4MTkzNDEiLCJpYXQiOjE3MjUwNTE4MzYsImV4cCI6MTcyNjI2MTQzNn0.IUk9CBRe1qZwQfm-NKVOT17RT8xJU7M_-7z7svJF1zM"
const url = new URLSearchParams(window.location.search);
const id = url.get("id");
const modifyBtn = document.getElementById("button");
const backBtn = document.getElementById("backButton");

const fillForm = async () => {
    const data = await fetch(endpoint+id, {
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${apiKey}`
        },
    })
    const result = await data.json();
    
    document.getElementById("name").value=result.name
    document.getElementById("description").value=result.description
    document.getElementById("imageUrl").value=result.imageUrl
    document.getElementById("brand").value=result.brand
    document.getElementById("price").value=result.price
}  
fillForm();

const modifyProduct = async (e) => {
    e.preventDefault();
    const name= document.getElementById("name").value;
    const description= document.getElementById("description").value;
    const brand= document.getElementById("brand").value;
    const imageUrl= document.getElementById("imageUrl").value;
    const price= document.getElementById("price").value;
    const priceValue= Number(price);

    const product = {
        name:name,
        description:description,
        brand:brand,
        imageUrl:imageUrl,
        price:priceValue
    }
    const data = await fetch(endpoint+id, {
        method:"PUT",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${apiKey}`
        },
        body:JSON.stringify(product)
    })
    const result = await data.json();


}



modifyBtn.addEventListener("click",(e) => {
    e.preventDefault();
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            modifyProduct(e);
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

      

});

backBtn.addEventListener("click",(e) => {
    e.preventDefault();
    window.location.href = "backend.html";
})









