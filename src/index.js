const prompt = require('prompt-sync')

function normaliserNom(nom) {
    nom = nom.trim() // kat7yd les espaces flwl w flakhr dyal string
    nom = nom.toLowerCase() // kathawl les lettres en miniscules
    let nomArray = nom.split(" ") // kat7wl wahd string l array mn kol espaces example "Wassim Rifi" -> ["Wassim" , "Rifi"]
 
    for (let i = 0; i < nomArray.length; i++) {
        
        nomArray[i] = nomArray[i].charAt(0).toUpperCase() + nomArray[i].slice(1);
    }

    return nomArray.join(" ") // kat7awl wahd l array l string w katht bin kol klma w klma espace
}

function menu() {
    let choix
        do {
            console.log("===== SAS PROGRESS CONSOLE =====");
            console.log("1. Afficher le tableau de bord");
            console.log("2. Afficher la liste des apprenants");
            console.log("3. Ajouter un apprenant");
            console.log("4. Consulter un apprenant par identifiant");
            console.log("5. Ajouter ou modifier le résultat d'une journée");
            console.log("6. Rechercher un apprenant par nom");
            console.log("7. Filtrer les apprenants par niveau");
            console.log("8. Trier les apprenants par progression décroissante");
            console.log("9. Trier les apprenants par ordre alphabétique");
            console.log("0. Quitter");

            choix = prompt("choisit une option: ") 
        } while (choix !== "0");
}

