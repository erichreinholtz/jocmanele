
function game(){

console.log("Began game");

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

// loading the images
let road = new Image();
road.src = "images/street.png";

let character = new Image();
character.src = "images/character.png";

let money = new Image();
money.src = "images/euro.png";

let boom = new Image();
boom.src = "images/explosion.gif";

let audio = new Audio();
audio.src = "music/track.mp3";

console.log("Done loading materials");

//let euro = new Collectable(money, 0, 0);


road.onload = function(){
    
    console.log("Onload done. Beginning game loop");

    requestAnimationFrame(gameLoop);
}


let moneyPos = [10, 130, 265, 390];

let xOffSet = -165;
let yOffSet = -512;

let xOffSetEuro = moneyPos[0];
let yOffSetEuro = 0;

let roadSpeed = 6;
let charSpeed = 0;
let charDiffSpeed = 0;
let topSpeed = 1.8;

let charX = 55;

let left = false;
let right = false;

let isGameOver = false;
let points = 0;
let fails = 0;
let maxFails = 3;

let played = false;


function gameLoop(){

    
    // getting key input
        document.addEventListener('keydown', function(event) {
            // left key pressed
            if(event.keyCode == 37) {
                left = true; right = false;
                console.log("Left pressed");
            }
            // right key pressed
            else if(event.keyCode == 39) {
                left = false; right = true;
                console.log("Right pressed");
            }
            // no key pressed
            else {
                left = false; right = false;
            }
        });

     
    
    

    // drawing the road
    if(yOffSet >= 0)
        yOffSet = -512;

   
    context.drawImage(road, xOffSet, yOffSet);
    context.drawImage(road, xOffSet, yOffSet + 512);
    context.drawImage(road, xOffSet, yOffSet + 1024);


    //drawing the money

    // checking if player has caught the money
    let caught = false;
    if( Math.abs((charX + 120) - xOffSetEuro) < 100 && yOffSetEuro <= 700 && yOffSetEuro >= 600)
        caught = true;

    if(yOffSetEuro >= 900 || caught){

        if(caught){
            context.drawImage(boom, xOffSetEuro - 100, yOffSetEuro - 280);
            points += 1;
        }
        else
            fails += 1;

        // reset money
        yOffSetEuro = 0;
        
        // change x offset to random variable

        let newid = Math.round(Math.random() * 3);

        xOffSetEuro = moneyPos[newid];

    }
    context.drawImage(money, xOffSetEuro, -150 + yOffSetEuro, 110, 65);


    // drawing the character
    // image size 504 x 360

    if(left == true) {
        // console.log("Moving character to left"); 
            charSpeed = -topSpeed;
        }
         
    if(right == true) {
            charSpeed = topSpeed;
        }
        

    charX += charSpeed;

    // checking boundaries
    if(charX > 270) charX = 270;
    if(charX < -140) charX = -140;

    context.drawImage(character, charX, 450, 432, 308);

    yOffSet += roadSpeed;
    yOffSetEuro += roadSpeed;

    if(!played){
        audio.play();
        played = true;
    }
    // UPDATE SCOREBOARD
    let scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = "<p><b>SCOR: " + points + "</b></p><p style='color:red;'><b>RATARI: " + fails + "/" + maxFails + "</b></p>"

    // let sound = document.getElementById("sound");
    // sound.innerHTML = '<source src="music/track.mp3">';
    
    if(fails < maxFails)
        requestAnimationFrame(gameLoop);
    
    else alert("Ai ratat prea multi euroi, bossule! Scorul tau este " + points + ". Reimprospateaza pagina si mai incearca!");
}

}