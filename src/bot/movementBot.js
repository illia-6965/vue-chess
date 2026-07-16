import { calculateAvailableMoves } from "@/GameLogic/calculateAvailableMoves";
import { tryExecuteMove } from "@/GameLogic/movement";
import { verifyKingForCheck } from "@/GameRules/isKingInCheck";
import { checkDraw } from "@/GameRules/draw";
import { checkingCheckMate } from "@/GameRules/checkMate";

export function startBotMove({
  botThinking,
  boardData,
  currentTurn,
  isKingInCheck,
  moveHistory,
  isCheckMate,
  isDraw,
  winner,
  modalWindGameOver,
  botColor,
  botMoveTimeoutId,
  gameId,
}) {
  botThinking.value = true;
  const scheduledGameId = gameId.value;
  setTimeout(() => {
    if (scheduledGameId !== gameId.value) {
      return;
    }
    doBotMove(
      boardData,
      currentTurn,
      isKingInCheck,
      moveHistory,
      isCheckMate,
      isDraw,
      winner,
      modalWindGameOver,
      botColor,
    );

    botThinking.value = false;
  }, 2000);
}
function doBotMove(
  boardData,
  currentTurn,
  isKingInCheck,
  moveHistory,
  isCheckMate,
  isDraw,
  winner,
  modalWindGameOver,
  botColor,
) {
  const figures = boardData.value.filter((square) => square.colorFigure === currentTurn.value);

  const dataFigures = [];
  for (let i = 0; i < figures.length; i++) {
    const ids = calculateAvailableMoves(
      figures[i].id,
      boardData.value,
      currentTurn.value,
      isKingInCheck.value,
      moveHistory.value,
    );

    if (ids.length > 0) {
      dataFigures.push({
        figureId: figures[i].id,
        moveIds: ids,
      });
    }
  }

  const sourceData = getRandomItem(dataFigures);
  const targetId = getRandomItem(sourceData.moveIds);
  const result = tryExecuteMove(sourceData.moveIds, boardData.value, sourceData.figureId, targetId, moveHistory.value);
  if (!result.moveWasDone) {
    return;
  }

  moveHistory.value.push(result.move);
  if (result.promotion) {
    const target = boardData.value.find((square) => square.id === result.promotion.targetId);

    const promotionFigures = ["queen", "rook", "knight", "bishop"];
    const resultPromotion = getRandomItem(promotionFigures);

    target.nameFigure = resultPromotion;
  }
  currentTurn.value === "white" ? (currentTurn.value = "black") : (currentTurn.value = "white");
  isKingInCheck.value = verifyKingForCheck(boardData.value, currentTurn.value);
  if (isKingInCheck.value) {
    isCheckMate.value = checkingCheckMate(boardData.value, currentTurn.value, isKingInCheck.value, moveHistory.value);
    if (isCheckMate.value) {
      winner.value = currentTurn.value === "white" ? "black" : "white";
    }
  }
  isDraw.value = checkDraw(boardData.value, currentTurn.value, isKingInCheck.value, moveHistory.value);
  if (isDraw.value || isCheckMate.value) {
    modalWindGameOver.value = true;

    //game over
    return;
  }

  return;
}
function getRandomItem(array) {
  if (!array.length) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
