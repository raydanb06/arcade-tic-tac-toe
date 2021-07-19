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
    winnerElem.innerHTML = "";

};

const newGameState = () => {
    state.board = [ null, null, null,
                    null, null, null,
                    null, null, null, ];
    state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
    state.currentPlayerIdx = Math.floor(Math.random() * state.players.length);
    // console.log(state.currentPlayerIdx);
}


// ****** DOM SELECTORS ******
const boardElem = document.querySelector('#board');
// console.log('boardElem', boardElem);

const playerTurnElem = document.querySelector('#player-turn');
// console.log('playerTurnElem', playerTurnElem);

const scoresElem = document.querySelector('#scores');
// console.log('scoresElem', scoresElem);

const winnerElem = document.querySelector('#winner');


// ****** GAME LOGIC HELPER FUNCTIONS ******
const changeTurn = () => {
    state.currentPlayerIdx = (state.currentPlayerIdx + 1) % 2;
};

const takeTurn = (cellIdx) => {
    if (state.start === 0) {
        return;
    } 
    else if (state.start === 1) {
        if (state.board[cellIdx] === null) {
            if (state.currentPlayerIdx === 0) {
                // console.log('event.target: ', event.target);
                // console.log('cellIdx: ', cellIdx);
                state.board[cellIdx] = 'X'
                checkWin();
                changeTurn();
                render();
            } 
            else {
                state.board[cellIdx] = 'O'
                checkWin();
                changeTurn();
                render();
            }
        }
    }
    else if (state.start === 2) {
        if (state.getCurrentPlayer() !== "Computer") {
            state.board[cellIdx] = 'X'
            checkWin();
            changeTurn();
            render();
        }
        computerTurn();
    }
};

const checkWin = () => {
    const isNotNull = (str) => str !== null;
    if (state.board[0] === state.board[1] && state.board[1] === state.board[2] && state.board[0] !== null) {
        state.scores[state.currentPlayerIdx]++;
        winnerElem.innerHTML = `${state.getCurrentPlayer()} won a point!`;
        newGameState();
    }
    else if (state.board[3] === state.board[4] && state.board[4] === state.board[5] && state.board[3] !== null) {
        state.scores[state.currentPlayerIdx]++;
        winnerElem.innerHTML = `${state.getCurrentPlayer()} won a point!`;
        newGameState();
    }
    else if (state.board[6] === state.board[7] && state.board[7] === state.board[8] && state.board[7] !== null) {
        state.scores[state.currentPlayerIdx]++;
        winnerElem.innerHTML = `${state.getCurrentPlayer()} won a point!`;
        newGameState();
    }
    else if (state.board[0] === state.board[3] && state.board[3] === state.board[6] && state.board[0] !== null) {
        state.scores[state.currentPlayerIdx]++;
        winnerElem.innerHTML = `${state.getCurrentPlayer()} won a point!`;
        newGameState();
    }
    else if (state.board[1] === state.board[4] && state.board[4] === state.board[7] && state.board[1] !== null) {
        state.scores[state.currentPlayerIdx]++;
        winnerElem.innerHTML = `${state.getCurrentPlayer()} won a point!`;
        newGameState();
    }
    else if (state.board[2] === state.board[5] && state.board[5] === state.board[8] && state.board[2] !== null) {
        state.scores[state.currentPlayerIdx]++;
        winnerElem.innerHTML = `${state.getCurrentPlayer()} won a point!`;
        newGameState();
    }
    else if (state.board[0] === state.board[4] && state.board[4] === state.board[8] && state.board[0] !== null) {
        state.scores[state.currentPlayerIdx]++;
        winnerElem.innerHTML = `${state.getCurrentPlayer()} won a point!`;
        newGameState();
    }
    else if (state.board[2] === state.board[4] && state.board[4] === state.board[6] && state.board[2] !== null) {
        state.scores[state.currentPlayerIdx]++;
        winnerElem.innerHTML = `${state.getCurrentPlayer()} won a point!`;
        newGameState();
    }
    else if (state.board.every(isNotNull)) {
        winnerElem.innerHTML = "Game is a draw!";
        newGameState();
    }
};

const computerTurn = () => {
    let randCellIdx = Math.floor(Math.random() * state.board.length);
    if (state.board[randCellIdx] === null) {
        state.board[randCellIdx] = 'O'
        checkWin();
        changeTurn();
        render();
    }
    else {
        computerTurn();
    }
};

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
};

const renderPlayer = () => {
    let text;

    if (!state.players[0] && !state.players[1]) {
        text = `
            <input name="player1" placeholder="Enter Player 1">
            <input name="player2" placeholder="Enter Player 2">
            <button class="start">Start Game</button>
            <button class="1playermode">Single Player</button>
            <div id="note">Enter Player 1 name and click Single Player to play against computer.</div>
        `;
    }
    else if (state.players[0] === "Computer" || state.players[1] === "Computer") {
        text = `It's ${state.getCurrentPlayer()}'s turn.
                <button class="new-game">New Game</button>
                <button class="reset">Reset</button>
                `;
        state.start = 2;
    }
    else if (state.players[0] || state.players[1]) {
        text =  `It's currently ${state.getCurrentPlayer()}'s turn.
                <button class="new-game">New Game</button>
                <button class="reset">Reset</button>
                `;
        state.start = 1;
    }
    playerTurnElem.innerHTML = text;
};

const renderScores = () => {
    scoresElem.innerHTML = `
        <div>${state.players[0]}: ${state.scores[0]}</div>
        <div>${state.players[1]}: ${state.scores[1]}</div>
        `;
};

const render = () => {
    renderScores();
    renderBoard();
    renderPlayer();
};


// ****** EVENT LISTENERS ******
boardElem.addEventListener('click', function(event) {
    if (event.target.className === 'cell') {
        const cellIdx = event.target.dataset.index;
    takeTurn(cellIdx);
    }
    else return;
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
        newGameState();
        render();
    }
    else if (event.target.className === 'reset') {
        resetState();
        render();
    }
});

playerTurnElem.addEventListener('click', function(event) {
    if (event.target.className === '1playermode') {
        const player1Input = document.querySelector('input[name=player1]');
        state.players[0] = player1Input.value;
        state.players[1] = "Computer";
        render();
    }
});


// ****** BOOTSTRAPPING ******
resetState();
render();