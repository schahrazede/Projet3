document.getElementById("error-msg").style.display = 'none'


const formulUser = document.querySelector("#LogIn-form");
formulUser.addEventListener("submit", function (event) {
//   l'événement par défaut est empêché d'être exécuté (la page ne recharge pas)
    event.preventDefault();
    
    // creation de lobjet de connexion charge utile

    let email = event.target.querySelector("[name=email]").value
    let password = event.target.querySelector("[name=password]").value

    /* Il faut verifier que les champs l'email et le mot de passe ne sont pas vide */
    if (email === '' || password === '') {
        document.getElementById("error-msg").style.display = 'block'
        document.getElementById("error-msg").innerText = 'Complétez les champs !!!!'
        return
    }

    var Infos = {
        email: email,
        password: password,
    };

    // Appel de l'API pour l'authentification avec toutes les information necessaire
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(Infos)

    })
        .then(function (response) {
        //   Traitement de la réponse de l'API 
            if (response.ok) {
                
                return response.json();
            }

            //si user pas trouvé
            if (response.status === 404 || response.status === 401) {
                document.getElementById("error-msg").style.display = 'block'
                document.getElementById("error-msg").innerText = "Erreur dans L\identifiant ou le mot de passe"
                event.target.querySelector("[name=password]").value = ''
                return null
            }
        })
        .then(function (data) {

            if (data != null) {
                //si login/mdp OK
                document.getElementById("error-msg").style.display = 'none'
                document.getElementById("error-msg").innerText = ""
                // On stoke le token
                localStorage.setItem('token', data.token)
                window.location.href = "index.html";
            }
        })

})