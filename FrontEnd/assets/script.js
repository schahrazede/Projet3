alert("bonjour");

/*
1. Appeler le backend via l'url http://localhost:5678/api/works avec la function fetch()
2. Parcourir le resultat de fetch() au format JSON
    a/ Pour chaque element du json, créer des elements HTML pour construire l'HTML
            <figure>
                <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
                <figcaption>Abajour Tahina</figcaption>
            </figure>

            document.createELement("figure")
            let img = document.createELement("img") //il faudra lui assigner imageUrl
            
            const caption = document.createElement("figcaption")
            caption.innerText = //il faudra lui assigner title
    
    b/ Ne pas oublier d'ajouter les element dynamiquement créer au document, a l'interieur de cette div
    <div class="gallery">
*/

// document.querySelector(".gallery").appendChild() 
let works = [];
const fetchWork = async () => {
    await fetch("http://localhost:5678/api/works")
        .then((reponse) => reponse.json())
        .then((Promise) => {
            works = Promise;
            console.log(works);

        });
};

const worksDisplay = async () => {
    await fetchWork();

    for (let i = 0; i < works.length; i++) {
        const divGallery = document.querySelector(".gallery");
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

worksDisplay();

let categories = [];
const fethcategory = async () => {
    await fetch("http://localhost:5678/api/categories")
        .then((res) => res.json())
        .then((Promise) => {
            categories = Promise;
             console.log(categories);

        });
};
fethcategory();


const Filtrees = document.querySelector("#objet");

Filtrees.addEventListener("click", function () {
    const workFiltre = works.filter(work => work.name === 'Objet');
    console.log(workFiltre);
});

// login/users

// let Infos = [];
// const GetInfo = async () => {
//     await fetch("http://localhost:5678/api/users/login")
//         .then((res) => res.json())
//         .then((token) => {
//             Infos = token;
//             const infoLogin = JSON.stringify(Infos);
//              console.log(Infos);

//         });
// };
// GetInfo();

















