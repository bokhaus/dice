/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*******************************************
 * Global Scope
 *******************************************/
let scores, roundScore, activePlayer;
init();


/*******************************************
 * Event Listenters
 *******************************************/
//Event Listener for roll button
//Anon function this function cannot be used again. Usual way for a button function
document.querySelector('.btn-roll').addEventListener('click', function() {
    // 1. Random Number
    let dice = Math.floor(Math.random() * 6) + 1 ; //Math random adds 1 for 6 options
    console.log(dice); //REMOVE WHEN DEPLOYING -TESTING ONLY
    // 2. Display the result
    let diceDOM = document.querySelector('.dice'); // create a dom object and use this in place of document.querySelector. 
    diceDOM.style.display = 'block'; //display block

    //create string to manipulate the image. -> change dice image based on number in the name.
    //pulls the image which has the random number in the name.
    //image name example - dice-6.png is the same as -> diceDOM.src = 'dice-'(var dice = Math.floor(Math.random() * 6) + 1).png)
    diceDOM.src = 'static/img/dice-'+ dice + '.png'; 

    // 3. Update the round score IF the rolled number was NOT a 1.
    if(dice !== 1){
        //add score if not 1. This is using type coercion.
        roundScore += dice; //calculates round score for active player
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
    
    //Check if the player won the game
    if (scores[activePlayer] >= 20){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
        document.querySelector('.dice').style.display = 'none';

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
    document.querySelector('.dice').style.display = 'none'; //hides the class "dice" from initial display.

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

    document.querySelector('.dice').style.display = 'none'; //This removes the dice and puncuates the change in turn.

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
