const worksGallery = document.querySelector(".gallery")

//Generer les projets
function genererWorks (works) {
    for (let index = 0; index < works.length; index++) {
    const worksContainer = document.createElement("figure")
    const worksImg = document.createElement("img")
    worksImg.src = works[index].imageUrl;
    const worksImgTitle = document.createElement("figcaption")
    worksImgTitle.innerText = works[index].title


    worksGallery.appendChild(worksContainer)
    worksContainer.appendChild(worksImg)
    worksContainer.appendChild(worksImgTitle)
    
}
}

//Generer les catégorie
const categorieGallery = document.querySelector(".categorie")

function genererCategorie (categorie) {
    const categorieAllContainer = document.createElement("button")
    categorieAllContainer.classList.add("categorie_button")
    const categorieAll = document.createElement("p")
    categorieAll.innerText= "Tous"
    
    categorieGallery.appendChild(categorieAllContainer)
    categorieAllContainer.appendChild(categorieAll)

    
    for (let cat = 0; cat < categorie.length; cat++) {
    const categorieContainer = document.createElement("button")
    categorieContainer.classList.add("categorie_button")
    const categorieTitle = document.createElement("p")
    categorieTitle.innerText = categorie[cat].name



    categorieGallery.appendChild(categorieContainer)
    categorieContainer.appendChild(categorieTitle)
   
    
}

}


fetch("http://localhost:5678/api/works")
.then(reponse => reponse.json())
.then ( works => {
   genererWorks(works)
})

fetch("http://localhost:5678/api/categories")
.then(reponse => reponse.json())
.then ( categorie => {
    genererCategorie (categorie)
})
