document.getElementById("error-msg").style.display = 'none'

// export function ajoutListenerConnecter() {
const formulUser = document.querySelector("#LogIn-form");
formulUser.addEventListener("submit", function (event) {
   event.preventDefault();
   // creation de lobjet de connexion charge utile


   let email = event.target.querySelector("[name=email]").value
   let password = event.target.querySelector("[name=password]").value 

   /* Il faut verifier que l'email et le mot de passe ne sont pas vide */
   if(email === '' || password === '') {
       document.getElementById("error-msg").style.display = 'block'
       document.getElementById("error-msg").innerText = 'Compléter les champs !!!!'
       return
   }

   var Infos = {
       email: email,
       password: password,
   };

   // Appel de la fonction fetch avec toutes les information necessaire
   fetch("http://localhost:5678/api/users/login", {
       method: "POST",
       headers: { "content-Type": "application/json" },
       body: JSON.stringify(Infos)

   })
   .then(function(response) {
       if(response.ok) {
           return response.json();
       }
     
       //si user pas trouvé
       if(response.status === 404 || response.status === 401) {
           document.getElementById("error-msg").style.display = 'block'
           document.getElementById("error-msg").innerText = "Votre email/mot de passe n'est bon"
           event.target.querySelector("[name=password]").value = ''
       }
   })
   .then(function(data) {
       //si login/mdp OK
       document.getElementById("error-msg").style.display = 'none'
       document.getElementById("error-msg").innerText = ""

       localStorage.setItem('token', data.token)
       window.location.href = "index.html";
   })
  
})


