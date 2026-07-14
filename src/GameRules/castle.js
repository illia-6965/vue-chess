import { kingCheckRules } from "@/GameRules/kingCheckRules";
export function executeCastle(source, target, boardData) {
  const castleOptions = getCastleOptions(boardData, source);

  const castle = castleOptions.find((castle) => castle.targetId === target.id);

  if (!castle) return false;

  const rook = boardData.find((square) => square.id === castle.rookId);
  const targetRook = boardData.find((square) => square.id === castle.rookTargetId);

  if (!rook || !targetRook) return false;

  const move = doCastle(source, target, rook, targetRook);
  return {
    moveWasDone: true,
    move,
  };
}
//
//
//
//
//
//
function getCastleOptions(boardData, king) {
  const options = [];

  const shortRook = boardData.find(
    (square) => square.coordY === king.coordY && square.coordX === king.coordX + 3 && square.nameFigure === "rook",
  );
  const longRook = boardData.find(
    (square) => square.coordY === king.coordY && square.coordX === king.coordX - 4 && square.nameFigure === "rook",
  );

  const { shortCastle, longCastle } = tryToCastle(boardData, king, king.colorFigure);

  if (shortCastle && shortRook?.startPosition) {
    const target = shortCastle.target;
    const rookTarget = boardData.find((square) => square.coordY === king.coordY && square.coordX === king.coordX + 1);

    options.push({
      type: "short",
      targetId: target.id,
      rookId: shortRook.id,
      rookTargetId: rookTarget.id,
    });
  }

  if (longCastle && longRook?.startPosition) {
    const target = longCastle.target;
    const rookTarget = boardData.find((square) => square.coordY === king.coordY && square.coordX === king.coordX - 1);

    options.push({
      type: "long",
      targetId: target.id,
      rookId: longRook.id,
      rookTargetId: rookTarget.id,
    });
  }

  return options;
}
//
//
//
//
//
//
function doCastle(source, target, rook, targetRook) {
  const move = {
    type: "castle",
    color: source.colorFigure,
    side: targetRook.coordX > source.coordX ? "short" : "long",

    kingFromId: source.id,
    kingToId: target.id,

    rookFromId: rook.id,
    rookToId: targetRook.id,
  };
  target.nameFigure = source.nameFigure;
  target.startPosition = false;
  target.colorFigure = source.colorFigure;

  source.nameFigure = null;
  source.startPosition = false;
  source.colorFigure = null;

  targetRook.nameFigure = rook.nameFigure;
  targetRook.startPosition = false;
  targetRook.colorFigure = rook.colorFigure;

  rook.nameFigure = null;
  rook.startPosition = false;
  rook.colorFigure = null;
  return move;
}
//
//
//
//
//
//
export function calculateCastleMoves(boardData, king) {
  return getCastleOptions(boardData, king).map((option) => option.targetId);
}
//
//
//
//
//
//
function tryToCastle(boardData, king, currentTurn) {
  if (!king.startPosition) {
    return {
      shortCastle: null,
      longCastle: null,
    };
  }

  const { shortCastle, longCastle } = collectVerifiableSquares(boardData, king);

  checkToFreeSquares(shortCastle, longCastle);

  if (shortCastle.possible) {
    shortCastle.permission = checkAttackOnSquares(boardData, shortCastle.squares, kingCheckRules, currentTurn);
    shortCastle.target = shortCastle.squares.find((square) => square.coordX === king.coordX + 2);
  }
  if (longCastle.possible) {
    const longCastleSquares = longCastle.squares.filter((square) => king.coordX - 3 !== square.coordX); //we dont need to check this square for a castle
    longCastle.permission = checkAttackOnSquares(boardData, longCastleSquares, kingCheckRules, currentTurn);

    longCastle.target = longCastle.squares.find((square) => square.coordX === king.coordX - 2);
  }

  return {
    shortCastle: shortCastle.permission ? shortCastle : null,
    longCastle: longCastle.permission ? longCastle : null,
  };
}

//
//
//
//
//
//
function checkAttackOnSquares(boardData, castleLine, kingCheckRules, currentTurn) {
  let isPotKingInCheck = false;
  for (const potentialKing of castleLine) {
    potentialKing.colorFigure = currentTurn;

    for (let i = 0; i < kingCheckRules.length; i++) {
      isPotKingInCheck = kingCheckRules[i](potentialKing, boardData);
      if (isPotKingInCheck) {
        return false;
      }
    }
  }
  return true;
}
//
//
//
//
//
//
function collectVerifiableSquares(boardData, king) {
  const longCastle = {
    target: null,
    squares: [],
    possible: true,
    permission: false,
  };
  const shortCastle = {
    target: null,
    squares: [],
    possible: true,
    permission: false,
  };

  boardData.forEach((square) => {
    if (square.coordY === king.coordY) {
      if (square.coordX === king.coordX + 1 || square.coordX === king.coordX + 2) {
        shortCastle.squares.push({ ...square });
      }
      if (square.coordX === king.coordX - 1 || square.coordX === king.coordX - 2 || square.coordX === king.coordX - 3) {
        longCastle.squares.push({ ...square });
      }
    }
  });
  return { shortCastle, longCastle };
}
//
//
//
//
//
//
function checkToFreeSquares(shortCastle, longCastle) {
  shortCastle.squares.forEach((square) => {
    if (square.nameFigure) {
      shortCastle.possible = false;
      return;
    }
  });
  longCastle.squares.forEach((square) => {
    if (square.nameFigure) {
      longCastle.possible = false;
    }
  });
}
