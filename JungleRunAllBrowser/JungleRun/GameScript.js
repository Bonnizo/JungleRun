if( typeof helper == 'undefined' ) {
  var helper = { } ;
}

helper.arr = {
         /**
     * Function to sort multidimensional array
     * 
     * param {array} [arr] Source array
     * param {array} [columns] List of columns to sort
     * param {array} [order_by] List of directions (ASC, DESC)
     * returns {array}
     */
    multisort: function(arr, columns, order_by) {
        if(typeof columns == 'undefined') {
            columns = []
            for(x=0;x<arr[0].length;x++) {
                columns.push(x);
            }
        }

        if(typeof order_by == 'undefined') {
            order_by = []
            for(x=0;x<arr[0].length;x++) {
                order_by.push('ASC');
            }
        }

        function multisort_recursive(a,b,columns,order_by,index) {  
            var direction = order_by[index] == 'DESC' ? 1 : 0;

            var is_numeric = !isNaN(a[columns[index]]-b[columns[index]]);

            var x = is_numeric ? a[columns[index]] : a[columns[index]].toLowerCase();
            var y = is_numeric ? b[columns[index]] : b[columns[index]].toLowerCase();

            if(!is_numeric) {
                x = helper.string.to_ascii(a[columns[index]].toLowerCase(),-1),
                y = helper.string.to_ascii(b[columns[index]].toLowerCase(),-1);
            }

            if(x < y) {
                    return direction == 0 ? -1 : 1;
            }

            if(x == y)  {
                return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
            }

            return direction == 0 ? 1 : -1;
        }

        return arr.sort(function (a,b) {
            return multisort_recursive(a,b,columns,order_by,0);
        });
    }
}

var location;
var document;
var Image;
var window;
var openDatabase;
var sessionStorage;
//créer canvas background
var canvasPlaybg = document.getElementById("canvasBg");
var contextPlaybg = canvasPlaybg.getContext("2d");

/*var sc1 = new Score("player1", 1);
var sc2 = new Score("player2", 2);
var sc3 = new Score("player3", 3);
var sc4 = new Score("player4", 30);
var sc5 = new Score("player5", 4);

localStorage.setItem(1, JSON.stringify(sc4));
localStorage.setItem(2, JSON.stringify(sc3));
localStorage.setItem(3, JSON.stringify(sc5));
localStorage.setItem(4, JSON.stringify(sc1));
localStorage.setItem(5, JSON.stringify(sc2));*/

var listPlayer = [];
/*function retrieveScore() {

    for (var i=1; i <= localStorage.length; i++)  {
       var tmp = JSON.parse(localStorage.getItem(i));
        listPlayer[i] = tmp;

    }
    var ranking = helper.arr.multisort(listPlayer, ['score', 'pseudo'], ['DESC', 'ASC']);
    console.log(ranking);
    listPlayer = ranking;
}

retrieveScore();*/




//créer canvas Man
var canvasPlayMan = document.getElementById("canvasMan");
var contextPlayMan = canvasPlayMan.getContext("2d");

//photo trouble pour corriger 
contextPlayMan.imageSmoothingEnabled = false;
//créer canvas Trap
var canvasPlayTrap = document.getElementById("canvasTrap");
var contextPlayTrap = canvasPlayTrap.getContext("2d");

//créer canvas Score
var canvasPlayScore = document.getElementById("canvasScore");
var contextPlayScore = canvasPlayScore.getContext("2d");

//créer canvas Bonus
var canvasPlayBonus = document.getElementById("canvasBonus");
var contextPlayBonus = canvasPlayBonus.getContext("2d");

//creer image Play pour debut
 var playImage = new Image();
playImage.src = "Images/Menu/Play.png"; 
    
//dessiner image Play pour debut
contextPlaybg.drawImage(playImage,150,225);


//Gestion texte
//score
contextPlayScore.fillStyle = "#FFFFFF";
contextPlayScore.font= '30px Verdana';
//règles
contextPlaybg.fillStyle = "#FFFFFF";
contextPlaybg.font= '48px Verdana';


// creer image bg
 var playbgImage = new Image();
playbgImage.src = "Images/Play/background.png";
 var playgImage = new Image();
playgImage.src ="Images/Play/ground.png";

// creer image man
 var playmanImage = new Image();
playmanImage.src = "Images/Play/man.png";

//creer image trap
var playtrapImage = new Image();
playtrapImage.src = "Images/Play/trap.png";

//creer image menubg
var playmenubgImage = new Image();
playmenubgImage.src = "Images/Menu/bgMenu.png";

//creer image menubtPlay
var playmenubtPlay = new Image();
playmenubtPlay.src = "Images/Menu/play.png";

//creer image bonus
var playbonusImage = new Image();
playbonusImage.src ="Images/Play/bonus.png";

