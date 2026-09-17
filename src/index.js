const prompt = require('prompt-sync')()

function normaliserNom(nom) {
    nom = nom.trim() 
    nom = nom.toLowerCase() 
    let nomArray = nom.split(" ") 
 
    for (let i = 0; i < nomArray.length; i++) {
        
        nomArray[i] = nomArray[i].charAt(0).toUpperCase() + nomArray[i].slice(1);
    }

    return nomArray.join(" ") 
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
                    console.log("Au revoir!");
                    break;
                    
                case 1:
                    console.log("Dashboard");
                    break;

                case 2:
                    console.log("apprenat");
                    break;
            
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