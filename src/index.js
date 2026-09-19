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


function validerResultat(jour, totalExercices, exercicesTermines, challengeTermine) {
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

    if (challengeTermine !== true && challengeTermine !== false) {
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

function enregistrerResultat() {
    let id = Number(prompt("entrer id des app"))
    if (!Number.isInteger(id)) {
        console.log("id doit etre un nombre entier");
        return;

    }
    let apprenant;
    for (let i = 0; i < apprenants.length; i++) {
        if (id === apprenants[i].id) {
            apprenant = apprenants[i]
        }

    }
    if (apprenant === undefined) {
        console.log("aucun apprenant admet ce id");
        return;
    }
    let jour = Number(prompt(" entrer jour des app"))
    let exercicesTermines = Number(prompt("entrer exercicesTermines des app"))
    let totalExercices = Number(prompt("entrer totalExercices des app"))
    let challengeTermine = Number(prompt("enter challengeTermine des app soit 1 pour true et 0 pour false "))

    if (challengeTermine === 1) {
        challengeTermine = true
    } else if (challengeTermine === 0) {
        challengeTermine = false
    } else {
        console.log("si ce choix n'est pas valider");
        return
    }


    validerResultat(jour, totalExercices, exercicesTermines, challengeTermine)
    let resultat = {
        jour: jour,
        exercicesTermines: exercicesTermines,
        totalExercices: totalExercices,
        challengeTermine: challengeTermine
    }
    apprenant.resultat.push(resultat)
}
function rechercherApprenant() {
    let recherchons = prompt("entrer id ou le nom d'app : ")
    let apprenant;

    if (!Number.isNaN(Number(recherchons))) {
        let id = Number(recherchons)
        if (!Number.isInteger(id)) {
            console.log("id doit etre un nombre entier");
            return;

        }
        for (let i = 0; i < apprenants.length; i++) {
            if (id === apprenants[i].id) {
                apprenant = apprenants[i]
            }

        }
        if (apprenant === undefined) {
            console.log("aucun apprenant admet ce id");
            return;
        }

        console.log(apprenant);

    } else {
        for (let i = 0; i < apprenants.length; i++) {
            if (recherchons === apprenants[i].nomComplet) {
                apprenant = apprenants[i]
            }

        }
        if (apprenant === undefined) {
            console.log("aucun apprenant admet ce id");
            return;
        }

        console.log(apprenant);
    }

}

function calculerProgression(apprenant) {
    let exercicesTermines = 0
    let exercicesProposes = 0
    let challengesTermines = 0
    let journeesRenseignees = apprenant.resultat.length

    for (let i = 0; i < journeesRenseignees; i++) {
        exercicesTermines += apprenant.resultat[i].exercicesTermines
        exercicesProposes += apprenant.resultat[i].exercicesProposes
        if (apprenant.resultat[i].challengeTermine === true) {
            challengesTermines++
        }

    }
    let progression = (exercicesTermines / exercicesProposes) * 100
    return {
        exercicesTermines,
        exercicesProposes,
        challengesTermines,
        journeesRenseignees,
        progression
    }
}
function filtrerParNiveau() {
    let niveau = prompt("entrer le niveau : ")
    niveau.toLowerCase()
    let a = []
    for (let i = 0; i < apprenants.length; i++) {
        let progression = calculerProgression(apprenants[i])
        if (niveau === "solide" && progression.progression >= 80) {
            a.push(apprenants[i])

        } else if (niveau === "en progression" && progression.progression >= 50 && progression.progression <= 79) {
            a.puch(apprenants[i])

        } else if (niveau === "a renforcer" && progression.progression < 50) {
            a.push(apprenants[i])
        }
    }
    console.log(a);

}
function trierParProgression() {
    let a = apprenants.map(app => calculerProgression(app)).sort((b, c) => b.progression - c.progression)
    console.log(a);

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
            case 4:
                enregistrerResultat()
                break;
            case 5:
                rechercherApprenant()
                break;
            case 7:
                filtrerParNiveau()
                break;
            case 8:
                trierParProgression()
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