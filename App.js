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
    }
  };

  const handleWin = () => {
    if (round % 2 != 0) {
      console.log(`${p1.getName()} wins!`);
    } else {
      console.log(`${p2.getName()} wins!`);
    }
  };

  return { handleTurn };
})();

const displayController = (() => {
  board = gameBoard.board;
  let divId = 0;
  let findDiv = 0;
  const clickables = document.getElementsByClassName("gridElement");

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
  return { paintBoard, setClickables, unsetClickables };
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

const p1 = Player("Jake", "X");
const p2 = Player("AI", "O");

displayController.setClickables();
