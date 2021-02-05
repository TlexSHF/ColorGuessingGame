//Kommentarer fra Kim
/*---------------------------------------------------------------------------------
Kommenter over alle funksjonene dine sånn basic hva den spesifikke funksjonen gjør, 
Så blir det mye lettere å tolke når man skal lese inni funksjonen.
Skrive feil i commenten på difficultythree() tror jeg. 
Står random color mellom 0 og 255, men det er mellom 150 og 175 er det ikke?
Nice workaround "this" ved å bruke "whichbox" og useranswer tho. 
Bra logist tenking. Even tho det hadde vært mye kortere med å bruke "this". 
---------------------------------------------------------------------------------*/
//Kommentarer fra Noor
/*---------------------------------------------------------------------
Når du trykker på en av boksene så endrer borderen posisjonen på div'en 
(altså er ikke lenger midtstilt) om det er noe du bryr deg om
kanskje istedenfor å vise den samme borderen om du trykker rett eller 
galt så kan du ha en rød border hvis du trykker galt også
utenom det så var det nice.
---------------------------------------------------------------------*/
const bigBox                = document.getElementById("big-box");
const smoll1                = document.getElementById("smoll1");
const smoll2                = document.getElementById("smoll2");
const smoll3                = document.getElementById("smoll3");
const scoreBox              = document.getElementById("score-box");
const streakBox             = document.getElementById("streak-box");
const exitBtn               = document.getElementById("exit-btn");
const exitMsg               = document.getElementById("exit-message");
const nameBox               = document.getElementById("name-box");
const okBtn                 = document.getElementById("ok-btn");
const resultHere            = document.getElementById("result-here");
const menu                  = document.getElementById("menu");
const startBtn              = document.getElementById("start-btn");
const scoreList             = document.getElementById("score-list");
const difficultyChooser     = document.getElementById("difficulty-chooser");
const easyBtn               = document.getElementById("easy-btn");
const mediumBtn             = document.getElementById("medium-btn");
const hardBtn               = document.getElementById("hard-btn");
const infoBox               = document.getElementById("info-box");
const ruleBtn               = document.getElementById("rule-btn");
const backBtn1              = document.getElementById("back-btn-1");
const backBtn2              = document.getElementById("back-btn-2");
//var boxes = document.getElementsByClassName("")       ?-?-?-?-?-?

var userAnswer;                 //Which of the three divs the user picks each round in a game.
var color1;
var color2;
var color3;

var score;                      //Total Points based on right answers in specific difficulty timed with the streak
var streak;                     //Number of correct answers in a row
var corrects;                   //Number of correct answers throughout the game
var wrongs;                     //Number of wrong answers throughout the game
var player = 0;                 //Individual player numbers given each game, in case you dont want your own name on the scoreboard.

exitBtn.addEventListener('click', exit);       //Whenever you click the exitBtn during game, you will save your score and exit.

/* objects that sets different values for different difficulties */
const difficulties = {
        "easy": {
            "min": 0, "max": 255
        }, 
        "medium": {
            "min": 150, "max": 200
        }, 
        "hard": {
            "min": 150, "max": 170
        }, 
    }

var difficulty;                 //Three difficulty lvls - colors will be more similar based on difficulty
var scorePointsPicker;          //How many points you get pr correct - based on difficulty (higher difficulty => more points)

startUp();
                            //IMPLEMENETER FOR LØKKE GENERER DIVER

//Function startUp
/*--------------------------------------------------------
Function for resetting scores, and displaying scores 
for all previous games each time the menu is visited.

Hides the content for info and difficulty. 
Two buttons that open the two menus for info and difficulty.
-----------------------------------------------------------*/
function startUp(){
    userAnswer = 0;
    score = 0;
    streak = 0;
    corrects = 0;
    wrongs = 0;

    streakBox.innerHTML = ``;
    scoreBox.innerHTML = `Score:<br>${score}`;

    menu.style.visibility = "visible";
    difficultyChooser.style.visibility = "hidden";
    infoBox.style.visibility = "hidden";

    startBtn.onclick = chooseDifficulty;
    ruleBtn.onclick = showRules;
}

// Function showRules
/* Displays the info-table, with useful info about the game */
function showRules(){
    infoBox.style.visibility = "visible";
    backBtn2.onclick = startUp;
}

