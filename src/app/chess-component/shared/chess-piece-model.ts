import { ChessFigures } from "./chess-figures";

export interface chessPiece
{
    id: number;
    pieceType: ChessFigures;
    colour: string;
    potentialMoves: string[];
}