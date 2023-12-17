const worksGallery = document.querySelector(".gallery");
const modalGallery = document.querySelector(".galleryModal");

let editorMode = document.querySelector(".edit_mode");
let LogIn = document.querySelector(".logIn");
let LogOut = document.querySelector(".logOut");

// Debut let pour modal
let security = false;
let token = localStorage.getItem("UserToken");
console.log(token);

let edit_button = document.querySelector(".edit_button");
let modal = document.querySelector(".modal");
let close_Modal = document.querySelectorAll(".close_Modal");
let divCategory = document.querySelector(".categorie");
let Modifier = document.querySelector(".modifier");

let add_picture = document.querySelector(".add_button");
let modal_edit = document.querySelector(".modal_contents");
let modal_add = document.querySelector(".modal_add");

let return_back = document.querySelector(".return_back");

// Let pour ajout de la photo sur swagger
let sendPhoto = document.querySelector(".valid_button");

let afficheImg = document.querySelector(".choice_img");

let imgChange = document.getElementById("img_change");

let information = document.querySelector(".information");

let addForm = document.querySelector(".add_form");

let changeImgCont = document.getElementById("img_Changer");
let Imgcontainer = document.querySelector("#change_Img_cont");

/////////////////////////

async function getData(url) {
  try {
    const reponse = await fetch(url);
    let data = reponse.json();
    console.log(reponse);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  console.log("Initialisation terminé");
  //genereredit();
  const works = await getData("http://localhost:5678/api/works");
  const categorieTous = { id: 0, name: "Tous" };
  const categories = await getData("http://localhost:5678/api/categories");
  categories.unshift(categorieTous);
  console.log(works);
  console.log(categories);
  genererCategorie(categories, works);
  genererWorks(works);
  generermodalWorks(works);
  information.style.display = "none";
  changeImgCont.style.display = "none";
  resetForm();
  //reset de valid_button
  sendPhoto.style.background = "grey";
  sendPhoto.style.cursor = "wait";
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
  document.querySelector(".categorie").innerText = "";
  const categoryForm = document.querySelector(".input_categorie");
  categoryForm.innerHTML = "";
  for (const categorie of categories) {
    const categorieContainer = document.createElement("button");
    categorieContainer.classList.add("categorie_button");
    categorieContainer.setAttribute("id", categorie.name);
    const categorieTitle = document.createElement("p");
    categorieTitle.innerText = categorie.name;

    categorieContainer.classList.remove("button_active");

    categorieGallery.appendChild(categorieContainer);
    categorieContainer.appendChild(categorieTitle);

    //generation des catégorie dans le form

    const categoryOption = document.createElement("option");
    categoryOption.value = categorie.id;
    categoryOption.label = categorie.name;
    categoryOption.setAttribute("class", categorie.id);

    if (categoryOption.value == 0) {
      categoryOption.value = "";
      categoryOption.label = " Veuillez choisir une catégorie ";
    }

    categoryForm.appendChild(categoryOption);

    //////////////////////////////////////////

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

function genererEdit() {
  editorMode.style.display = "none";
  modal.style.display = "none";
  if (token) {
    LogIn.style.display = "none";
    editorMode.style.display = "flex";
    divCategory.style.display = "none";
    Modifier.style.display = "flex";
    console.log("Mode editeur");
    let security = true;
  } else {
    LogOut.style.display = "none";
  }
}
genererEdit();

//Suppression des token et deco
LogOut.addEventListener("click", function disconect() {
  console.log("Déconnecté avec succés");
  LogIn.style.display = "block";
  LogOut.style.display = "none";
  editorMode.style.display = "none";
  divCategory.style.display = "flex";
  Modifier.style.display = "none";
  localStorage.clear();
  window.location.reload();
});

//////////
//MODALE//
//////////

//generation contenu modale
function generermodalWorks(works) {
  document.querySelector(".galleryModal").innerText = "";
  if (token) {
    for (const modalWork of works) {
      const modalContainer = document.createElement("figure");
      modalContainer.setAttribute("id", modalWork.category.name);
      modalContainer.setAttribute("class", "imgWidth");
      const divImgAdd = document.createElement("div");
      divImgAdd.setAttribute("class", "div_img_add");
      divImgAdd.innerHTML = "";
      const modalImg = document.createElement("img");
      modalImg.src = modalWork.imageUrl;

      const modalImgTitle = document.createElement("figcaption");
      modalImgTitle.innerText = "éditer";
      modalImgTitle.setAttribute("class", "editText");
      const trashdelete = document.createElement("button");
      trashdelete.setAttribute("class", "poubelle");
      trashdelete.innerHTML =
        '<i class="fa-regular fa-trash-can modal_trash-icon "></i>';

      //suppworks
      trashdelete.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(modalImg.id);
        console.log("ok");
        console.log(modalWork.id);
        let request = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        fetch("http://localhost:5678/api/works/" + modalWork.id, request)
          .then((response) => {
            if (response.ok) {
              console.log("Ook");
              init();
            } else {
              console.log("Pas Ook");
            }
          })
          .catch((error) => {
            console.error("Fail", error);
            console.error(data);
          });
      });

      //Fetch => INTI()

      ///////////
      modalGallery.appendChild(modalContainer);
      modalContainer.appendChild(divImgAdd);
      divImgAdd.appendChild(modalImg);
      modalContainer.appendChild(modalImgTitle);
      modalContainer.appendChild(trashdelete);
    }
  }
}

//Ouverture de la Modal
edit_button.addEventListener("click", function openModal() {
  modal.style.display = "flex";
  modal_edit.style.display = "flex";
  modal_add.style.display = "none";
  console.log(token);
  edit_button = true;

  securityWebsite();
});

// Fermeture de la Modal
close_Modal.forEach(function (close) {
  close.addEventListener("click", function closeModal() {
    modal.style.display = "none";
    information.style.display = "none";
    console.log("close");
    edit_button = false;
  });
});

//retour en arriere

return_back.addEventListener("click", function returnBack() {
  modal_edit.style.display = "flex";
  modal_add.style.display = "none";
  information.style.display = "none";
  resetForm();
});

//Ajout de photo

add_picture.addEventListener("click", function addPicture() {
  modal_edit.style.display = "none";
  modal_add.style.display = "flex";
  securityWebsite();
});

function addModal() {
  const changePicture = document.querySelector(".ajout_Img");
  changePicture.innerHTML = "";

  const iconPicture = document.createElement("i");
  iconPicture.setAttribute("class", "fa-regular fa-image fa-xl add_image_icon");
  const labelPicture = document.createElement("label");
  labelPicture.setAttribute("class", "choice_img choice_test");
  labelPicture.innerText = "+ Ajouter Photo";
  const inputPicture = document.createElement("div");
  inputPicture.innerHTML =
    '<input hidden class="add_photo" id="img_change" type="file" name="images" required accept="image/jpg , image/png" size="4000000"/>';

  changePicture.appendChild(iconPicture);
  changePicture.appendChild(labelPicture);
  labelPicture.appendChild(inputPicture);
}

//Bouton de validation

let valid = document.querySelector(".add_form");
valid.addEventListener("input", function () {
  const fileAdds = imgChange.files[0];
  const titles = document.querySelector(".input_titre").value;
  const categoryIds = document.querySelector(".input_categorie").value;
  console.log(fileAdds, titles, categoryIds);

  if (fileAdds && titles && categoryIds) {
    console.log("Formulaire complet");
    sendPhoto.style.background = "#1d6154";
    sendPhoto.style.cursor = "pointer";
  }
});

//Envoie de la photo
sendPhoto.addEventListener("click", (e) => {
  securityWebsite();

  e.preventDefault();
  if (500) {
    information.style.display = "flex";
  }
  const fileAdd = imgChange.files[0];
  const title = document.querySelector(".input_titre").value;
  const categoryId = document.querySelector(".input_categorie").value;
  const formData = new FormData();
  formData.append("image", fileAdd);
  formData.append("title", title);
  formData.append("category", categoryId);
  if (fileAdd && title && categoryId) {
    let request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch("http://localhost:5678/api/works", request).then((response) => {
      if (response.ok) {
        console.log("Ook");

        modal.style.display = "none";

        init();
      } else {
        console.log("Pas Ook");
      }
    });
  }
});

//Affichage de la photo dans la modal
afficheImg.addEventListener("change", function previewImage() {
  console.log("test");
  const file = imgChange.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (event) {
      const imageUrl = event.target.result;
      const image = new Image();

      image.addEventListener("load", function () {
        changeImgCont.innerHTML = "";
        changeImgCont.appendChild(image);
        changeImgCont.style.display = "flex";
        Imgcontainer.style.display = "none";
      });

      image.src = imageUrl;
      image.style.width = "auto";
      image.style.height = "169px";
    });

    reader.readAsDataURL(file);
  }
});

function resetForm() {
  console.log("Reset Formulaire");
  const formReset = document.querySelector(".add_form");
  formReset.reset();

  Imgcontainer.style.display = "flex";
  changeImgCont.style.display = "none";
}

//delete photo

// const delete_img = document.querySelectorAll(".poiubelle");

// delete_img.forEach(function (element) {
//   element.addEventListener("click", function () {
//     console.log("Effacer");
//   });
// });

function eventDelete() {
  const delete_img = document.querySelectorAll(".poiubelle");
  console.log(delete_img);
}

//bloque scroll

//Sécurité du site

function securityWebsite() {
  if (!token && security == false) {
    console.log("Vous n'êtes pas autorisé !");
    editorMode.style.display = "none";
    Modifier.style.display = "none";
    modal.style.display = "none";
    modal_edit.style.display = "none";
    modal_add.style.display = "none";
  }
}
securityWebsite();
