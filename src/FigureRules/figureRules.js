import { getPawnMoves } from "./pawn";
import { getBishopMove } from "./bishop";
import { getRookMove } from "./rook";
import { getQueenMove } from "./queen";
import { getKnightMove } from "./knight";
import { getKingMove } from "./king";
import { checkRookAttack } from "./rook";
import { checkKnightAttack } from "./knight";
import { checkBishopAttack } from "./bishop";
import { checkQueenAttack } from "./queen";
import { checkKingAttack } from "./king";
import { checkPawnAttack } from "./pawn";
export const rawMoves = {
  pawn: getPawnMoves,
  bishop: getBishopMove,
  rook: getRookMove,
  queen: getQueenMove,
  knight: getKnightMove,
  king: getKingMove,
};
export const legalMoves = {
  pawn: checkPawnAttack,
  bishop: checkBishopAttack,
  rook: checkRookAttack,
  queen: checkQueenAttack,
  knight: checkKnightAttack,
  king: checkKingAttack,
};
