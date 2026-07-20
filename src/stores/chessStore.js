import { defineStore } from "pinia";
import { ref } from "vue";
import { initialBoard } from "@/initialBoard";
import { processClickAction } from "@/GameLogic/processClickAction";
import { verifyKingForCheck } from "@/GameRules/isKingInCheck";
import { checkingCheckMate } from "@/GameRules/checkMate";
import { checkDraw } from "@/GameRules/draw";
import { startBotMove } from "@/bot/movementBot";

//
//
export const useChessStore = defineStore("chess", () => {
  const boardData = ref(initialBoard());
  const activeFigureSquareId = ref(null);
  const currentTurn = ref("white");
  const availableMovesId = ref([]);
  const isKingInCheck = ref(false);
  const moveHistory = ref([]);
  const isCheckMate = ref(false);
  const pawnPromotion = ref({
    permission: false,
    targetId: null,
    colorFigure: null,
  });
  const isDraw = ref(null);
  const winner = ref(null);
  const playerColor = ref(null);
  const botColor = ref(null);
  const modalWindGameOver = ref(null);
  const gameStarted = ref(false);
  const botThinking = ref(false);
  const undoSnapshots = ref([]);
  const gameId = ref(0);

  function startNewGame() {
    gameId.value++;
    boardData.value = initialBoard();
    activeFigureSquareId.value = null;
    currentTurn.value = "white";
    availableMovesId.value = [];
    isKingInCheck.value = false;
    moveHistory.value = [];
    isCheckMate.value = false;
    pawnPromotion.value = {
      permission: false,
      targetId: null,
      colorFigure: null,
    };
    isDraw.value = null;
    winner.value = null;
    playerColor.value = null;
    botColor.value = null;
    gameStarted.value = null;
    undoSnapshots.value = [];
    botThinking.value = false;
  }
  function startGame(color) {
    gameStarted.value = true;
    //////////////////////////////////////////////////////////////////////////////
    playerColor.value = color;
    botColor.value = playerColor.value === "white" ? "black" : "white";

    if (botColor.value === currentTurn.value) {
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
        undoSnapshots,
        botColor,
        gameId,
      });
    }
  }
  function completePawnPromotion(nameFigure) {
    const target = boardData.value.find((square) => square.id === pawnPromotion.value.targetId);
    target.nameFigure = nameFigure;
    pawnPromotion.value = {
      permission: false,
      targetId: null,
      colorFigure: null,
    };
    currentTurn.value = currentTurn.value === "white" ? "black" : "white";
    isKingInCheck.value = verifyKingForCheck(boardData.value, currentTurn.value);
    if (isKingInCheck.value) {
      isCheckMate.value = checkingCheckMate(boardData.value, currentTurn.value, isKingInCheck.value, moveHistory.value);
      if (isCheckMate.value) {
        winner.value = currentTurn.value === "white" ? "black" : "white";
      }
    }
    isDraw.value = checkDraw(boardData.value, currentTurn.value, isKingInCheck.value, moveHistory.value);
    if (isCheckMate.value || isDraw.value) {
      modalWindGameOver.value = true;
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
  }
  function setPenultimateMove() {
    if (undoSnapshots.value.length > 0) {
      moveHistory.value.pop();
      const boardState = undoSnapshots.value.pop();
      activeFigureSquareId.value = null;
      availableMovesId.value = [];
      boardData.value = boardState.boardData;
      currentTurn.value = boardState.currentTurn;
      isKingInCheck.value = boardState.isKingInCheck;
      isCheckMate.value = boardState.isCheckMate;
      isDraw.value = boardState.isDraw;
      winner.value = boardState.winner;
    } else {
      console.log("array length is less than 0");
    }
  }
  function processPlayerAction({ action, squareId }) {
    if (action === "click" && currentTurn.value === playerColor.value) {
      gameStarted.value = true;
      processClickAction({
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
      });
    }
    if (action === "start-drag") {
    }
    if (action === "drop") {
    }
  }
  return {
    boardData,
    currentTurn,
    activeFigureSquareId,
    processPlayerAction,
    availableMovesId,
    isKingInCheck,
    moveHistory,
    pawnPromotion,
    completePawnPromotion,
    isCheckMate,
    isDraw,
    winner,
    startGame,

    playerColor,
    botColor,
    modalWindGameOver,
    gameStarted,
    startNewGame,
    botThinking,
    undoSnapshots,
    setPenultimateMove,
  };
});
