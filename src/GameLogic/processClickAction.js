import { resolveClickIntent } from "@/GameLogic/resolveClickIntent";
import { calculateAvailableMoves } from "@/GameLogic/calculateAvailableMoves";
import { highlightAvailableMoves, clearIndications } from "@/GameLogic/indication";
import { tryExecuteMove } from "@/GameLogic/movement";
import { verifyKingForCheck } from "@/GameRules/isKingInCheck";
import { checkingCheckMate } from "@/GameRules/checkMate";
import { checkDraw } from "@/GameRules/draw";
import { startBotMove } from "@/bot/movementBot";
import { safeSnapshot } from "@/GameLogic/movesHistory";

export function processClickAction({
  squareId,
  currentTurn,
  boardData,
  activeFigureSquareId,
  availableMovesId,
  isKingInCheck,
  moveHistory,
  pawnPromotion,
  isCheckMate,
  isDraw,
  winner,
  modalWindGameOver,
  botThinking,
  undoSnapshots,
  botColor,
  gameId,
}) {
  if (isCheckMate.value || isDraw.value) {
    return;
  }
  const intentClick = resolveClickIntent(squareId, currentTurn.value, boardData.value, activeFigureSquareId.value);

  if (intentClick === "select") {
    activeFigureSquareId.value = squareId;
    availableMovesId.value = calculateAvailableMoves(
      activeFigureSquareId.value,
      boardData.value,
      currentTurn.value,
      isKingInCheck.value,
      moveHistory.value,
    );
    highlightAvailableMoves(boardData.value, availableMovesId.value, activeFigureSquareId.value);

    console.log("select");
    return;
  }

  if (intentClick === "deselect") {
    activeFigureSquareId.value = null;
    availableMovesId.value = [];
    clearIndications(boardData.value);

    console.log("deselect");
    return;
  }
  if (intentClick === "switch") {
    activeFigureSquareId.value = squareId;
    availableMovesId.value = calculateAvailableMoves(
      activeFigureSquareId.value,
      boardData.value,
      currentTurn.value,
      isKingInCheck.value,
      moveHistory.value,
    );
    highlightAvailableMoves(boardData.value, availableMovesId.value, activeFigureSquareId.value);

    console.log("switch");
    return;
  }
  if (intentClick == "tryMove" || intentClick === "tryCapture") {
    safeSnapshot({
      boardData,
      currentTurn,
      isKingInCheck,
      isCheckMate,
      isDraw,
      winner,
      undoSnapshots,
    });
    const result = tryExecuteMove(
      availableMovesId.value,
      boardData.value,
      activeFigureSquareId.value,
      squareId,
      moveHistory.value,
    );
    if (!result.moveWasDone) {
      return;
    }

    moveHistory.value.push(result.move);
    clearIndications(boardData.value);
    activeFigureSquareId.value = null;
    availableMovesId.value = [];

    if (result.promotion) {
      pawnPromotion.value = result.promotion;

      return;
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
    startBotMove({
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
      gameId,
    });
    console.log("try move");
  }

  if (intentClick === "ignore") {
    console.log("ignore");
    return;
  }
}
