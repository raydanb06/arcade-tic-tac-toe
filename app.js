// TESTING
let testElem = document.querySelector('#board');
console.log('testElem', testElem);

// STATE
let state = {};

function resetState() {
    state.board = [ null, null, null,
                    null, null, null,
                    null, null, null, ];
}

// DOM SELECTORS
let boardElem = document.querySelector('#board');
console.log('boardElem', boardElem);

// DOM MANIPULATION FUNCTIONS
function renderBoard() {
   // empty the element
   boardElem.innerText = '';
   for(let i = 0; i < state.board.length; i++){
     let card = state.board[i];
     // create a cell
     let cellElem = document.createElement('div');
     cellElem.classList.add('cell');
     cellElem.dataset.index = i;
     cellElem.innerHTML = card;
     boardElem.appendChild(cellElem);
    }
}

// BOOTSTRAPPING
resetState();
renderBoard();