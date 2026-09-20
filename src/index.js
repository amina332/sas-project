const prompt = require('prompt-sync')()

const apprenants = [
    {
        id: 1,
        nomComplet: "Sara Dev",
        ville: "Nador",
        resultat: [
            {
                jour: 1, exercicesTermines: 18,
                totalExercices: 20, challengeTermine: true
            },
            {
                jour: 2, exercicesTermines: 14,
                totalExercices: 20, challengeTermine: false
            }
        ]
    },
    {
        id: 2,
        nomComplet: "Yassine Code",
        ville: "Oujda",
        resultat: [
            {
                jour: 1, exercicesTermines: 12,
                totalExercices: 20, challengeTermine: false
            }
        ]
    }
];

function titre(texte) {
    console.log("--------------------------------------");
    console.log("--- " + texte.toUpperCase() + " ---");
    console.log("--------------------------------------");
}

function niveauDe(progression) {
    if (progression >= 80) return "Solide";
    if (progression >= 50) return "En progression";
    return "À renforcer";
}

function normaliserNom(nom) {
    nom = nom.trim()
    nom = nom.toLowerCase()
    let nomArray = nom.split(" ") 

    for (let i = 0; i < nomArray.length; i++) {

        nomArray[i] = nomArray[i].charAt(0).toUpperCase() + nomArray[i].slice(1);
    }

    return nomArray.join(" ") 
}


function validerResultat(jour, totalExercices, exercicesTermines, challengeTermine) {
    if (!Number.isInteger(jour) || !Number.isInteger(totalExercices) || !Number.isInteger(exercicesTermines)) {
        console.log("Vous avez un error , le jour ou le total d'exircicr doit etre un nombre entier.");
        return;
    }

    if (jour < 1 || jour > 7) {
        console.log("Le jour doit être compris entre 1 et 7.");
        return;
    }

    if (totalExercices <= 0) {
        console.log("le totalExercices doit etre superieur strictement a 0");
        return;
    }

    if (exercicesTermines < 1 || exercicesTermines > totalExercices) {
        console.log("exercicesTermines doit etre sup ou egale a exercicesTermines et il doit etre inferieure ou egale a totalExercices");
        return;
    }

    if (challengeTermine !== true && challengeTermine !== false) {
        console.log("doit etre un true or false");
        return;
    }
}

function ajouterApprenant() { 
    titre("Ajouter Apprenant")
    let id = Number(prompt("Entrer l'ID de l'apprenant : "));

    if (!Number.isInteger(id)) {
        console.log("Erreur : l'ID doit être un nombre entier.");
        return;
    }

    for (let i = 0; i < apprenants.length; i++) {
        if (id === apprenants[i].id) {
            console.log("Erreur : cet ID est déjà utilisé.");
            return;
        }
    }

    let nomComplet = prompt("Entrer le nom complet de l'apprenant : ")
    let ville = prompt("Entrer la ville de l'apprenant : ")

    let a = {
        id: id,
        nomComplet: normaliserNom(nomComplet),
        ville: normaliserNom(ville),
        resultat: []
    }

    apprenants.push(a)
    console.log(`Apprenant "${a.nomComplet}" (id: ${a.id}) ajouté avec succès.`);
}

function enregistrerResultat() {
    titre("Ajouter / Modifier Resultat")
    let id = Number(prompt("Entrer l'ID de l'apprenant : "))
    if (!Number.isInteger(id)) {
        console.log("Erreur : l'ID doit être un nombre entier.");
        return;

    }
    let apprenant;
    for (let i = 0; i < apprenants.length; i++) {
        if (id === apprenants[i].id) {
            apprenant = apprenants[i]
        }

    }
    if (apprenant === undefined) {
        console.log("Aucun apprenant ne correspond à cet ID.");
        return;
    }
    let jour = Number(prompt("Entrer le numéro du jour (1-7) : "))
    let exercicesTermines = Number(prompt("Entrer le nombre d'exercices terminés : "))
    let totalExercices = Number(prompt("Entrer le nombre total d'exercices : "))
    let challengeTermine = Number(prompt("Le challenge est-il terminé ? (1 = true, 0 = false) : "))

    if (challengeTermine === 1) {
        challengeTermine = true
    } else if (challengeTermine === 0) {
        challengeTermine = false
    } else {
        console.log("Erreur : réponse invalide, entrez 1 ou 0.");
        return
    }

    let resultat = {
        jour: jour,
        exercicesTermines: exercicesTermines,
        totalExercices: totalExercices,
        challengeTermine: challengeTermine
    }


    validerResultat(jour, totalExercices, exercicesTermines, challengeTermine)

    for (let i = 0; i < apprenant.resultat.length; i++) {
        if (jour === apprenant.resultat[i].jour){
            apprenant.resultat[i] = resultat
            return;
        }
        
    }


    apprenant.resultat.push(resultat)
    console.log(`Résultat du jour ${jour} enregistré pour ${apprenant.nomComplet}.`);
}

function afficherFicheApprenant(apprenant) {
    let progression = calculerProgression(apprenant)
    titre("Fiche apprenant")
    console.log("ID           : " + apprenant.id)
    console.log("Nom complet  : " + apprenant.nomComplet)
    console.log("Ville        : " + apprenant.ville)
    console.log("Progression  : " + progression.progression.toFixed(1) + " % (" + niveauDe(progression.progression) + ")")
    console.log("Journées     : " + progression.journeesRenseignees)
    console.log("Challenges   : " + progression.challengesTermines)
    console.log("--------------------------------------")
    console.log("Détail par jour :")
    for (let i = 0; i < apprenant.resultat.length; i++) {
        let resultat = apprenant.resultat[i]
        let termine;

        if (resultat.challengeTermine) {
            termine = "terminé"
        } else {
            termine = "non terminé"
        }

        console.log(`  Jour ${resultat.jour} : ${resultat.exercicesTermines}/${resultat.totalExercices} exercices - challenge ${termine}`)
    }
    console.log("--------------------------------------")
}

