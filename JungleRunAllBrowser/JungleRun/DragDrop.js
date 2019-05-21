// permet d'être déplacé

function allowDrop(ev) {
	ev.preventDefault();
}

//définit le types de données  a transferer
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

//La troisième définit le type de données et définit où peut être "lacher" le drop.
function drop(ev) {
	ev.preventDefault();

	var avis = document.getElementById("avis");
	var data = event.dataTransfer.getData("Text");

	if(event.target.className == "dropZone"){
		avis.style.display ="none";
		messageDrag(data)
	}
}

function messageDrag (data){
	if(data =="Oui")
		alert("Merci de votre retour et bon jeu !");
	else 
		alert("Nous allons essayé d'améliorer le jeu pour qu'il vous plaise !")
}