//Création course personnage
var spriteRun = new Image();
spriteRun.src = "Images/Play/spriteRun.png";

//Création saut personnage
var spriteJump = new Image();
spriteJump.src = "Images/Play/spriteJump.png";

//reference objet buttonplay
var playButton = new Button(230,375,150,225);



//valeur jeu constant
var gameWidth = canvasPlaybg.width;
var gameHeight = canvasPlaybg.height;
var stepRun = 0;
var stepJump = 0;


//controle si jeu lancé ou pas
var isPlaying = false;

//methode pour animation pour tous les browsers
var requestAnimFrame = window.requestAnimationFrame ||
                       window.webkitRequestAnimationFrame ||
                       window.mozRequestAnimationFrame ||
                       window.msRequestAnimationFrame ||
                       window.oRequestAnimationFrame ;
  
//var gestion apparition des traps
var traps = [];

//gestion apparition des bonus
var bonus = [];

//récupérer mouvement souris
var mouseX = 0;
var mouseY = 0;

//reference objet man1 global == Personnage
var man1 = new Man();

//reference global width pos hit
var widthposHit;

//musique 
var music;

//dessiner image bg et lancer le jeu
playbgImage.addEventListener("load", init, false);

//function pour tout initialiser *main*
function init(){
   
   drawMenu();
//evenement du clic poiur bouton play
 document.addEventListener('click',playClicked,false);
}

//fonction si on clique Play, lance jeu
function playGame(){
    //methode fix du background
    drawBg();
    //préparer le tab de trap qui vont apparaitre
    spawnTrap(1);
    //préparer le tab de bonus qui vont apparaitre
    spawnBonus(1);
    //methode en mouvement du perso
    startLoop();
   //lancer le score
    updateScore();
    //
    music = new sound("Musique/ambiance.mp3");
    music.play();
    
  
    //action avec le clavier
   //Quand touches appuyée

    
document.addEventListener('keydown',checkKeyDown,false);
    //quandtouche est lachée
 document.addEventListener('keyup',checkKeyUp,false);  
}

//function pour gérer spawn trap
function spawnTrap(numberTrap){
    for (var i = 0; i < numberTrap ; i++){
        traps[traps.length] = new Trap();
       
    }
}

//function dessiner trap
function drawAllTraps(){
    clearCtxTrap();
    for(var i = 0; i<traps.length; i++){
        traps[i].draw();
          
    }
}

//function pour gérer spawn bonus
function spawnBonus(numberBonus){
    for (var i = 0; i < numberBonus ; i++){
        bonus[bonus.length] = new BonusObj();
       
    }
}

//function dessiner trap
function drawAllBonus(){
    clearCtxBonusObj();
    for(var i = 0; i<bonus.length; i++){
        bonus[i].draw();
          
    }
}
//function quand le jeu marche , se répète tjrs
function loop(){
    //si true on peut dessiner et loop
    if(isPlaying){
    //dessiner perso avec methode draw du prototype
        
        
        
    man1.draw();
    moveBg();
    drawAllTraps();
    drawAllBonus();
    //appeler animation .. appelle loop en boucle
    requestAnimFrame(loop);
    }
}

//lancer le jeu
function startLoop(){
    //start game
    isPlaying = true;
    loop();
}

/*//arreter le jeu
function stopLoop(){
      //stop game
    isPlaying = false;
}
*/
//dessiner le background
function drawBg(){
clearCtxBg();
contextPlaybg.drawImage(playbgImage,bgDrawX1,0,gameWidth,gameHeight);
contextPlaybg.drawImage(playbgImage,bgDrawX2,0,gameWidth,gameHeight);
contextPlaybg.drawImage(playgImage,0,370,gameWidth,40);
}

//effacer bg
function clearCtxBg(){
    contextPlaybg.clearRect(0,0,gameWidth,gameHeight);
}

//nouvelle valeur
var bgDrawX1 = 0;
var bgDrawX2 = 600;
//faire bouger le menu
function moveBg(){
    bgDrawX1 -= 5;
    bgDrawX2 -= 5;
    if (bgDrawX1 <= -600){
        bgDrawX1 = 600;        
    }
    else if(bgDrawX2 <= -600){
        bgDrawX2 =600
    }
    drawBg();  
}


//dessiner le menu 
function drawMenu(){
    
contextPlaybg.drawImage(playbgImage,0,0,gameWidth,gameHeight);
contextPlaybg.drawImage(playmenubtPlay,230,150);      
}
//gerer le score
function updateScore(){
 contextPlayScore.clearRect(0,0,gameWidth,gameHeight);
 contextPlayScore.fillText("Score : " + man1.score, 240, 50)
}


//fin *main*