// Function chooseDifficulty
/*--------------------------------------
Displays a difficulty menu.
Choose a difficulty (Easy, Medium, Hard).

Start the game with newRound() function,
with the difficulty as parameters.
---------------------------------------*/
function chooseDifficulty(){

    difficultyChooser.style.visibility = "visible";

    easyBtn.onclick = easy;
    mediumBtn.onclick = medium;
    hardBtn.onclick = hard;

    backBtn1.onclick = startUp;

    function easy(){   
        difficultyChooser.style.visibility = "hidden";
        difficulty = 1
        newRound(difficulty);
    }
    function medium(){ 
        difficultyChooser.style.visibility = "hidden";
        difficulty = 2
        newRound(difficulty);
    }
    function hard(){
        difficultyChooser.style.visibility = "hidden";
        difficulty = 3
        newRound(difficulty);
    }
}
// Function newRound
/*---------------------------------------------
Every new load of colors. 
Loads at the beginning, and each time you guess 
( No matter if its right or wrong )
---------------------------------------------*/
function newRound(difficulty){
    menu.style.visibility = "hidden";
    exitMsg.style.visibility = "hidden";

    //Runs different "color-schemes" based on difficulty. (Harder difficulty -> more similiar colors)
    if(difficulty === 1){   difficultyOne();   }
    else if(difficulty === 2){  difficultyTwo();    }
    else if(difficulty === 3){  difficultyThree();  }

    //Give backgroundcolor with the random rgb colors from the color variables
    smoll1.style.backgroundColor = color1;
    smoll2.style.backgroundColor = color2;
    smoll3.style.backgroundColor = color3;

    //array with the three divs colors in it
    var allBoxes = [color1, color2, color3];

    //picks out random which of the divs color in the allBoxes array to use
    var whichBox = allBoxes[ Math.floor (Math.random() * 3)];

    //colors the big box with the color chosen
    bigBox.style.backgroundColor =  whichBox;

    //chooses witch box is the correct
    if (whichBox === allBoxes[0]){
        correctAnswer = 1;
    }
    else if (whichBox === allBoxes[1]){
        correctAnswer = 2;
    }   
    else{
        correctAnswer = 3;
    }

    //when clicking one of the boxes, it will be highlighted, 
    //and later checked if it is right or wrong (in box1/2/3Clicked() function)
    smoll1.onclick = box1Clicked;
    smoll2.onclick = box2Clicked;
    smoll3.onclick = box3Clicked;
}
function difficultyOne(){

    //Get color range from the difficulties objects
    let dif = difficulties.easy;

    //Gives three random combinations of rgb colors
    color1 = rdmRGB(dif.min, dif.max);
    color2 = rdmRGB(dif.min, dif.max);
    color3 = rdmRGB(dif.min, dif.max);

    scorePointsPicker = 10;
}
function difficultyTwo(){

    //Get color range from the difficulties objects
    let dif = difficulties.medium;

    //Gives three random combinations of rgb colors (between 150 and 200)
    color1 = rdmRGB(dif.min, dif.max);
    color2 = rdmRGB(dif.min, dif.max);
    color3 = rdmRGB(dif.min, dif.max);

    scorePointsPicker = 15;
}
function difficultyThree(){
    //Get color range from the difficulties objects
    let dif = difficulties.hard;
    
    //Gives three random combinations of rgb colors (between 150-170)
    color1 = rdmRGB(dif.min, dif.max);
    color2 = rdmRGB(dif.min, dif.max);
    color3 = rdmRGB(dif.min, dif.max);

    scorePointsPicker = 20;
}

// Random RGB
/* returns random rgb value "rgb(min-max, min-max, min-max)" */
function rdmRGB(min, max){
    let r = rdmRange(min, max);
    let g = rdmRange(min, max);
    let b = rdmRange(min, max);
    return `rgb(${r}, ${g}, ${b})`;
}

// Random Range
/* returns random number between a range of min and max */
function rdmRange(min, max){
    return Math.floor (Math.random() * (max - min + 1) + min);
}
//One of boxes is clicked
/* -----------------------------------------------------------------------
Your answer (userAnswer) is now saved
Then gives the box a border, and undoes the styling afterwards for effect. 
Sets a timeout so you actually see it change, before un-changing
------------------------------------------------------------------------*/
function box1Clicked(){
    userAnswer = 1;
    var x = smoll1;
    style(x);
    setTimeout(result, 0);   
}
function box2Clicked(){
    userAnswer = 2;
    var x = smoll2;
    style(x);
    setTimeout(result, 0);
}
function box3Clicked(){
    userAnswer = 3;
    var x = smoll3;
    style(x);
    setTimeout(result, 0);
}

//styles the boxes when clicked
function style(x){
    x.style.width = "220px";
    x.style.height = "220px";
    x.style.border = `10px solid rgb(121, 203, 177)`;
    setTimeout(function(){deStyle(x)}, 100);
}
//Undoes the styling - for effect
function deStyle(x){ 
    x.style.width = "";
    x.style.height = "";
    x.style.border = ``;    
}

//Result
/*------------------------------------------------------------------
Checkes if you answered correctly.
Gives you 1+ correct (helps save your corrects and wrongs upon exit)
Gives you 1+ streak, so you can keep count on how well you are doing
(Higher streak => Even higher score in the end)
Score is calculated from difficulty * current streak
------------------------------------------------------------------*/
function result(){

    if(userAnswer === correctAnswer){
        corrects ++;
        streak ++;
        score += scorePointsPicker * streak;

        //When getting 2 right in a row, you will see your Streak
        if(streak > 2){ streakBox.innerHTML = `x${streak}! :D`; }
        else{   streakBox.innerHTML = ``; }

        //Your score will be shown also
        scoreBox.innerHTML = `Score:<br>${score}`;

        //At last: run new colors (still keeping your difficulty, corrects, streak etc)
        newRound(difficulty);
    }
    else{
        wrongs ++;
        streak = 0;
        streakBox.innerHTML = `:(`;
        newRound(difficulty); 
    }
}
//When clicking the Exit button
/*----------------------------------------------------------------------------------------------
You will get a player number based on how many before you (without reloading page), have played.
Pop up box tells you how many right and wrongs,
and gives you the opportunity to write your name, or go with the generic Player1 etc.
----------------------------------------------------------------------------------------------*/
function exit(){
    player++;
    exitMsg.style.visibility = "visible";

    resultHere.innerHTML = `
        <h1>You got ${corrects} right and ${wrongs} wrong!</h1>
        <p><br>Type your name here:</p>
        <input id="name-box" type="text" value="Player ${player}"/>
    `;

    okBtn.addEventListener('click', addName);
}
//When clicking the ok button (after clicking the exit button)
/*  Adding your name and score to the scoreboard */
function addName(){
    var newName = document.getElementById("name-box").value;
    scoreList.innerHTML += `<p>${newName}: &nbsp &nbsp &nbsp &nbsp ${score} points</p>`;
    startUp();
}   