export function safeSnapshot({ boardData, currentTurn, isKingInCheck, isCheckMate, isDraw, winner, undoSnapshots }) {
  undoSnapshots.value.push({
    boardData: boardData.value.map((square) => ({
      ...square,
      indication: false,
    })),
    currentTurn: currentTurn.value,
    isKingInCheck: isKingInCheck.value,
    isCheckMate: isCheckMate.value,
    isDraw: isDraw.value,
    winner: winner.value,
  });
  return;
}
