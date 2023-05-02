
//boolean true/false 


document.getElementById('li_logout').style.display = 'none'

let works = [];
const fetchWork = async (affiche) => {
    console.log("fetch")
    await fetch("http://localhost:5678/api/works")
        .then((reponse) => reponse.json())
        .then((Promise) => {
            works = Promise;

            if (affiche) {
                worksDisplay()
            }

        });
  // on appelle la fonction pour ajouter le listener au formulaire
      
};

const worksDisplay = async () => {

    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = ''

    console.log("affiche " + works.length)
    for (let i = 0; i < works.length; i++) {

        const worksElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;

        divGallery.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        const caption = document.createElement("figcaption");
        caption.innerText = works[i].title;
        divGallery.appendChild(worksElement);
        worksElement.appendChild(caption)


    };

};

fetchWork(true);


let categories = [];
const fethcategory = async () => {
    await fetch("http://localhost:5678/api/categories")
        .then((res) => res.json())
        .then((Promise) => {
            categories = Promise;
            //console.log(categories);

        });
};
fethcategory();


const ObjetsFiltree = document.querySelector("#objet");
ObjetsFiltree.addEventListener("click", function () {

    fetchWork(false)
    const workFiltre = works.filter(function (work) {
        return work.category.name === 'Objets'
    });
    console.log(workFiltre);

    works = workFiltre

    worksDisplay()
});

const AppartFiltree = document.querySelector("#Appart");
AppartFiltree.addEventListener("click", function () {

    fetchWork(false)
    const workFiltre = works.filter(function (work) {
        return work.category.name === 'Appartements'
    });
    console.log(workFiltre);

    works = workFiltre

    worksDisplay()
});
const HotelFiltree = document.querySelector("#hot-res");
HotelFiltree.addEventListener("click", function () {

    fetchWork(false)
    const workFiltre = works.filter(function (work) {
        return work.category.name === 'Hotels & restaurants'
    });
    console.log(workFiltre);

    works = workFiltre

    worksDisplay()
});

const TousFiltree = document.querySelector("#all");
TousFiltree.addEventListener("click", function () {
    fetchWork(true)
});




/**
 * ETAPE 2 Formulaire de login
 * 
 * 1. Créer la page HTML/CSS (Attention, pensez aux responsive)
 * 2. Ajouter un eventListener sur le bouton "se connecter" au click
 *    A. Verifier que les 2 champs du formulaire ne sont pas vide
 *      b. si les champs sont vides, afficher un message d'erreur
 *  
 *    B. si les champs sont OK, envoyer une requete POST vers /api/users/login avec fetch()
 *          avec les données du formulaires
 * 
 *    C. Si authentification OK (HTTP 200)
 *         a. on récupère le token dans la reponse
 *         b. ON sauvegarde le token
 *          c. On redirige l'utilisateur vers la page d'accueil
 *         d. sur la page d'accueil, si l'utilisateur est connecté, alors il faut afficher logout dans le header
 *              a la palce de login
 *          e. si click sur logout, on supprime le token (on deconnecte l'utilisateur)
 * 
 *      D. Si authentification NOK (HTTP 401 ou 404)
 *          a. afficher un message d'erreur
 * 
 */

let token = localStorage.getItem('token')
if(token !== null) {

    document.getElementById('li_logout').style.display = 'block'
    document.getElementById('li_login').style.display = 'none'

}
 
document.querySelector('#li_logout a').addEventListener('click', function(event) {
    localStorage.removeItem('token');
    window.location.href = 'index.html'
});


// ouverture de modale
let modal = null
const Openmodale = function(e){
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria_hiddden')
    target.setAttribute('aria-modal', 'true')
    modal = target 
    const fermer = document.querySelector(".X-close")
    fermer.addEventListener('click', closeModale)
   
    modal.querySelector(".modale-supprimer-btn").addEventListener('click', closeModale)
    // modal.querySelector(".Stop-modale").addEventListener('click', stopPropagation)

};
// POUR FERMER LA MODALE
const closeModale = function(e) {
    if (modal === null) return
    e.preventDefault();
    const focus = document.querySelector('html');
    focus.style.background = "white";
    modal.style.display = "none";
    modal.setAttribute('ariaèhidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModale);
    modal.querySelector('.modale-supprimer-btn').addEventListener('click', closeModale)
    // modal.querySelector('.Stop-modale').removeEventListener('click', stopPropagation)
    modal = null;
    
}
// arréter la propagation
const stopPropagation = function(e) {
    e.stopPropagation()
};
document.querySelectorAll('.open-modal1').forEach(a =>{
    a.addEventListener('click', Openmodale)
});
 
// disparaite la barre de Filtre

// const stopFlitre = document.querySelector("#Filtre");
// stopFlitre.innerHTML = ''
// fonction appelée pour faire apparaitre les projets dans la modale
async function workModal(){
    const response = await fetch("http://localhost:5678/api/works");
    const res = await response.json();

    res.forEach(works => {
        divProjet = document.querySelector(".galerie-photo");
        const figureElement = document.createElement("figure");
        figureElement.classList.add("figure-modale");
        figureElement.setAttribute("id", "" + works.id);
        const imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;
        imageElement.setAttribute("crossorigin", 'anonymous');
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = 'editer';

        const deletbutton = document.createElement("button");
        
        deletbutton.setAttribute("id", works.id);
    
        deletbutton.setAttribute("onclick", "deletProjet(this.id)");
        deletbutton.classList.add("bouton-delete");
        // const Iconedelete = document.querySelector(".icone-trash");
        // const 
        

        divProjet.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
       


    })
};
workModal();









