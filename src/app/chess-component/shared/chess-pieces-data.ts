import { ChessFigures } from "./chess-figures";
import { chessPiece} from "./chess-piece-model";

export class chessPiecesData
{
    public piecesData: chessPiece[] = 
    [
        {id: 11, pieceType: ChessFigures.BlackRook, colour: "black", potentialMoves: []},
        {id: 12, pieceType: ChessFigures.BlackHorse, colour: "black", potentialMoves: []},
        {id: 13, pieceType: ChessFigures.BlackBishop, colour: "black", potentialMoves: []},
        {id: 14, pieceType: ChessFigures.BlackQueen, colour: "black", potentialMoves: []},
        {id: 15, pieceType: ChessFigures.BlackKing, colour: "black", potentialMoves: []},
        {id: 16, pieceType: ChessFigures.BlackBishop, colour: "black", potentialMoves: []},
        {id: 17, pieceType: ChessFigures.BlackHorse, colour: "black", potentialMoves: []},
        {id: 18, pieceType: ChessFigures.BlackRook, colour: "black", potentialMoves: []},

        {id: 21, pieceType: ChessFigures.BlackPawn, colour: "black", potentialMoves: []},
        {id: 22, pieceType: ChessFigures.BlackPawn, colour: "black", potentialMoves: []},
        {id: 23, pieceType: ChessFigures.BlackPawn, colour: "black", potentialMoves: []},
        {id: 24, pieceType: ChessFigures.BlackPawn, colour: "black", potentialMoves: []},
        {id: 25, pieceType: ChessFigures.BlackPawn, colour: "black", potentialMoves: []},
        {id: 26, pieceType: ChessFigures.BlackPawn, colour: "black", potentialMoves: []},
        {id: 27, pieceType: ChessFigures.BlackPawn, colour: "black", potentialMoves: []},
        {id: 28, pieceType: ChessFigures.BlackPawn, colour: "black", potentialMoves: []},


        {id: 81, pieceType: ChessFigures.WhiteRook, colour: "white", potentialMoves: []},
        {id: 82, pieceType: ChessFigures.WhiteHorse, colour: "white", potentialMoves: []},
        {id: 83, pieceType: ChessFigures.WhiteBishop, colour: "white", potentialMoves: []},
        {id: 84, pieceType: ChessFigures.WhiteQueen, colour: "white", potentialMoves: []},
        {id: 85, pieceType: ChessFigures.WhiteKing, colour: "white", potentialMoves: []},
        {id: 86, pieceType: ChessFigures.WhiteBishop, colour: "white", potentialMoves: []},
        {id: 87, pieceType: ChessFigures.WhiteHorse, colour: "white", potentialMoves: []},
        {id: 88, pieceType: ChessFigures.WhiteRook, colour: "white", potentialMoves: []},

        {id: 71, pieceType: ChessFigures.WhitePawn, colour: "white", potentialMoves: []},
        {id: 72, pieceType: ChessFigures.WhitePawn, colour: "white", potentialMoves: []},
        {id: 73, pieceType: ChessFigures.WhitePawn, colour: "white", potentialMoves: []},
        {id: 74, pieceType: ChessFigures.WhitePawn, colour: "white", potentialMoves: []},
        {id: 75, pieceType: ChessFigures.WhitePawn, colour: "white", potentialMoves: []},
        {id: 76, pieceType: ChessFigures.WhitePawn, colour: "white", potentialMoves: []},
        {id: 77, pieceType: ChessFigures.WhitePawn, colour: "white", potentialMoves: []},
        {id: 78, pieceType: ChessFigures.WhitePawn, colour: "white", potentialMoves: []},

    ]
}