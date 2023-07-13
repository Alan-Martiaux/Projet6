const worksGallery = document.querySelector(".gallery");
const modalGallery = document.querySelector(".galleryModal");

let editorMode = document.querySelector(".edit_mode");
let LogIn = document.querySelector(".logIn");
let LogOut = document.querySelector(".logOut");

let edit_button = document.querySelector(".edit_button");
let modal = document.querySelector(".modal");
let close_Modal = document.querySelector(".close_Modal");
let divCategory = document.querySelector(".categorie");
let Modifier = document.querySelector(".modifier");

let add_picture = document.querySelector(".add_button");
let modal_edit = document.querySelector(".modal_contents");
let modal_add = document.querySelector(".modal_add");

async function getData(url) {
  try {
    const reponse = await fetch(url);
    let data = reponse.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  genereredit();
  const works = await getData("http://localhost:5678/api/works");
  const categorieTous = { id: 0, name: "Tous" };
  const categories = await getData("http://localhost:5678/api/categories");
  categories.unshift(categorieTous);
  console.log(categories);
  genererCategorie(categories, works);
  genererWorks(works);
  generermodalWorks(works);
  modal.style.display = "none";
}

init();

//Generer les projets
function genererWorks(works) {
  document.querySelector(".gallery").innerText = "";

  for (const work of works) {
    const worksContainer = document.createElement("figure");
    worksContainer.setAttribute("class", work.category.name);
    const worksImg = document.createElement("img");
    worksImg.src = work.imageUrl;
    const worksImgTitle = document.createElement("figcaption");
    worksImgTitle.innerText = work.title;

    worksGallery.appendChild(worksContainer);
    worksContainer.appendChild(worksImg);
    worksContainer.appendChild(worksImgTitle);
  }
}

function genererCategorie(categories, works) {
  const categorieGallery = document.querySelector(".categorie");

  for (const categorie of categories) {
    const categorieContainer = document.createElement("button");
    categorieContainer.classList.add("categorie_button");
    categorieContainer.setAttribute("id", categorie.name);
    const categorieTitle = document.createElement("p");
    categorieTitle.innerText = categorie.name;

    categorieContainer.classList.remove("button_active");

    categorieGallery.appendChild(categorieContainer);
    categorieContainer.appendChild(categorieTitle);

    categorieContainer.addEventListener("click", (e) => {
      ///RETIRE BACKGROUND VERT
      let buttonActive = document.querySelector(".button_active");
      buttonActive.classList.remove("button_active");
      /////////////////////////
      let filterWorks = works;
      if (categorie.name !== "Tous") {
        filterWorks = works.filter(
          (work) => work.category.name === categorie.name
        );
      }
      categorieContainer.classList.add("button_active");
      genererWorks(filterWorks);
    });

    if (categorie.name === "Tous") {
      categorieContainer.classList.add("button_active");
    }
  }
}

////////////////
//MODE EDITION//
////////////////

function genereredit() {
  let token = localStorage.getItem("UserToken");
  console.log(token);
  editorMode.style.display = "none";
  modal.style.display = "none";
  if (token) {
    LogIn.style.display = "none";
    editorMode.style.display = "flex";
    divCategory.style.display = "none";
    Modifier.style.display = "flex";
    console.log("Mode editeur");
  } else LogOut.style.display = "none";
}

//Suppression des token et deco
LogOut.addEventListener("click", function disconect() {
  console.log("coucou");
  LogIn.style.display = "block";
  LogOut.style.display = "none";
  editorMode.style.display = "none";
  divCategory.style.display = "flex";
  Modifier.style.display = "none";
  localStorage.clear();
});

//////////
//MODALE//
//////////

//generation contenu modale
function generermodalWorks(works) {
  for (const modalWork of works) {
    const modalContainer = document.createElement("figure");
    modalContainer.setAttribute("class", modalWork.category.name);
    const modalImg = document.createElement("img");
    modalImg.src = modalWork.imageUrl;
    const modalImgTitle = document.createElement("figcaption");
    modalImgTitle.innerText = "éditer";
    const trashImg = document.createElement("i");
    trashImg.innerText = "";
    trashImg.setAttribute("class", "fa-regular fa-trash-can modal_trash-icon");

    modalGallery.appendChild(modalContainer);
    modalContainer.appendChild(modalImg);
    modalContainer.appendChild(modalImgTitle);
    modalContainer.appendChild(trashImg);
  }
}

//Ouverture de la Modal
edit_button.addEventListener("click", function openModal() {
  modal.style.display = "flex";
  modal_add.style.display = "none";
});

// Fermeture de la Modal
close_Modal.addEventListener("click", function closeModal() {
  modal.style.display = "none";
});

//Ajout de photo
add_picture.addEventListener("click", function addPicture() {
  modal_edit.style.display = "none";
  modal_add.style.display = "flex";
});
