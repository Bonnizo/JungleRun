//Créer le Joueur avec pseudo qu'il introduit dans home formulaire et score  par défaut à 0
function save(){
	var id ;
	var pseudo = document.getElementById('pseudo').value;
	window.sessionStorage.setItem('pseudo', pseudo);
	var score = 0;

	if(pseudo !=="") {
		location.href='#page2';     
	}
}

var link = document.getElementById("save");

link.addEventListener("click", function () { 
	save();
});

