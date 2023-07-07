// Crécupere le formaulaire du HTML qqaund il est envoyé
const email = document.querySelector("#email");
const password = document.querySelector("#password");

//AddEvenT... quand il est envoyé
const connexion = document.querySelector(".login");

// Récupre les infor emial et password

// Fetch avec la methode post ( JSON.stringify())

connexion.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/JSON",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())

    // THEN avec une reponse (Enregisre le token dans le localStorage)
    .then((data) => {
      let token = data.token;
      localStorage.setItem("UserToken", token);
      const UserToken = localStorage.getItem("UserToken");

      if (token) {
        console.log("WIN");
        window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
      } else {
        console.log("Non autorisé");
      }
    })
    .catch((error) => {
      console.error("Fail", error);
      console.error(data);
    });
});