function rechercherApprenant(recherchons) {
    let apprenant;

    if (!Number.isNaN(Number(recherchons))) {
        let id = Number(recherchons)

        for (let i = 0; i < apprenants.length; i++) {
            if (id === apprenants[i].id) {
                apprenant = apprenants[i]
            }

        }
        if (apprenant === undefined) {
            console.log("Aucun apprenant ne correspond à cet ID.");
            return;
        }

        afficherFicheApprenant(apprenant);

    } else {
        for (let i = 0; i < apprenants.length; i++) {
            if (recherchons.toLowerCase() === apprenants[i].nomComplet.toLowerCase()) {
                apprenant = apprenants[i]
            }

        }
        if (apprenant === undefined) {
            console.log("Aucun apprenant ne correspond à ce nom.");
            return;
        }

        afficherFicheApprenant(apprenant);
    }

}

function calculerProgression(apprenant) {
    let exercicesTermines = 0
    let exercicesProposes = 0
    let challengesTermines = 0
    let progression = 0
    let journeesRenseignees = apprenant.resultat.length

    for (let i = 0; i < journeesRenseignees; i++) {
        exercicesTermines += apprenant.resultat[i].exercicesTermines
        exercicesProposes += apprenant.resultat[i].totalExercices
        if (apprenant.resultat[i].challengeTermine === true) {
            challengesTermines++
        }

    }
    
    progression = (exercicesTermines / exercicesProposes) * 100
    return {
        exercicesTermines,
        exercicesProposes,
        challengesTermines,
        journeesRenseignees,
        progression
    }
}

function filtrerParNiveau() {
    titre("Filtrer par niveau")
    let niveau = prompt("Entrer le niveau (solide / en progression / a renforcer) : ")
    niveau = niveau.trim().toLowerCase()
    let a = []
    for (let i = 0; i < apprenants.length; i++) {
        let progression = calculerProgression(apprenants[i])
        if (niveau === "solide" && progression.progression >= 80) {
            a.push(apprenants[i])

        } else if (niveau === "en progression" && progression.progression >= 50 && progression.progression <= 79) {
            a.push(apprenants[i])

        } else if (niveau === "a renforcer" && progression.progression < 50) {
            a.push(apprenants[i])
        }
    }

    titre("Apprenants - niveau " + niveau)
    if (a.length === 0) {
        console.log("Aucun apprenant ne correspond à ce niveau.")
    } else {
        for (let i = 0; i < a.length; i++) {
            let p = calculerProgression(a[i])
            console.log(`${i + 1} - ${a[i].nomComplet} (${a[i].ville}) - ${p.progression.toFixed(1)} %`)
        }
    }
    console.log("--------------------------------------")
}

function trierParProgression() {
    let a = apprenants
        .map(app => ({ app, p: calculerProgression(app) }))
        .sort((b, c) => c.p.progression - b.p.progression)

    titre("Classement par progression")
    for (let i = 0; i < a.length; i++) {
        console.log(`${i + 1} - ${a[i].app.nomComplet} - ${a[i].p.progression.toFixed(1)} % (${niveauDe(a[i].p.progression)})`)
    }
    console.log("--------------------------------------")
}

function trierParNom() {
    let a =apprenants.slice().sort((b, c) => b.nomComplet.localeCompare(c.nomComplet))

    titre("Apprenants par ordre alphabétique")
    for (let i = 0; i < a.length; i++) {
        console.log(`${i + 1} - ${a[i].nomComplet} - ${a[i].ville}`)
    }
    console.log("--------------------------------------")
}

function afficherApprenants() {
    titre("Liste des apprenants")
    for (let i = 0; i < apprenants.length; i++) {
        let p = calculerProgression(apprenants[i])
        console.log(`${i + 1} - ${apprenants[i].nomComplet} - ${apprenants[i].ville} - ${p.progression.toFixed(1)} %`)
    }
    console.log("--------------------------------------")
}

function afficherTableauDeBord() {
    let apprenantNumber = apprenants.length
    let solideNumber = 0
    let enProgressionNumber = 0
    let aRenforcerNumber = 0
    for (let i = 0; i < apprenants.length; i++) {
        let progression = calculerProgression(apprenants[i])
        if (progression.progression >= 80) {
            solideNumber++

        } else if (progression.progression >= 50 && progression.progression <= 79) {
            enProgressionNumber++

        } else if (progression.progression < 50) {
            aRenforcerNumber++
        }
    }

    titre("Tableau de bord")
    console.log("Apprenants      : " + apprenantNumber);
    console.log("Solide          : " + solideNumber);
    console.log("En progression  : " + enProgressionNumber);
    console.log("À renforcer     : " + aRenforcerNumber);
    console.log("--------------------------------------")
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

        choix = Number(prompt("Choisissez une option : "))

        switch (choix) {
            case 0:
                break;

            case 1:
                afficherTableauDeBord()
                break;

            case 2:
                afficherApprenants()
                break;

            case 3:
                ajouterApprenant()
                break
            case 4:
                let id = prompt("Entrer l'ID de l'apprenant : ")
                rechercherApprenant(id)
                break;
            case 5:
                enregistrerResultat()
                break;
            case 6:
                let nom = prompt("Entrer le nom complet de l'apprenant : ")
                rechercherApprenant(nom)
                break;
            case 7:
                filtrerParNiveau()
                break;
            case 8:
                trierParProgression()
                break;
            case 9:
                trierParNom()
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