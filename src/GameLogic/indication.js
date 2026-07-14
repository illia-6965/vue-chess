export function highlightAvailableMoves(boardData, availableMovesId = [], activeFigureSquareId) {
  boardData.forEach((square) => {
    square.indication = availableMovesId.includes(square.id);
  });
}
export function clearIndications(boardData) {
  boardData.forEach((square) => {
    square.indication = false;
  });
}
