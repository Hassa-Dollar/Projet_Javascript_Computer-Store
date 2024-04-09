function creerItem1(item){

    //selon le type de carte graphique l'objet sera append sur different id de balise
    if (item.type === "Carte graphique"){
        $("#carte-commu").append(
            `
        <div class="card dessous" style="width: 18rem; margin-right: 70px; padding: 15px;">
        <img src="${item.url}" class="card-img-top" alt="...">
         <div class="card-body">
             <h5 class="card-title">${item.marque}</h5>
              <div class="card-text">
                <p>${item.model}</p>
                <p>Prix : ${item.prix}$</p>
                <p>${item.id}</p>
              </div>
              <button type="button" onclick="AcheterComu(${item.id})" class="btn btn-primary">Acheter</button>
              <button id="enlever${item.id}" type="button" class="btn btn-danger d-none" onclick="supprimerItem(${item.id})">Supprimer</button>
          </div>
        </div>
        `
        )
    }
    else if(item.type === "Processeur"){
        $("#cpu-commu").append(
            `
        <div class="card dessous" style="width: 15rem; margin-right: 70px; padding: 15px;">
        <img src="${item.url}" class="card-img-top" alt="...">
         <div class="card-body">
             <h5 class="card-title">${item.marque}</h5>
              <div class="card-text">
                <p>${item.model}</p>
                <p>Prix : ${item.prix}$</p>
                <p>${item.id}</p>
              </div>
              <button type="button" onclick="AcheterComu(${item.id})" class="btn btn-primary">Acheter</button>
              <button id="enlever${item.id}" type="button" class="btn btn-danger d-none" onclick="supprimerItem(${item.id})">Supprimer</button>
          </div>
        </div>
        `
        )
    }
    else if(item.type === "Carte mere"){
        $("#board-commu").append(
            `
        <div class="card dessous" style="width: 15rem; margin-right: 70px; padding: 15px;">
        <img src="${item.url}" class="card-img-top" alt="...">
         <div class="card-body">
             <h5 class="card-title">${item.marque}</h5>
              <div class="card-text">
                <p>${item.model}</p>
                <p>Prix : ${item.prix}$</p>
                <p>${item.id}</p>
              </div>
              <button type="button" onclick="AcheterComu(${item.id})" class="btn btn-primary">Acheter</button>
              <button id="enlever${item.id}" type="button" class="btn btn-danger d-none" onclick="supprimerItem(${item.id})">Supprimer</button>
          </div>
        </div>
        `
        )
    }
}

//on recupere la liste des id du stockage local si la key existe ses valeurs sont prises sinon initialiser
//en tant que array vide
let listeIDs = JSON.parse(localStorage.getItem("listeID")) || [];

//Cette methode pour prendre le contenu (attribut) json a partir de mockapi et en faire un objet creeable grace a la methode creerItem
fetch('https://660c062a3a0766e85dbd307d.mockapi.io/api/v1/ItemCommu', {
    method: 'GET',
    headers: {'content-type':'application/json'},
}).then(res => {
    if (res.ok) {
        return res.json();
    }

}).then(items => {
    items.forEach(item=>{
        //pour chaque item, on le cree et affiche
        creerItem1(item);

        //on cree dans une variable le id de la carte exact
        let itemId = "#enlever"+item.id

        //pour chaque id dans la liste si il match le id du item ajouter on affiche donc le button supprimer
        listeIDs.forEach(id => {
            if (id === item.id){
                $(itemId).removeClass("d-none")
            }
        })
    });

}).catch(error => {
    $(".alert").text(error.status).removeClass("d-none");
});

//le compteur me permettant d'ajouter des clefs au panier de maniere unique
// verifie si le compteur existe sinon valeur de 0
//primordial au fonctionnement d'ajout et de suppression d'item du panier il devient aussi la valeur du id d'un item a storer
//dans le storage local
let compteur2 = JSON.parse(localStorage.getItem("compt1")) || 0;

//Permet de selectionner l'item et l'afficher au panier
function AcheterComu(id){
    compteur2++

    fetch('https://660c062a3a0766e85dbd307d.mockapi.io/api/v1/ItemCommu/' + id, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(item => {
        item.id = compteur2;
        localStorage.setItem("itemComu_" + compteur2, JSON.stringify(item));
        Afficher1(item)
        alert(`Votre ${item.type} : ${item.marque} ${item.model} a ete ajouter au panier avec succes!`)
    }).catch(error => {
        $(".alert").text(error.status).removeClass("d-none");
    });

    localStorage.setItem("compt1", JSON.stringify(compteur2));
}

//Affiche l'item selectionner dans le panier
function Afficher1(item){

    $("#panier1").append(
        `
       <div class="card dessous" style="width: 18rem; margin-right: 70px; padding: 15px;">
       <img src="${item.url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${item.marque}</h5>
             <div class="card-text">
               <p>${item.model}</p>
               <p>Prix : ${item.prix}$</p>
             </div>
         </div>
         <button type="button" class="btn btn-danger" onclick="Supprimer2(${item.id})">Supprimer</button>
       </div>
       `
    )
}

//Supprime l'item slectionner du panier
function Supprimer2(itemId) {
    if (confirm("Voulez-vous vraiment supprimer l'item de votre panier?")){
        //Supprimer l'item exact du local storage localStorage
        localStorage.removeItem("itemComu_" + itemId);
        alert("Supprimer avec succes!")
        location.reload();
    }
    else {
        alert("Annuler avec succes!")
    }
}

//Cette fonction viendra confirmer la commande seulement
function Confirmer2(){
    if (confirm("Veuillez confirmer votre panier")){
        for(let i in localStorage){
            if (i.startsWith("itemComu_")){
                localStorage.removeItem(i);
            }
            if (i.startsWith("compt1")){
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

//Cette fonction permet de supprimer de l'tem de la liste mockapi
function supprimerItem(id){
    if (confirm("Voulez-vous vraiment supprimer votre item en vente?")){
        fetch('https://660c062a3a0766e85dbd307d.mockapi.io/api/v1/ItemCommu/' + id, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            alert("Supprimer avec succes!")
            location.reload()
        }).catch(error => {
            $(".alert").text(error.message).removeClass("d-none");
        })
    }
    else{
        alert("Annuler avec succes!")
    }
}

//au chargement de la page, on affiche tous les objets existant au panier
for(let i in localStorage){
    if (i.startsWith("itemComu_")){
        let item = JSON.parse(localStorage.getItem(i))
        Afficher1(item)
    }
}