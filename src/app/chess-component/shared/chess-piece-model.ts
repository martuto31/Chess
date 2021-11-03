import { ChessFigures } from "./chess-figures";

export interface chessPiece
{
    id: number;
    pieceType: ChessFigures;
    piece: string;
    colour: string;
    potentialMoves: string[];
}