// HTML Elements
const board = document.querySelector(".board");
const squares = Array.from(document.querySelectorAll(".square"));
const message = document.querySelector(".message");
const restartBtn = document.querySelector(".restart-button");

// document.querySelectorAll(".square"): This method returns a NodeList  of all elements in the document that match the specified group of selectors, in this case, all elements with the class "square".Array.from(): This method creates a new, shallow-copied Array  instance from an array-like or iterable object. In this context, it converts the NodeList returned by querySelectorAll into a true array. This conversion is useful because arrays have more methods available for manipulation, such as forEach, map, filter, etc., which are not available on NodeLists.

// Players
const players = ["X", "O"];
let currentPlayer = players[0];

// Winning Patterns
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Initial Message
message.textContent = `${currentPlayer}'s turn`;

// Event Listeners for Squares
squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (square.textContent || checkWinner(currentPlayer)) return;

    square.textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
      message.textContent = `Game Over. ${currentPlayer} wins the game! Please restart`;
    } else if (checkTieResult()) {
      message.textContent = "Game tied! Please restart";
    } else {
      currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
      message.textContent = `${currentPlayer}'s turn`;
    }
  });
});

// Helper Functions

// !!!!===>>>winningPatterns.some(...): The some  method is used to test whether at least one element in the winningPatterns array passes the test implemented by the provided function. It returns true if any winning pattern is satisfied for the given player.
const checkWinner = (
  player //x, 0
) =>
  winningPatterns.some((pattern) =>
    pattern.every((index) => squares[index].textContent === player)
  );

const checkTieResult = () => squares.every((square) => square.textContent);

// Restart Functionality
const restartGame = () => {
  squares.forEach((square) => (square.textContent = ""));
  currentPlayer = players[0];
  message.textContent = `${currentPlayer}'s turn`;
};

// Event Listener for Restart Button
restartBtn.addEventListener("click", restartGame);
