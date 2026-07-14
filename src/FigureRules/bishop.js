export function getBishopMove(bishop, boardData) {
  const x = bishop.coordX;
  const y = bishop.coordY;

  return calculateAvailableMoves(x, y, bishop, boardData);
}
export function checkBishopAttack(king, boardData) {
  const x = king.coordX;
  const y = king.coordY;
  let isBishopCheck = false;
  moveDirections.forEach((direction) => {
    let counter = 1;
    while (true) {
      const { axisX: newX, axisY: newY } = direction(x, y, counter);
      const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);
      if (!existCoord || existCoord.colorFigure === king.colorFigure) {
        break;
      }
      if (existCoord.colorFigure && existCoord.colorFigure !== king.colorFigure) {
        if (existCoord.nameFigure === "bishop") {
          isBishopCheck = true;
        }

        break;
      }
      counter++;
    }
  });
  return isBishopCheck;
}
const moveDirections = [
  (x, y, counter) => ({ axisX: x - counter, axisY: y - counter }), // Вліво вгору
  (x, y, counter) => ({ axisX: x + counter, axisY: y + counter }), // Вправо вниз
  (x, y, counter) => ({ axisX: x - counter, axisY: y + counter }), // Вліво вниз
  (x, y, counter) => ({ axisX: x + counter, axisY: y - counter }), // Вправо вгору
];
function calculateAvailableMoves(x, y, bishop, boardData) {
  const calculatedMovesId = [];
  moveDirections.forEach((direction) => {
    let counter = 1;
    while (true) {
      const { axisX: newX, axisY: newY } = direction(x, y, counter);
      const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);
      if (existCoord && existCoord.colorFigure !== bishop.colorFigure) {
        calculatedMovesId.push(existCoord.id);
        if (existCoord.nameFigure) {
          break;
        }
        counter++;
      } else {
        break;
      }
    }
  });
  return calculatedMovesId;
}
