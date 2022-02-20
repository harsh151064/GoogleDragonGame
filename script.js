
// variables and constants declaration

const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let jumping=false;
let speed = 80;
let lastPaintTime=0;
let a=0;
let b=200;
let c=100;
let score;
let start=false;
let gameOvr=false;

// Game functions defined in below section

// main function used for controlling and speed of game function and set interval

function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();     
}

//For Quick setting custom property of element

function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value)
}

// Collision func for collision detection

function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    )
  }

// Game over after collision detection

function gameOver() {
    start=false;
    gameOvr=true;
    musicSound.pause(); 
    startgame.innerHTML="Game Over<br> <small>(Press Enter To Restart) </small>" ;
}

// For retriving dynamic rect co-or of dino and cactus

function getDinoRect() {
    return dino.getBoundingClientRect()
}
 
 function getCactusRect() {
    return cactus.getBoundingClientRect()
}


// main game function for game logics


function gameEngine(){

//   Display the cactus

    setCustomProperty(cactus, "--left", c)

//   Display the game status 
    if(start==false ){
        startgame.innerHTML="Press Enter Key To Start"
    }
    if(start==true && score>0){
        startgame.innerHTML=" " 
    }

    // if(jumping==true){
    //     dino.src = `imgs/dino-stationary.png`;
    // }


//  Start func 

    if(start==true){
        musicSound.play();
        if(a==-200){a=200};
        if(b==-200){b=200};
        if(c==-5){
            c=100;
            score=score+1;
            scorebox.innerHTML="score:"+ score;
        }

        setCustomProperty(ground, "--left", a)
        setCustomProperty(ground1, "--left", b)
        a--,b--,c--
    }else{
        setCustomProperty(ground, "--left", a)
        setCustomProperty(ground1, "--left", b)
    }

//  Game over func 

    if(isCollision(getDinoRect(), getCactusRect())){
        gameOver();   
    }

}


window.requestAnimationFrame(main);

window.addEventListener('keydown',e =>{
      
    switch (e.key) {
        case "ArrowUp":
        if(start){
            setCustomProperty(dino,"--bottom", 55) 
            moveSound.play();
            jumping=true ; 
        }
            break;
        case "Enter":
            start=true; // Start the game
            if(start){ score=0;}
            if(gameOvr){
                 a=0; b=200; c=100; gameOvr=false;            //--------- Reset game----------- 
                 scorebox.innerHTML="score:"+ score;
                 startgame.innerHTML=" "
            }

        break;
    }
})
window.addEventListener('keyup',e =>{
    switch (e.key) {
        case "ArrowUp":
            setCustomProperty(dino,"--bottom", 7) 
            jumping=false
            break;
    }

})