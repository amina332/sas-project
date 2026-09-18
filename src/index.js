const prompt = require('prompt-sync')()

let apprenants = []

function normaliserNom(nom) {
    nom = nom.trim() 
    nom = nom.toLowerCase() 
    let nomArray = nom.split(" ")  // kathawl string l array
 
    for (let i = 0; i < nomArray.length; i++) {
        
        nomArray[i] = nomArray[i].charAt(0).toUpperCase() + nomArray[i].slice(1);
    }

    return nomArray.join(" ") // katjme3 les proprietee dyal array f string
}


function validerResultat(jour , totalExercices , exercicesTermines , challengeTermine) {
    if (!Number.isInteger(jour) || !Number.isInteger(totalExercices) || !Number.isInteger(exercicesTermines)) {
        console.log("Vous avez un error , le jour ou le total d'exircicr doit etre un nombre entier.");
    }

    if (jour < 1 || jour > 7) {
        console.log("Le jour doit être compris entre 1 et 7.");
    }

    if (totalExercices <= 0) {
        console.log("le totalExercices doit etre superieur strictement a 0");
    }

     if (exercicesTermines < 1 || exercicesTermines > totalExercices) {
        console.log("exercicesTermines doit etre sup ou egale a exercicesTermines et il doit etre inferieure ou egale a totalExercices");
    }

    if (challengeTermine !== Boolean) {
            console.log("doit etre un true or false");
    }
}

function ajouterApprenant() { //les parametre
    let id = Number(prompt("Entrer l'id d'apprenant : "));

    if (!Number.isInteger(id)) {
        console.log("id doit etre un nombre");
        return;
    }

    for (let i = 0; i < apprenants.length; i++) {
        if (id === apprenants[i].id) {
            console.log("ce id a ete deja declarer");
            return;
        }
    }

    let nomComplet = prompt(" entrer le nomComplet de l'apprenant : ")
    let ville = prompt("entrer la ville de l'apprenant : ")

    let a = {
        id: id,
        nomComplet: normaliserNom(nomComplet),
        ville: normaliserNom(ville),
        resultat: []
    }

    apprenants.push(a) //ajouter une valeur a la fin de tableau
    
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

            choix = Number(prompt("choisit une option: ")) 

           switch (choix) {
                case 0:
                    break;
                    
                case 1:
                    break;

                case 2:
                    console.log("apprenat");
                    break;
                
                case 3:
                    ajouterApprenant()
                    break    
            
                default:
                    console.log("Ce choix n'existe pas .");
                    break;
            }
        } while (choix !== 0);
}

function main() {
    menu()
}

main();