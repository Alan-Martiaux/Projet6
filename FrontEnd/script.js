const worksGallery = document.querySelector(".gallery");

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
  const works = await getData("http://localhost:5678/api/works");
  const categorieTous = { id: 0, name: "Tous" };
  const categories = await getData("http://localhost:5678/api/categories");
  categories.unshift(categorieTous);
  console.log(categories);
  genererCategorie(categories, works);
  genererWorks(works);
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
      //Voir si possible  raccourcir !!!
      allFilters.classList.remove("button_active");
      objFilters.classList.remove("button_active");
      appartFilters.classList.remove("button_active");
      restoFilters.classList.remove("button_active");
      //////////////////////
      let filterWorks = works;
      if (categorie.name !== "Tous") {
        filterWorks = works.filter(
          (work) => work.category.name === categorie.name
        );
      }
      categorieContainer.classList.add("button_active");
      genererWorks(filterWorks);
    });
  }

  //Voir si possible raccourcir !!!

  let allFilters = document.getElementById("Tous");
  let objFilters = document.getElementById("Objets");
  let appartFilters = document.getElementById("Appartements");
  let restoFilters = document.getElementById("Hotels & restaurants");
  allFilters.classList.add("button_active");
  //////////////////////
}
