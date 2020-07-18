/* variable */ 
let level = 0;
let color = ["red", "blue", "green", "yellow"];
let ans = [];
let selected = [];
let started = false;

/*function*/
let changeTurn = (lev) => document.querySelector("h1").innerHTML = ("Level " + lev);

let makeSound = (color) => { //question, correct answer
    let sound = new Audio ("sounds/" + color + ".mp3");
    sound.play();
}

let pressed = (color) => { //question, correct answer
    makeSound(color);
    document.querySelector("#" + color).classList.add("pressed");
    setTimeout(() => { 
        document.querySelector("#" + color).classList.remove("pressed");
    }, 100);
}

let fail = () => {
    document.querySelector("body").classList.add("game-over");
    document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
    let sound = new Audio("sounds/wrong.mp3");
    sound.play();

    setTimeout(() => { 
        document.querySelector("body").classList.remove("game-over");
    }, 150);
}

function checkAns(turn){
    for(let i=0; i<turn; i++){
        if(selected[i]!==ans[i]) return false;
    }
    return true;
}

$(".btn").click(function() {
    let myColor = $(this).attr("id");
    console.log(myColor);
    selected.push(myColor);
    pressed(myColor);

    if(ans[selected.length-1]!==selected[selected.length-1]){
        fail();
        started=false;
    }

    else if(selected.length===ans.length){
        setTimeout(function () {
            nextSeq();
          }, 1000);
    }
});


document.addEventListener("keypress", () => {
    if(!started){
        //restart 할때 배열 초기화하기
        ans = []; level=0;
        nextSeq();
        started=true;
    }
});

function nextSeq(){
    level++; selected = []; //init
    changeTurn(level); //print
    var coloridx = Math.floor((Math.random()*4)); 
    ans.push(color[coloridx]); //finish input

    makeSound(ans[ans.length-1]);
 //   $("#" + ans[ans.length-1]).fadeOut().fadeIn(); //effect
    $("#" + ans[ans.length-1]).fadeIn(100).fadeOut(100).fadeIn(100);
}
