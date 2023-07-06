

// Crécupere le formaulaire du HTML qqaund il est envoyé
 const email = document.querySelector("#email");
 const password = document.querySelector("#password");


//AddEvenT... quand il est envoyé
const connexion = document.querySelector(".login_button")


// Récupre les infor emial et password

// Fetch avec la methode post ( JSON.stringify())
    
connexion.addEventListener("click", function(){


    fetch("http://localhost:5678/api/users/login", {
         method: 'POST',
         headers: {
             'accept' : 'application/JSON',
             'Content-Type': 'application/json'
         },
        body: JSON.stringify({
            "email": email.value,
            "password": password.value
        })
    
        
    
    })
    .then(response => response.json())
    
    


 // THEN avec une reponse (Enregisre le token dans le localStorage)
    .then(data => {
       
        console.log(data)
   //     window.location.href= "http://127.0.0.1:5500/FrontEnd/index.html"
    }) 
    .catch(error => {
        console.error('Fail', error, data);
        console.error(data)
    })

})



