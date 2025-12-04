const main = document.getElementById('game');

let cols = Math.floor(window.innerWidth / 10);
let rows = Math.floor(window.innerHeight / 10);
let grid = [cols, rows];
let state = [];
let temp;

//creating the grid
for (let i = 0; i < grid[1]; i++) {
  let row = document.createElement('tr');
  let stateRow = [];

  for (let j = 0; j < grid[0]; j++) {
    let el = document.createElement('td');
    el.className = "cell";
    row.appendChild(el);

    let val = Math.round(Math.random()*.6);
    stateRow.push(val);
  }

  main.appendChild(row);
  state.push(stateRow);
}

//letting the edges wrap
function getCoords(x, y) {
  let tempX = x;
  let tempY = y;
  if (tempX < 0) {
    tempX = cols - 1;
  }
  else if (tempX >= cols) {
    tempX = 0;
  }

  if (tempY < 0) {
    tempY = rows - 1;
  }
  else if (tempY >= rows) {
    tempY = 0;
  }

  return [tempX, tempY]
}

//counting neighbors
function getAliveNeighbors(x, y) {
  let neighbors = 0;

  function neighbor(v, h) {
    let coords = getCoords(x+h, y+v);
    return state[coords[1]][coords[0]];
  }

  if (neighbor(-1,-1)) neighbors++;
  if (neighbor(-1,0)) neighbors++;
  if (neighbor(-1,1)) neighbors++;
  if (neighbor(0,-1)) neighbors++;
  if (neighbor(0,1)) neighbors++;
  if (neighbor(1,-1)) neighbors++;
  if (neighbor(1,0)) neighbors++;
  if (neighbor(1,1)) neighbors++;

  return neighbors
}

function step() {
  let newState = state.map(function(arr) {
    return arr.slice();
  });
  
  //spawning a glider
  if (temp) {
    let x = temp[0];
    let y = temp[1];
    newState[y-1][x+1] = 1;
    newState[y][x-1] = 1;
    newState[y][x+1] = 1;
    newState[y+1][x] = 1;
    newState[y+1][x+1] = 1;
    temp = null;
  }

  let changedCells = [];

  for (let row = 0; row < grid[1]; row++) {
    for (let item = 0; item < grid[0]; item++) {
      let cell = state[row][item];
      let neighbors = getAliveNeighbors(item, row);

      function changeState(row=row, item=item, state) {
        newState[row][item] = state;
        changedCells.push({coords: [item, row], state: state})
      }

      //the actual game rules
      if (cell) {
        if (neighbors < 2) changeState(row, item, 0);
        else if (neighbors > 3) changeState(row, item, 0);
      }
      else {
        if (neighbors === 3) changeState(row, item, 1);
      }
    }
  }

  state = newState.map(function(arr) {
    return arr.slice();
  });

  renderChanged(changedCells);
}

//no need to update each cell when you know what exactly has changed
function renderChanged(cells) {
  for (let c in cells) {
    let cell = cells[c];
    main.children[cell.coords[1]].children[cell.coords[0]].classList.toggle('alive', cell.state);
  }
}

//clicks on the <table> make everything lag, so here's a workaround
const overlay = document.getElementById('overlay');

overlay.onclick = function (e) {
  let x = e.clientX;
  let y = e.clientY;

  temp = [Math.floor(x/10), Math.floor(y/10)];
};

let interval = setInterval(function() {step()}, 30);