import { checkQueenAttack } from "@/FigureRules/queen";
import { checkRookAttack } from "@/FigureRules/rook";
import { checkPawnAttack } from "@/FigureRules/pawn";
import { checkKnightAttack } from "@/FigureRules/knight";
import { checkKingAttack } from "@/FigureRules/king";
import { checkBishopAttack } from "@/FigureRules/bishop";

export const kingCheckRules = [
  checkQueenAttack,
  checkRookAttack,
  checkPawnAttack,
  checkKnightAttack,
  checkKingAttack,
  checkBishopAttack,
];
