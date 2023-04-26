async function fetchInfo() {
    const reponse = await fetch("http://localhost:5678/api/users/login");
    const users = await reponse.json();
    const infoLogin = JSON.stringify(users);

    // export function ajoutListenerConnecter() {
        const formulUser = document.querySelector("#LogIn-form");
        formulUser.addEventListener("submit", function (event) {
            event.preventDefault();
            // creation de lobjet de connexion charge utile

        
            var Infos = {

                email: parseInt(event.target.querySelector("[name=email]").value),
                password: event.target.querySelector("[name=password]").value,
            };

            // Creation la charge utile au format Json
            const chargeUtile = JSON.stringify(Infos);
            // Appel de la fonction fetch avec toutes les information necessaire
            fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: chargeUtile

            });
            if (Infos.email === infoLogin.email && Infos.password === infoLogin.password) {
                window.location = "index.html";
            }
            else {
                document.getElementsById("error-msg").innerHTML = "erreur dans identifiant"
            };



        });
    
    // }
    }

