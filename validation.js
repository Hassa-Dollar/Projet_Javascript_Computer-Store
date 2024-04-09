
//Validation du formulaire de demande de support
$("#form1").submit(function (event){

    //prevenir le rafraichissement de la page pour pouvoir voir les messages d'erreur
    event.preventDefault()

    //Prendre la valeur des inputs a valider et les mettre dans des variables
    let prenom = $("#prenom").val()
    let nom = $("#nom").val()
    let email = $("#email").val()
    let telephone = $("#tele").val()

    //Creation des regex de validation dans des variables
    let regNom = /^[A-Z][a-zA-Z]*$/
    let regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let regTele = /^\d-\(\d{3}\)-\d{3}-\d{4}$/

    //variables qui permettra de simuler le submit et d'afficher un message de succes
    let confirmation = 0;

    //test a chaque fois si chacun des champs est conforme au pattern
    if (!regNom.test(prenom)) {
        $("#erreur").removeClass("d-none")
        confirmation -= 1;
    }
    else {
        $("#erreur").addClass("d-none")
        confirmation += 1;
    }

    if (!regNom.test(nom)) {
        $("#erreur2").removeClass("d-none")
        confirmation -= 1;
    }
    else {
        $("#erreur2").addClass("d-none")
        confirmation += 1;
    }

    if (!regEmail.test(email)) {
        $("#erreur3").removeClass("d-none")
        confirmation -= 1;
    }
    else {
        $("#erreur3").addClass("d-none")
        confirmation += 1;
    }

    if (!regTele.test(telephone)) {
        $("#erreur4").removeClass("d-none")
        confirmation -= 1;
    }
    else {
        $("#erreur4").addClass("d-none")
        confirmation += 1;
    }

    //Affichage du message de succes
    if (confirmation === 4){
        $("#succes").removeClass("d-none")
    }
    else{
        $("#succes").addClass("d-none")
    }
});

/*
//variable representant le id
let i = 0;
//Cet ajout permet de faire en sorte que le premier id commence a la plus haute valeur du id dans le document json +1
$.getJSON("itemCommunaute.json")
    .done(items =>{
        items.forEach(function(item){
            i++;
        });
        i++
    })
    .fail(error =>{
        $(".alert").text(error.status).removeClass("d-none");
    });
 */

//class sans id pour creer l'objet et l'envoyer a mockapi
class ItemComu{
    constructor(marque,model,type,prix,url) {
        this.marque = marque;
        this.model = model;
        this.type = type;
        this.prix = prix;
        this.url = url;
    }
}

//Validation du formulaire d'ajout de piece
$("#form2").submit(function (event){

    //prevenir le rafraichissement de la page pour pouvoir voir les messages d'erreur
    event.preventDefault()

    //Prendre la valeur des inputs a valider et les mettre dans des variables
    let marque = $("#marque").val()
    let model = $("#model").val()
    let url = $("#url").val()
    let prix = $("#prix").val()

    //Creation des regex de validation dans des variables
    let regMarque = /^[A-Z][a-zA-Z]*$/
    let regUrl = /^(https?:\/\/).*\.(jpg|png)$/

    //variables qui permettra de simuler le submit et d'afficher un message de succes
    let confirmation = 0;

    //test a chaque fois si chacun des champs est conforme au pattern
    if (!regMarque.test(marque)) {
        $("#erreur5").removeClass("d-none")
        confirmation -= 1;
    }
    else {
        $("#erreur5").addClass("d-none")
        confirmation += 1;
    }

    if (!regMarque.test(model)) {
        $("#erreur6").removeClass("d-none")
        confirmation -= 1;
    }
    else {
        $("#erreur6").addClass("d-none")
        confirmation += 1;
    }

    if (prix < 1 || prix > 3000) {
        $("#erreur8").removeClass("d-none")
        confirmation -= 1;
    }
    else {
        $("#erreur8").addClass("d-none")
        confirmation += 1;
    }

    if (!regUrl.test(url)) {
        $("#erreur7").removeClass("d-none")
        confirmation -= 1;
    }
    else {
        $("#erreur7").addClass("d-none")
        confirmation += 1;
    }

    //permettra l'ajout de l'article au magasin communautaire
    let valide = false;

    //Affichage du message de succes
    if (confirmation === 4){
        valide = true;
    }
    else{
        valide = false;
    }

    //le type de l'objet permettra de l'append au bon endroit
    let type = $("#type").val()

    if (valide){
        const item1 = new ItemComu(marque,model,type,prix,url)

        Ajouter(item1)
    }
});

//liste permettant de sauvegarder les id ajouter par l'utilisateur, on verifie si elle existe pour reprendre
//les valeurs existantes et eviter de tjr initialiser une liste vide si non-existant elle sera initialiser vide
let listeID = JSON.parse(localStorage.getItem("listeID")) || [];

//permet d'ajouter des nouveau items a la liste de mockapi
function Ajouter(item1){

    fetch('https://660c062a3a0766e85dbd307d.mockapi.io/api/v1/ItemCommu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item1)
    }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to add item');
            }
            return response.json();
        }).then(data => {
            // ajout du nouveau id dans la liste
            listeID.push(data.id);
            // sauvegarde la liste avec le nouvel id dans le local storage
            localStorage.setItem("listeID", JSON.stringify(listeID));
            // Rechargement de la page pour afficher le nouveau objet
        alert("Item ajouter avec succes!")
            location.reload();
        }).catch(error => {
            $(".alert").text(error.status).removeClass("d-none");
        });

}



















