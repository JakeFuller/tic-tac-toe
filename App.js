const gameBoard = (() => {
  let board = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];
  return { board };
})();

const runGame = (() => {
  board = gameBoard.board;
  round = 1;
  symbol = "";
  let p1 = "";
  let p2 = "";

  const initPlayers = (p1Name, p1Symbol, p2Name, p2Symbol) => {
    p1 = Player(p1Name, p1Symbol);
    p2 = Player(p2Name, p2Symbol);
  };

  const handleTurn = (gridElement) => {
    if (round % 2 != 0) {
      symbol = p1.getSymbol();
    } else {
      symbol = p2.getSymbol();
    }
    gridSplit = gridElement.split("");
    if (gridSplit[0] == "A") {
      gridSplit[0] = 0;
    } else if (gridElement[0] == "B") {
      gridSplit[0] = 1;
    } else {
      gridSplit[0] = 2;
    }
    if (
      board[gridSplit[0]][gridSplit[1] - 1] != "X" &&
      board[gridSplit[0]][gridSplit[1] - 1] != "O"
    ) {
      board[gridSplit[0]][gridSplit[1] - 1] = symbol;
      displayController.paintBoard(gridElement, symbol);
      checkWin();
      console.log(board);
      console.log(round);
      round++;
    }
  };

  const checkWin = () => {
    if (
      (board[0][0] == board[1][0] && board[0][0] == board[2][0]) ||
      (board[0][1] == board[1][1] && board[0][1] == board[2][1]) ||
      (board[0][2] == board[1][2] && board[0][2] == board[2][2]) ||
      (board[0][0] == board[0][1] && board[0][0] == board[0][2]) ||
      (board[1][0] == board[1][1] && board[1][0] == board[1][2]) ||
      (board[2][0] == board[2][1] && board[2][0] == board[2][2]) ||
      (board[0][0] == board[1][1] && board[0][0] == board[2][2]) ||
      (board[0][2] == board[1][1] && board[0][2] == board[2][0])
    ) {
      displayController.unsetClickables();
      console.log("Winner!");
      handleWin();
    } else {
      checkTie();
    }
  };
  //  Checks if all board[i][j] is X or O, if so, declare draw
  const checkTie = () => {
    iterable = [];
    board = gameBoard.board;
    for (let i = 0; i < board.length; i++) {
      if (board[i].every((e) => e == "X" || e == "O")) {
        iterable.push(true);
      } else {
        iterable.push(false);
      }
    }
    if (iterable.every((e) => e === true)) {
      handleTie();
    }
  };

  const handleWin = () => {
    if (round % 2 != 0) {
      displayController.winScreen(p1.getName(), true);
      console.log(`${p1.getName()} wins!`);
    } else {
      displayController.winScreen(p2.getName(), true);
      console.log(`${p2.getName()} wins!`);
    }
  };

  const handleTie = () => {
    displayController.winScreen(p1.getName(), false);
    console.log("Draw!");
  };

  return { handleTurn, initPlayers };
})();

const displayController = (() => {
  board = gameBoard.board;
  let divId = 0;
  let findDiv = 0;
  const clickables = document.getElementsByClassName("gridElement");
  const startBtn = document.getElementsByClassName("start");
  const instructions = document.getElementById("instructions");

  let p1Name = document.getElementById("p1-name").value;
  let p2Name = document.getElementById("p2-name").value;

  const startListen = () => {
    startBtn[0].addEventListener("click", startGame);
  };

  const startGame = () => {
    startBtn[0].removeEventListener("click", startGame);
    startBtn[0].className = "hidden";
    instructions.className = "hidden";
    runGame.initPlayers(p1Name, "X", p2Name, "O");
    displayController.setClickables();
  };

  // Turn the game "buttons" on
  const setClickables = () => {
    for (let i = 0; i < clickables.length; i++) {
      clickables[i].addEventListener("click", doClick);
    }
  };
  // Turn the game "buttons" off
  const unsetClickables = () => {
    for (let i = 0; i < clickables.length; i++) {
      clickables[i].removeEventListener("click", doClick);
    }
  };
  // Handle the event --> Enables turning off event listener.
  const doClick = (e) => {
    runGame.handleTurn(e.target.id);
  };

  const paintBoard = (gridElement, symbol) => {
    getDiv = document.getElementById(`${gridElement}`);
    getDiv.textContent = `${symbol}`;
  };

  const winScreen = (player, win) => {
    const header = document.getElementById("header");
    if (win === true) {
      header.textContent = `${player} wins!`;
    } else {
      header.textContent = "Tie Game!";
    }
  };

  // Used to fill entire grid with 1 character -- Possible end-of-game display
  const fillBoard = (symbol) => {
    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[i].length; j++) {
        gridElement = board[i][j];
        console.log(gridElement);
        if (i == 0) {
          divId = `A${j + 1}`;
        } else if (i == 1) {
          divId = `B${j + 1}`;
        } else {
          divId = `C${j + 1}`;
        }
        console.log(divId);
        findDiv = document.getElementById(`${divId}`);
        findDiv.textContent = `${symbol}`;
      }
    }
  };
  return { paintBoard, setClickables, unsetClickables, startListen, winScreen };
})();

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  const takeTurn = () => {
    handleTurn(symbol, gridElement);
    paintBoard(symbol, gridElement);
  };
  return { getName, getSymbol, takeTurn };
};

// const p1 = Player("Jake", "X");
// const p2 = Player("AI", "O");

displayController.startListen();
