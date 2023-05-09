
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
if (token !== null) {

    document.getElementById('li_logout').style.display = 'block'
    document.getElementById('li_login').style.display = 'none'

    // disparaite la barre de Filtre
    const stopFlitre = document.querySelector("#Filtre");
    stopFlitre.style.display = 'none'


}
else {
    //bouton modifier doit etre caché si pas connecté
    document.querySelector('.titre').style.display = 'none'

    document.querySelector('#li_logout a').addEventListener('click', function (event) {
        localStorage.removeItem('token');
        window.location.href = 'index.html'
    });
}



// ouverture de modale
let modal = null;
const Openmodale = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = null;
    modal.setAttribute("aria_hiddden", "false");
    modal.setAttribute('aria-modal', 'true');
    // const fermer = document.querySelector(".X-close")
    modal.addEventListener('click', closeModale);
    modal.querySelector(".X-close").addEventListener('click', closeModale);
    modal.querySelector(".Stop-propa").addEventListener("click", stopPropagation);


    // modal.querySelector(".Stop-modale").addEventListener('click', stopPropagation)

};
// POUR FERMER LA MODALE
const closeModale = function (e) {
    if (modal === null) return
    e.preventDefault();
    const focus = document.querySelector('html');
    focus.style.background = "white";
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModale);
    modal.querySelector('.Stop-propa').removeEventListener('click', stopPropagation)
    modal = null;

}
// arréter la propagation
const stopPropagation = function (e) {
    e.stopPropagation()
};
document.querySelectorAll(".open-modal1").forEach(a => {
    a.addEventListener('click', Openmodale)
})

// fonction appelée pour faire apparaitre les projets dans la modale
async function workModal() {
    const response = await fetch("http://localhost:5678/api/works");
    const res = await response.json();

    res.forEach(works => {
        divProjet = document.querySelector(".galerie-photo");
        const figureElement = document.createElement("figure");
        figureElement.classList.add("figure-modale");
        figureElement.setAttribute("id", "projet" + works.id);
        const imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;
        imageElement.setAttribute("crossorigin", 'anonymous');
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = 'editer';

        const deletbutton = document.createElement("button");
        deletbutton.setAttribute("id", works.id);
        deletbutton.setAttribute("click_id", "projets(this.id)");
        deletbutton.classList.add("bouton-delete");
        const iconeTrash = document.createElement("i")
        iconeTrash.classList.add("fa-solid")
        iconeTrash.classList.add("fa-trash-can")
        const moveIcone = document.createElement("i")
        moveIcone.classList.add("fa-solid")
        moveIcone.classList.add("fa-arrows-up-down-left-right")
        deletbutton.appendChild(moveIcone);
        deletbutton.appendChild(iconeTrash);
        divProjet.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        figureElement.appendChild(deletbutton);


    })
};
workModal();


/**
 * Etape 3.2
 * Suppression d'un travail
 * 
 * 1. Positionner en CSS le bouton sur l'image (position obsolute ?) C fait
 * 2. Sur click sur bouton trash
 *      a. Envoyer une requete HTTP vers l'api DELETE /works/{id}
 *      b. Si response.ok
 *          c. supprimer le figureElement dans la modale dont l'id correspond a l'id cliqué
 *          d. supprimer le travail dans la page principale
 * 
 * 
 * Etape 3.3
 * 3. Sur click du bouton Ajouter une photo
 *  a. Masquer le contenu gallerie de la modale (display none)
 *  b. Afficher le formulaire d'ajout + la fleche retour
 * 
 *  c. sur click de la fleche retour: afficher la gallerie, masquer le formulaire
 *   d. sur validation du formulaire
 *         e. Envoyer une requete HTTP vers l'api POST /works
 *          f. si reponse.ok
 *                 g. ajouter la figure dans la gallerie de la modale
 *                  h. ajouter la figure dans la page principale
 * 
 */

//document.querySelector(".figure-modale[id=5]")
// suppression d'un travail
const iconeTrash = document.querySelector("figure-modale");
iconeTrash.addEventListener("click", (e) => {
    e.preventDefault();
    deleteWork(e);
});
async function deleteWork(e) {
    let ID = iconeTrash.dataset.id;
    fetch(`http://localhost:5678/api/works/${ID}`, {
        method: 'DELETE',
        Headers:{
            "content-type":"application/json",
            "authorization": `bearer ${token}`,
        },
    })
}


// Ouverture second modale
let modal2 = null;
const Openmodale2 = function (e) {
    e.preventDefault();
    modal2 = document.querySelector(e.target.getAttribute("href"));
    modal2.style.display = null;
    modal2.setAttribute("aria_hiddden", "false");
    modal2.setAttribute('aria-modal', 'true');
    modal2.addEventListener('click', closeModale);
    modal2.querySelector(".Icone-X").addEventListener('click', closeModale2);
    modal2.querySelector(".Stop-propa").addEventListener("click", stopPropagation1);
};
// Fermeture de second modale
const closeModale2 = function (e) {
    if (modal === null) return
    e.preventDefault();
    const focus = document.querySelector('html');
    focus.style.background = "white";
    modal2.style.display = "none";
    modal2.setAttribute('aria-hidden', 'true');
    modal2.removeAttribute('aria-modal');
    modal2.removeEventListener('click', closeModale2);
    modal2.querySelector('.Stop-propa').removeEventListener('click', stopPropagation1)
    modal2 = null;

}
// arréter la propagation
const stopPropagation1 = function (e) {
    e.stopPropagation()
};
document.querySelectorAll(".open-modal2").forEach(a => {
    a.addEventListener('click', Openmodale2)
})


// 3.3 Ajout un work









