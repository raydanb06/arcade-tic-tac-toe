// ****** TESTING ******
const testElem = document.querySelector('#board');
// console.log('testElem', testElem);


// ****** STATE ******
const state = {};

const resetState = () => {
    state.board = [ null, null, null,
                    null, null, null,
                    null, null, null, ];
    state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
    state.players = ['',''];
    state.currentPlayerIdx = Math.floor(Math.random() * state.players.length);
    // console.log(state.currentPlayerIdx);
    state.start = 0;
    state.scores = [0,0];
}


// ****** DOM SELECTORS ******
const boardElem = document.querySelector('#board');
// console.log('boardElem', boardElem);

const playerTurnElem = document.querySelector('#player-turn');
// console.log('playerTurnElem', playerTurnElem);

const scoresElem = document.querySelector('#scores');
// console.log('scoresElem', scoresElem);


// ****** GAME LOGIC HELPER FUNCTIONS ******
const changeTurn = () => {
    state.currentPlayerIdx = (state.currentPlayerIdx + 1) % 2;
}


// ****** DOM MANIPULATION FUNCTIONS ******
const renderBoard = () => {
   // empty the element
   boardElem.innerText = '';
   for(let i = 0; i < state.board.length; i++){
     const cell = state.board[i];
     // create a cell
     const cellElem = document.createElement('div');
     cellElem.classList.add('cell');
     cellElem.dataset.index = i;
     cellElem.innerHTML = cell;
     boardElem.appendChild(cellElem);
    }
}

const renderPlayer = () => {
    let text;

    if(!state.players[0] || !state.players[1]) {
        text = `
            <input name="player1" placeholder="Enter Player 1">
            <input name="player2" placeholder="Enter Player 2">
            <button class="start">Start Game</button>
        `;
    } else {
        text =  `It's currently ${state.getCurrentPlayer()}'s turn.
                <button class="new-game">New Game</button>`;
        state.start = 1;
    }
    playerTurnElem.innerHTML = text;
}

const renderScores = () => {
    scoresElem.innerHTML = `
        <div>${state.players[0]}: ${state.scores[0]}</div>
        <div>${state.players[1]}: ${state.scores[1]}</div>
        `;
}

const render = () => {
    renderScores();
    renderBoard();
    renderPlayer();
}


// ****** EVENT LISTENERS ******
boardElem.addEventListener('click', function(event) {
    const cellIdx = event.target.dataset.index;
    
    if (state.start === 0) {
        return;
    } else {
        if(event.target.className === 'cell' && state.board[cellIdx] === null) {
            if(state.currentPlayerIdx === 0) {
                // console.log('event.target: ', event.target);
                // console.log('cellIdx: ', cellIdx);
                state.board[cellIdx] = 'X'
                changeTurn();
                render();
            } else {
                state.board[cellIdx] = 'O'
                changeTurn();
                render();
            }
        } 
    }
    
});

playerTurnElem.addEventListener('click', function(event) {
    if (event.target.className !== 'start') return;
    // console.log('foo');
    const player1Input = document.querySelector('input[name=player1]');
    state.players[0] = player1Input.value;
    const player2Input = document.querySelector('input[name=player2]');
    state.players[1] = player2Input.value;
    render();  
  });
  
  playerTurnElem.addEventListener('click', function(event) {
    if (event.target.className === 'new-game') {
        resetState();
        render();
    }
  });

  
// ****** BOOTSTRAPPING ******
resetState();
render();