function creerItem(item){

    //selon le type de carte graphique l'objet sera append sur different id de balise
    if (item.type === "Carte graphique"){
        $("#carte").append(
            `
        <div class="card dessous" style="width: 18rem; margin-right: 70px; padding: 15px;">
        <img src="${item.url}" class="card-img-top" alt="...">
         <div class="card-body">
             <h5 class="card-title">${item.marque}</h5>
              <div class="card-text">
                <p>${item.model}</p>
                <p>Prix : ${item.prix}$</p>
              </div>
              <button type="button" onclick="AcheterMagasin(${item.id})" class="btn btn-primary">Acheter</button>
          </div>
        </div>
        `
        )
    }
    else if(item.type === "Processeur"){
        $("#cpu").append(
            `
        <div class="card dessous" style="width: 15rem; margin-right: 70px; padding: 15px;">
        <img src="${item.url}" class="card-img-top" alt="...">
         <div class="card-body">
             <h5 class="card-title">${item.marque}</h5>
              <div class="card-text">
                <p>${item.model}</p>
                <p>Prix : ${item.prix}$</p>
              </div>
              <button type="button" onclick="AcheterMagasin(${item.id})" class="btn btn-primary">Acheter</button>
          </div>
        </div>
        `
        )
    }
    else if(item.type === "Carte mere"){
        $("#board").append(
            `
        <div class="card dessous" style="width: 15rem; margin-right: 70px; padding: 15px;">
        <img src="${item.url}" class="card-img-top" alt="...">
         <div class="card-body">
             <h5 class="card-title">${item.marque}</h5>
              <div class="card-text">
                <p>${item.model}</p>
                <p>Prix : ${item.prix}$</p>
              </div>
              <button type="button" onclick="AcheterMagasin(${item.id})" class="btn btn-primary">Acheter</button>
          </div>
        </div>
        `
        )
    }
}

//Requete pour recuperer de mockapi ma liste d'objets
fetch('https://660c062a3a0766e85dbd307d.mockapi.io/api/v1/Items', {
    method: 'GET',
    headers: {'content-type':'application/json'},
}).then(res => {
    if (res.ok) {
        return res.json();
    }
    // handle error
}).then(items => {
    items.forEach(function(item){
        creerItem(item);
    });
}).catch(error => {
    $(".alert").text(error.status).removeClass("d-none");
})

//le compteur me permettant d'ajouter des clefs au panier de maniere unique
// verifie si le compteur existe sinon valeur de 0
//primordial au fonctionnement d'ajout et de suppression d'item du panier il devient aussi la valeur du id d'un item a storer
//dans le storage local
let compteur = JSON.parse(localStorage.getItem("coompt")) || 0;

//fonction me permettant de recuperer de maniere unique l'objet saisie de mockapi et l'envoyer au panier
function AcheterMagasin(id){
    compteur++

    fetch('https://660c062a3a0766e85dbd307d.mockapi.io/api/v1/Items/' + id, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(item => {
        item.id = compteur;
        localStorage.setItem("itemMag_" + compteur, JSON.stringify(item));
        Afficher(item)
        alert(`Votre ${item.type} : ${item.marque} ${item.model} a ete ajouter au panier avec succes!`)
    }).catch(error => {
        $(".alert").text(error.status).removeClass("d-none");
    })

    //key nommer coompt pour differencier les 2 compteurs
    localStorage.setItem("coompt", JSON.stringify(compteur));
}

//Permet d'afficher l'item dans le panier
function Afficher(item){

    $("#panier").append(
        `
       <div class="card dessous" style="width: 18rem; margin-right: 70px; padding: 15px;">
       <img src="${item.url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${item.marque}</h5>
             <div class="card-text">
               <p>${item.model}</p>
               <p>Prix : ${item.prix}$</p>
             </div>
             <button type="button" class="btn btn-danger" onclick="Supprimer(${item.id})">Supprimer</button>
         </div>
       </div>
       `
    )
}

//permet de suprimer un item du panier de magasin
function Supprimer(itemId) {
    if (confirm("Voulez-vous vraiment supprimer l'item de votre panier?")){
        //Supprimer l'item exact du local storage localStorage
        localStorage.removeItem("itemMag_" + itemId);
        alert("Supprimer avec succes!")
        location.reload();
    }
    else {
        alert("Annuler avec succes!")
    }

}

//Cette fonction viendra confirmer la commande du panier du magasin
function Confirmer(){
    if (confirm("Veuillez vonfirmer votre panier")){
        for(let i in localStorage){
            if (i.startsWith("itemMag_")){
                localStorage.removeItem(i);
            }
            if (i.startsWith("coompt")){
                localStorage.removeItem(i);
            }
        }
        alert("Succes votre commande est en route merci!!")
        location.reload();
    }
    else{
        alert("Annuler avec succes!")
    }
}

//au chargement de la page, on affiche tous les objets existant au panier
for(let i in localStorage){
    if (i.startsWith("itemMag_")){
        let item = JSON.parse(localStorage.getItem(i))
        Afficher(item)
    }
}