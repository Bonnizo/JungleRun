


//Créer le Joueur avec pseudo qu'il introduit dans home formulaire et score  par défaut à 0
function save(){

var maBaseDeDonnees = openDatabase('myDB', '1.0', 'Base de données de stockage pour classement', 2097152);


maBaseDeDonnees.transaction(function(t) {
    t.executeSql("CREATE TABLE IF NOT EXISTS Player(id INTEGER PRIMARY KEY, Pseudo TEXT, Score INTEGER)");
  });


var id ;

var pseudo = document.getElementById("pseudo").value;
    sessionStorage.setItem("pseudo", pseudo);

var score = 0;

    if( pseudo !==""){

  location.href='#page2';
     }
    else {}

}

var link = document.getElementById("save");

link.addEventListener("click", function () {

save();

});

