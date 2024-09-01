const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQyMzNiY2NlOWJmYTAwMTU4MTkzNDEiLCJpYXQiOjE3MjUwNTE4MzYsImV4cCI6MTcyNjI2MTQzNn0.IUk9CBRe1qZwQfm-NKVOT17RT8xJU7M_-7z7svJF1zM"
const btn = document.getElementById("button");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const brand = document.getElementById("brand");
    const imageUrl = document.getElementById("imageUrl");
    const price = document.getElementById("price");
    
    const product = {
        name: name.value,
        description: description.value,
        brand: brand.value,
        imageUrl: imageUrl.value,
        price: Number(price.value)
    };

    const createProduct = async () => {
        try {
            const response = await fetch(endpoint, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify(product)
            });
            const result = await response.json();
            console.log(result);

            
        } catch (error) {
            console.error("Error creating product:", error);
        }
        if (!name.value || !description.value || !brand.value || !imageUrl.value || !price.value) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Please fill in all the fields",
                showConfirmButton: true,
            });
        }else {
            // Svuota i campi del modulo dopo aver creato il prodotto
            name.value = "";
            description.value = "";
            brand.value = "";
            imageUrl.value = "";
            price.value = "";
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
        } 
    };createProduct();
    
});


