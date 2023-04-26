
//boolean true/false 
import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./login.js";


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
ajoutListenerEnvoyerAvis()      
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

// login/users

// let Infos = [];
// const GetInfo = async () => {
//     /*await fetch("http://localhost:5678/api/users/login") //GET
//         .then((res) => res.json()
//         .then((token) => {
//             Infos = token;
//             const infoLogin = JSON.stringify(Infos);
//              console.log(Infos);

//         });*/

//     const data = {
//        i
//     };

//     const response = await fetch("http://localhost:5678/api/users/login", {
//         method: "POST", // *GET, POST, PUT, DELETE, etc.
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data), // body data type must match "Content-Type" header
//     })
//     const formLogIn = document.querySelector(".LogIn-form");
//     formLogIn.addEventListener("submit", function (event) {
//         event.preventDefault();
//         var email = document.getElementById("email").value;
//         var password = document.getElementById("password").value;

//     });
//     if (email === body.email && password === body.password) {
//         Window; Location = "index.html";

//     }
//     else {
//         document.getElementById("error_msg").innerHTML = "erreur";
//     }
//     // return response.json();
// };
// GetInfo();


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


 












