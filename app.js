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

let resetButtonElem = document.querySelector('#resetButton');
console.log('resetButtonElem', resetButtonElem);

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

// EVENT LISTENERS
boardElem.addEventListener('click', function(event) {
    let cellIdx = event.target.dataset.index;
    
    if(event.target.className === 'cell' && state.board[cellIdx] === null) {
        console.log('event.target: ', event.target);
        console.log('cellIdx: ', cellIdx);
        state.board[cellIdx] = 'X'
        renderBoard();
      }
})

resetButtonElem.addEventListener('click', function(event) {
    resetState();
    renderBoard();
})

// BOOTSTRAPPING
resetState();
renderBoard();