//objet button créé
//créé prototype button
function Button(xLeft, xRight, yTop, yBottom){
 
    //valeur du bord du bouton 
    this.xLeft = xLeft;
    this.xRight = xRight;
    this.yTop = yTop;
    this.yBottom = yBottom;    
}

//controler si click dans la bonne zone du bouton
Button.prototype.checkClicked = function (){
  if(this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom )
      return true;  
};


//fin prototype button
//objet man créé
//créer prototype man
function Man(){
    this.manWidthpos = 160;
    this.manHeightpos = 200;
    this.manWidth = playmanImage.width;
    this.manHeight = playmanImage.height;
   //variable de jeu
    //vitesse
    this.speed = 50 ;
    //score
    this.score = 0;
  
}


//chaque man pourra avoir fonction draw
Man.prototype.draw = function(){
    //redessiner le man pour deplacement 
clearCtxMan();  
this.checkDirection();
//image , depuis ou on selectionne sur sprite , x et y qu'on veut sélectionner, position ou on veut dessiner, et dimension destination dessin
this.spriteRun();  
this.updateManRun();  
this.updateManJump();      
this.checkHitTrap();   
this.checkHitBonus();
};

Man.prototype.spriteRun = function(){
   if(this.manHeightpos==200){
    contextPlayMan.drawImage(spriteRun,65*(Math.floor(stepRun)),0,65,172,this.manWidthpos,this.manHeightpos, 65,172);   
   }
    else{ contextPlayMan.drawImage(spriteJump,65+65*(Math.floor(stepJump)),0,65,172,this.manWidthpos,this.manHeightpos, 65,172);   
  }
}
Man.prototype.updateManRun = function(){
    stepRun+= 0.15;
   
    if( stepRun >= 6)
        stepRun -= 6;
}
Man.prototype.updateManJump = function(){
     stepJump+= 0.07;
    if( stepJump>= 5)
        stepJump -= 5;
}

//controle pour le dessin saut
Man.prototype.checkDirection = function(){
  //tester si la touche sauter est vraie 
   if(countKey==1){
       //autoriser a sauter 
      while(this.manHeightpos>130)
      this.manHeightpos -= this.speed;
      
      }
    else {
       while(this.manHeightpos < 200)
        this.manHeightpos += this.speed;
    } 
};


//Ajouter function pour que le Score augmente
Man.prototype.updateScoreMan = function(){
    //ajouter +5 points par trap
    this.score+= 5;
    updateScore();
};

//Ajouter function pour que le Score augmente a cause du bonus
Man.prototype.updateScoreManBonus = function(){
    //ajouter +5 points par trap
    this.score+= 2;
    updateScore();
};


//ajouter fonction controle hit Traps
 Man.prototype.checkHitTrap = function () {
    
        if(this.manHeightpos <= 200 && this.manHeightpos >= 200 - playtrapImage.height && this.manWidthpos + playmanImage.width >= widthposHit &&this.manHeightpos <= 200 && this.manHeightpos >= 200 - playtrapImage.height && this.manWidthpos + playmanImage.width <= widthposHit+62){
        
           isPlaying = false;
             music.stop();
          saveScore(man1.score);          
      location.href ="#page4";
    }
    
}
 //ajouter fonction controle hit Bonus
 Man.prototype.checkHitBonus = function () {
  
        if(this.manHeightpos <= bonus[0].bonusHeightpos && this.manHeightpos >= bonus[0].bonusHeightpos-72 && this.manWidthpos >= bonus[0].bonusWidthpos && this.manWidthpos <= bonus[0].bonusWidthpos + 72){
        bonus[0].loopBonus();
        man1.updateScoreManBonus();
            
    }
    
}
//effacer man
function clearCtxMan(){
 contextPlayMan.clearRect(0,0,gameWidth,gameHeight);
}

//fin prototype man


//créer prototype trap
function Trap(){
/* trapWidthpos  a changer pour rendre aleatoire 
la distance d'apparition */
//par Math.floor(Math.random()*gameWidth)
    this.trapWidthpos =  600 ;
    this.trapHeightpos = 330;
    this.trapWidth = playtrapImage.width;
    this.trapHeight = playtrapImage.height;
   
    //variable de jeu
    //vitesse
    this.speed = updateSpeed(man1.score);
}

//dessin pour prototype trap
Trap.prototype.draw = function(){
//redessiner le trap pour deplacement 
clearCtxTrap();  
this.trapWidthpos -= updateSpeed(man1.score)
widthposHit = this.trapWidthpos;
contextPlayTrap.drawImage(playtrapImage,this.trapWidthpos,this.trapHeightpos, this.trapWidth,this.trapHeight);   
this.checkAvoided();

};

//effacer trap
function clearCtxTrap(){
contextPlayTrap.clearRect(0,0,gameWidth,gameHeight);
}





