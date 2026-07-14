export function initialBoard() {
  function createBoardData() {
    const boardData = [];
    const letterCoordinates = ["a", "b", "c", "d", "e", "f", "g", "h"].reverse();
    for (let y = 1; y <= 8; y++) {
      for (let x = 1; x <= letterCoordinates.length; x++) {
        const figure = setStartPositionChess(x, y);

        const square = {
          coordX: x,
          coordY: y,
          letterCoord: letterCoordinates[x - 1],
          colorCell: getColorSquare(x, y),
          id: `${letterCoordinates[x - 1]}${x}${y}`,
          nameFigure: figure.name,
          colorFigure: figure.color,
          startPosition: true,
          indication: false,
          activeFigure: false,
        };

        boardData.push(square);
      }
    }

    return boardData;
  }
  function getColorSquare(x, y) {
    const white = "rgb(171 170 130 / 82%)";
    const black = "rgb(23 22 22 / 78%)";
    return (x + y) % 2 == 0 ? white : black;
  }
  function setStartPositionChess(x, y) {
    const arrangeFigures = (x, color) => {
      switch (x) {
        case 1:
          return { color: color, name: "rook" };
        case 2:
          return { color: color, name: "knight" };
        case 3:
          return { color: color, name: "bishop" };
        case 4:
          return { color: color, name: "queen" };
        case 5:
          return { color: color, name: "king" };
        case 6:
          return { color: color, name: "bishop" };
        case 7:
          return { color: color, name: "knight" };
        case 8:
          return { color: color, name: "rook" };
      }
      return { color: null, name: null };
    };

    if (y == 2 || y == 7) {
      return y == 7 ? { color: "white", name: "pawn" } : { color: "black", name: "pawn" };
    }

    if (y == 8) {
      return arrangeFigures(x, "white");
    }
    if (y == 1) {
      return arrangeFigures(x, "black");
    }

    return { color: null, name: null };
  }
  return createBoardData();
}
function testBotEnPassant(boardData) {
  const pawn = boardData.find((square) => square.id === "c62");
  const pawnTarget = boardData.find((square) => square.id === "c65");
  replace(pawn, pawnTarget);
}
function testBotCastle(boardData) {
  const figures = boardData.filter((square) => square.nameFigure !== "pawn" && square.colorFigure === "black");
  const whiteBishop = boardData.find((square) => square.id === "c68");
  const bishopTarget = boardData.find((square) => square.id === "f35");
  const kingPawn = boardData.find((square) => square.id === "c62");
  const kingPawnTarget = boardData.find((square) => square.id === "c64");
  console.log(figures, "work");
  for (let i = 0; i < figures.length; i++) {
    if (figures[i].nameFigure === "knight" || figures[i].nameFigure === "bishop" || figures[i].nameFigure === "queen") {
      toDelete(figures[i]);
    }
    //     if (figures[i].nameFigure === "rook") {
    //       figures[i].startPosition = false;
    //     }
  }
  replace(whiteBishop, bishopTarget);
  replace(kingPawn, kingPawnTarget);
}
function testBotPawnPromotion(boardData) {
  const figureToDelete = boardData.filter((square) => square.id === "a88" || square.id === "a87");
  figureToDelete.forEach((square) => toDelete(square));
  const pawn = boardData.find((square) => square.id === "a82");
  const pawnTarget = boardData.find((square) => square.id === "a87");
  replace(pawn, pawnTarget);
}
function replace(source, target) {
  target.colorFigure = source.colorFigure;
  target.nameFigure = source.nameFigure;
  target.startPosition = false;

  source.nameFigure = null;
  source.colorFigure = null;
  source.startPosition = false;
}
function toDelete(source) {
  source.nameFigure = null;
  source.colorFigure = null;
  source.startPosition = false;
}
