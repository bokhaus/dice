/*******************************************
 * Global Scope
 *******************************************/
let scores, roundScore, activePlayer, input, winningScore;

//Starts the game fresh
init();


/*******************************************
 * Event Listenters
 *******************************************/
//Event Listener for roll button
//Anon function this function cannot be used again. Usual way for a button function
document.querySelector('.btn-roll').addEventListener('click', function() {
    // 1. Random Number
    let dice1 = Math.floor(Math.random() * 6) + 1 ; //Math random adds 1 for 6 options
    let dice2 = Math.floor(Math.random() * 6) + 1 ; //Math random adds 1 for 6 options
    console.log(dice1, dice2); //REMOVE WHEN DEPLOYING -TESTING ONLY
    
    // 2. Display the result
    document.getElementById('dice-1').style.display = 'block'; //gets value from random number for dice-1
    document.getElementById('dice-2').style.display = 'block'; //gets value from random number for dice-2
    
    //create string to manipulate the image. -> change dice image based on number in the name.
    //pulls the image which has the random number in the name.
    //image name example - dice-6.png is the same as -> diceDOM.src = 'dice-'(var dice = Math.floor(Math.random() * 6) + 1).png)
    document.getElementById('dice-1').src = 'static/img/dice-'+ dice1 + '.png'; 
    document.getElementById('dice-2').src = 'static/img/dice-'+ dice2 + '.png'; 

    // 3. Update the round score IF the rolled number was NOT a 1.
    if(dice1 !== 1 && dice2 !== 1){
        //add score if not 1. This is using type coercion.
        roundScore += dice1 + dice2; //calculates round score for active player
        document.querySelector('#current-' + activePlayer).textContent = roundScore; //ads round score to active player

    }else{
        nextPlayer();
    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add CURRENT score to GLOBAL (Overall) score
    scores[activePlayer] += roundScore;
    
    //Update User Interface with score (DOM manipulation)
     //use active player to construct the string for DOM
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; //selects active player score from the array.
    
    input = document.querySelector('.final-score').value; //takes input from user to set the score for a win.
    
    //Undefined, 0, null or "" are coerced to false
    //Anything else is coerced to true
    //input is implied true
    if(input) {
        winningScore = input; //user input winning score.

    } else {
        winningScore = 100; //default score to win.
    }

    //Check if the player won the game
    if (scores[activePlayer] >= winningScore){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';

        // Manipulate the css using DOM
        hideDice();

        //Access the class list of the element to add and remove classes. 
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');//Adds winner class to show winner CSS
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); //Removes active class. 
        disableBtn(); //disables buttons when winner is determined.
        
    } else {
        //Next player
        nextPlayer(); //changes the activePlayer
    }
});

//Starts new game when new game button is clickedby calling init(). 
document.querySelector('.btn-new-game').addEventListener('click', init);

/*******************************************
 * Functions
 *******************************************/
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; // determines which player has turn
    
    // Manipulate the css using DOM
    hideDice();

    //Set all elements to zero for start of the game.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //Removes winner class to start new game
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //Removes active class to start new game
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //Adds active class back to first player to start new game.
    document.querySelector('.player-0-panel').classList.add('active');
    
    //resets play-to score
    document.querySelector('.final-score').value = '';
    
    //document.getElementById('textPlaceHolder').placeholder = 'Final Score';
    //Change the STATE of button enables roll dice and hold buttons.
    enableBtn();
}

function nextPlayer(){

    //Move to next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //ternary operator same as if-else statement
    roundScore = 0; // reset current score to zero since activePlayer changed.

    document.getElementById('current-0').textContent = '0'; // set current to zero
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active'); //toggle activePlayer off/on 
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Manipulate the css using DOM
    hideDice();
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none'; //gets value from random number for dice-1
    document.getElementById('dice-2').style.display = 'none'; //gets value from random number for dice-2
}

//Change the STATE of button 
function disableBtn(){ //disables buttons to prevent adding more to the score after win.
    document.getElementById('roll-btn').disabled = true;
    document.getElementById('hold-btn').disabled = true;
         
}

//Change the STATE of button 
function enableBtn(){
    document.getElementById('roll-btn').disabled = false;
    document.getElementById('hold-btn').disabled = false;
}


/*******************************************
 * Scratchpad - Testing
 *******************************************/
//Setter - but may also be used as a getter when not setting a value but reading a value and storing in a variable.
//document.querySelector('#current-' + activePlayer).textContent = dice; //dynamic- only need to write code once and use for both players (plain text)
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; //This way (italics) - must be set up as a string.