//enlever le trap de list si il dépasse du bord
Trap.prototype.checkAvoided = function (){
    if(this.trapWidthpos + this.trapWidth <= 0 ){
        this.loopTrap();
        man1.updateScoreMan();
    } 
};
 //repousser un trap avec nouveau x
Trap.prototype.loopTrap = function (){

    this.trapWidthpos = 600;
};
//fin prototype trap


//créer prototype bonus
function BonusObj(){


    this.bonusWidthpos = 1500 ;
    this.bonusHeightpos = 100;
    this.bonusWidth = playbonusImage.width;
    this.bonusHeight = playbonusImage.height;
   
    //variable de jeu
    //vitesse
    this.speed = updateSpeed(man1.score);
}

//dessin pour prototype obj
BonusObj.prototype.draw = function(){
//redessiner le bonus pour deplacement 
clearCtxBonusObj();  
this.bonusWidthpos -= updateSpeed(man1.score);
contextPlayBonus.drawImage(playbonusImage,this.bonusWidthpos,this.bonusHeightpos, this.bonusWidth,this.bonusHeight);   
this.checkAvoidedBonusObj();

};

//effacer bonus
function clearCtxBonusObj(){
contextPlayBonus.clearRect(0,0,gameWidth,gameHeight);
}





//enlever le bonus de list si il dépasse du bord
BonusObj.prototype.checkAvoidedBonusObj = function (){
    if(this.bonusWidthpos + this.bonusWidth <= 0 ){
        this.loopBonus();
        } 
};
 //repousser un bonus avec nouveau x
BonusObj.prototype.loopBonus = function (){

    this.bonusWidthpos = updateWidthposBonus();
};
//fin prototype bonus


//evenement debut partie

//fonction pour la souris
//récupérer l'endroit ou click
function playClicked(e){
    
    mouseX = e.pageX - canvasPlaybg.offsetLeft;
    mouseY = e.pageY - canvasPlaybg.offsetTop  ;
    //enlever le bouton si play et sur règle
    if (!isPlaying) {
    //pour bouton play si click lance partie
    if(playButton.checkClicked())
        playGame();
}
    
}


function saveScore(scoreUp){
//méthode update score depuis le jeu quand party fini
    var pseudo = window.sessionStorage.getItem("pseudo");
    document.getElementById('loose').innerHTML = ('Dommage ' + pseudo + " ! Tu as perdu avec un score de : " + scoreUp);
    /*
    listPlayer.push(new Score(pseudo, scoreUp));
    
    var ranking = helper.arr.multisort(listPlayer, ['score', 'pseudo'], ['DESC', 'ASC']);
    listPlayer = ranking;
    
    console.log(" Game Script : listPlayer: " + listPlayer.length);
    
    for (var i = 0; i <= localStorage.length; i++) {
        var sc = new Score(listPlayer[i].pseudo, listPlayer[i].score);

        localStorage.setItem(i, JSON.stringify(sc));
    }*/
/*
        maBaseDeDonnees.transaction(function(t) {

                t.executeSql('INSERT INTO player ( Pseudo,Score) VALUES (?,?) ', [pseudo, scoreUp]);

       });*/
    
}


//fonction hauteur aléatoire bonus
function updateWidthposBonus(){
    
 var width =Math.floor(Math.random() * 4000) + 600;
    
    return width;
}



//fonction accélérer jeu
function updateSpeed(score){
    
    if (score<=30)
     return 5;
    
    else if(score>30 && score <=50)
    return 7;
    
     else if(score>50 && score <=90)
    return 9;
    
     else if(score>90 && score <=120)
    return 12;
    
     else if(score>120 && score <=150)
    return 14;
    
     else if(score>150 && score <=190)
    return 17;
 
    else return 20;
}
     

//fonction pour le clavier
var countKey = 0;
function checkKeyDown(e){
   //récupérer touche barre espace
    //get keyId peut importe le browser utilisé
    var keyID = e.keyCode || e.which;
    //32 = barre espace
    //38 = fleche haut
     
    if(keyID === 32 || keyID === 38){
      
        
        countKey++;
        e.stopImmediatePropagation();
      
       }
    
}
function checkKeyUp(e){
   //récupérer touche barre espace
    //get keyId peut importe le browser utilisé
    var keyID =  e.keyCode || e.which ;
    //32 = barre espace
    //38 = fleche haut
    if(keyID === 32 || keyID === 38 ){
     
        countKey = 0;
        e.preventDefault();
       
       } 
}

//musique 
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none"); 
  this.sound.setAttribute("Loop", "Loop");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

var $;

$('#refresh').click(function() {
    location.reload();
});
 $('#resetMenu').click(function() {
    location.reload();
    
});




