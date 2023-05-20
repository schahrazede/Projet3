
//boolean true/false 
document.getElementById('li_logout').style.display = 'none'
//  1.1 Récupération des travaux depuis le back-end
// Appel à l’API avec fetch afin de récupérer dynamiquement les projets de l’architecte
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
};

// ajouter à la galerie les travaux  qu'on a récupéré.

const worksDisplay = async () => {

    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = ''

    console.log("affiche " + works.length)
    for (let i = 0; i < works.length; i++) {

        const worksElement = document.createElement("figure");
        worksElement.setAttribute('id', 'figure_projet' + works[i].id)
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

//  1.2 : Réalisation du filtre des travaux
// Au clic sur un élément du menu de catégories, filtrer les travaux selon le filtre sélectionné.

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

// Les changement en cas de connecté ou non connecter sur la page index.html
let token = localStorage.getItem('token')
if (token !== null) {
    //MODE CONNECTE
    document.getElementById('li_logout').style.display = 'block'
    document.getElementById('li_login').style.display = 'none'

    // disparaite la barre de Filtre
    const stopFlitre = document.querySelector("#Filtre");
    stopFlitre.style.display = 'none'


    document.querySelector('#li_logout a').addEventListener('click', function (event) {
        event.preventDefault()
        localStorage.removeItem('token');
        window.location.href = 'index.html'
    });
}
else {
    //MODE NON CONNECTE
    //bouton modifier doit etre caché si pas connecté
    document.querySelector('.titre').style.display = 'none'
    document.querySelector('.titre1').style.display = 'none'
}


// 3.Ajout de la Modale
// ouverture de modale
let modal = null;
const Openmodale = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = null;
    modal.setAttribute("aria_hiddden", "false");
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModale);
    modal.querySelector(".X-close").addEventListener('click', closeModale);
    modal.querySelector(".Stop-propa").addEventListener("click", stopPropagation);

};
// fermeture de modale
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

//MODALGALLERY
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
        deletbutton.dataset.id = works.id;
        deletbutton.classList.add("bouton-delete");
        const iconeTrash = document.createElement("i")
        iconeTrash.dataset.id = works.id;
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

        deletbutton.addEventListener("click", (e) => {
            e.preventDefault();
            deleteWork(e);
        })
    })
};
workModal();

// suppression d'un travail

async function deleteWork(e) {
    let id = e.target.dataset.id;

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "authorization": `bearer ${token}`
        }
    })
        .then(function (response) {
            if (response.ok) {
                // supprimer le figureElement dans la gallery modale dont l'id correspond a l'id cliqué
                document.getElementById('projet' + id).remove();
                // supprimer le travail dans la page principale
                document.getElementById('figure_projet' + id).remove();
            }
        });
}
// Ouverture Modale Ajout photo
let modal2 = null;
const Openmodale2 = function (e) {
    e.preventDefault();
    modal2 = document.querySelector(e.target.getAttribute("href"));
    modal2.style.display = null;
    modal2.setAttribute("aria_hiddden", "false");
    modal2.setAttribute('aria-modal', 'true');
    modal2.addEventListener('click', closeModale);
    modal2.querySelector(".Icone-X").addEventListener('click', closeModale2);
    modal2.querySelector(".icons-retour").addEventListener('click', affichageModal1);
    modal2.querySelector(".Stop-propa").addEventListener("click", stopPropagation1);
};
// Fermeture Modale Ajout photo
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
// affichage de modal2 et caché modal1
function affichageModal2() {
    if (Openmodale2) {
        const secondModal = document.querySelector(".modal-wrapper");
        secondModal.style.display = 'none';
    } else {

        console.log("erreur");
    }
}
document.querySelectorAll(".open-modal2").forEach(a => {
    a.addEventListener('click', affichageModal2)

})
// Afficher modal1 et caché modal2
const goBack = document.querySelector(".icons-retour");
function affichageModal1() {
    if (goBack) {
        const secondModal = document.querySelector("#modal2");
        secondModal.style.display = 'none';
        const secondModal2 = document.querySelector(".modal-wrapper");
        secondModal2.style.display = 'block';

    } else {
        console.log("erreur");
    }
}
document.getElementById("error-msg").style.display = 'none';

// // 3.3 Ajout un work

const intputFile = document.querySelector("#file-upload");
const previewImg = document.querySelector(".add-picture");
let img;
//  On lui applique un listener pour changer le style d'image
intputFile.addEventListener("change", function () {
    console.log('intputFile change')
    const file = this.files[0]
    console.log(file);
    if (file.size < 4000000) {
        //  Permet de lire fichier choisi
        const reader = new FileReader();  
        reader.onload = () => {
            const imageUrl = reader.result;
            img = document.createElement('img');
            // Récupérer la source image sur le pc
            img.src = imageUrl;
            previewImg.appendChild(img);
            previewImg.classList.add('active');
            previewImg.dataset.img = file.name;
        }
        reader.readAsDataURL(file);
    } else {
        alert('image size more then 4mo');
    }

});

//  soumission du formulaire

const form = document.getElementById('add-picture-form');
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // récupération des valeurs du formulaire
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const file = document.getElementById("file-upload").files[0];
    // validation des données du formulaire
    if (!title || !category || !file) {
        document.getElementById("error-msg").style.display = 'block';
        document.getElementById("error-msg").innerText = 'Complétez les champs !!!!'
        return
    }
    // création de lobjet FormData pour lenvoi du formulaire
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', file);

    // envoi de la requéte pour lajout d'une photo
    fetch(`http://localhost:5678/api/works/`, {
        method: 'POST',
        body: formData,
        headers: {
            "authorization": `bearer ${token}`

        }

    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            form.reset()
            img.remove()
            previewImg.classList.remove("active")
        })
        .catch(err => {
            document.getElementById("error-msg").style.display = 'block';
            document.getElementById("error-msg").innerText = 'Une erreur est survenu'
        })
});






