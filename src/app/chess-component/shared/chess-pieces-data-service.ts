import { identifierModuleUrl } from "@angular/compiler";
import { ChessFigures } from "./chess-figures";
import { chessPiece} from "./chess-piece-model";

export class chessPiecesDataService
{
    public piecesData: chessPiece[] = 
    [
        {id: 11, pieceType: ChessFigures.BlackRook, piece: "rook", colour: "black", potentialMoves: []},
        {id: 12, pieceType: ChessFigures.BlackHorse, piece: "horse", colour: "black", potentialMoves: []},
        {id: 13, pieceType: ChessFigures.BlackBishop, piece: "bishop", colour: "black", potentialMoves: []},
        {id: 14, pieceType: ChessFigures.BlackQueen, piece: "queen", colour: "black", potentialMoves: []},
        {id: 15, pieceType: ChessFigures.BlackKing, piece: "king", colour: "black", potentialMoves: []},
        {id: 16, pieceType: ChessFigures.BlackBishop, piece: "bishop", colour: "black", potentialMoves: []},
        {id: 17, pieceType: ChessFigures.BlackHorse, piece: "horse", colour: "black", potentialMoves: []},
        {id: 18, pieceType: ChessFigures.BlackRook, piece: "rook", colour: "black", potentialMoves: []},

        {id: 21, pieceType: ChessFigures.BlackPawn, piece: "pawn", colour: "black", potentialMoves: []},
        {id: 22, pieceType: ChessFigures.BlackPawn, piece: "pawn", colour: "black", potentialMoves: []},
        {id: 23, pieceType: ChessFigures.BlackPawn, piece: "pawn", colour: "black", potentialMoves: []},
        {id: 24, pieceType: ChessFigures.BlackPawn, piece: "pawn", colour: "black", potentialMoves: []},
        {id: 25, pieceType: ChessFigures.BlackPawn, piece: "pawn", colour: "black", potentialMoves: []},
        {id: 26, pieceType: ChessFigures.BlackPawn, piece: "pawn", colour: "black", potentialMoves: []},
        {id: 27, pieceType: ChessFigures.BlackPawn, piece: "pawn", colour: "black", potentialMoves: []},
        {id: 28, pieceType: ChessFigures.BlackPawn, piece: "pawn", colour: "black", potentialMoves: []},

        {id: 31, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 32, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 33, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 34, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 35, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 36, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 37, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 38, pieceType: "", piece: "", colour: "", potentialMoves: []},

        {id: 41, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 42, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 43, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 44, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 45, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 46, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 47, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 48, pieceType: "", piece: "", colour: "", potentialMoves: []},

        {id: 51, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 52, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 53, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 54, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 55, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 56, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 57, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 58, pieceType: "", piece: "", colour: "", potentialMoves: []},

        {id: 61, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 62, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 63, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 64, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 65, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 66, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 67, pieceType: "", piece: "", colour: "", potentialMoves: []},
        {id: 68, pieceType: "", piece: "", colour: "", potentialMoves: []},

        {id: 71, pieceType: ChessFigures.WhitePawn, piece: "pawn", colour: "white", potentialMoves: []},
        {id: 72, pieceType: ChessFigures.WhitePawn, piece: "pawn", colour: "white", potentialMoves: []},
        {id: 73, pieceType: ChessFigures.WhitePawn, piece: "pawn", colour: "white", potentialMoves: []},
        {id: 74, pieceType: ChessFigures.WhitePawn, piece: "pawn", colour: "white", potentialMoves: []},
        {id: 75, pieceType: ChessFigures.WhitePawn, piece: "pawn", colour: "white", potentialMoves: []},
        {id: 76, pieceType: ChessFigures.WhitePawn, piece: "pawn", colour: "white", potentialMoves: []},
        {id: 77, pieceType: ChessFigures.WhitePawn, piece: "pawn", colour: "white", potentialMoves: []},
        {id: 78, pieceType: ChessFigures.WhitePawn, piece: "pawn", colour: "white", potentialMoves: []},

        {id: 81, pieceType: ChessFigures.WhiteRook, piece: "rook", colour: "white", potentialMoves: []},
        {id: 82, pieceType: ChessFigures.WhiteHorse, piece: "horse", colour: "white", potentialMoves: []},
        {id: 83, pieceType: ChessFigures.WhiteBishop, piece: "bishop", colour: "white", potentialMoves: []},
        {id: 84, pieceType: ChessFigures.WhiteQueen, piece: "queen", colour: "white", potentialMoves: []},
        {id: 85, pieceType: ChessFigures.WhiteKing, piece: "king", colour: "white", potentialMoves: []},
        {id: 86, pieceType: ChessFigures.WhiteBishop, piece: "bishop", colour: "white", potentialMoves: []},
        {id: 87, pieceType: ChessFigures.WhiteHorse, piece: "horse", colour: "white", potentialMoves: []},
        {id: 88, pieceType: ChessFigures.WhiteRook, piece: "rook", colour: "white", potentialMoves: []},
    ]

    addPotentialMove(id: number, potentialMove: string){
        var selectedPiece = this.piecesData.find(p => p.id == id);
        //if(selectedPiece?.potentialMoves.find(p => p.valueOf == potentialMove))
        selectedPiece?.potentialMoves.push(potentialMove);
        //if potentialMove is not already added, add
    }

    deleteAllPotentialMoves(id: number){
        var selectedPiecePotentialMoves = this.piecesData.find(p => p.id == id)?.potentialMoves.length;
        this.piecesData.find(p => p.id == id)?.potentialMoves.splice(0, selectedPiecePotentialMoves);
    }

    isTileClear(id: number){
        var isTileClear = this.piecesData.find(p => p.id == id)?.colour === "";
        if(isTileClear)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
    isThePieceWhite(id: number)
    {
        console.log(this.piecesData.find(p => p.id == id)?.pieceType);
        if(this.piecesData.find(p => p.id == id)?.colour === "white")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    isThePieceBlack(id: number)
    {
        console.log(this.piecesData.find(p => p.id == id)?.pieceType);
        if(this.piecesData.find(p => p.id == id)?.colour === "black")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    selectedPieceColour(id: number){
        var colour = this.piecesData.find(p => p.id == id)?.colour;
        return colour;
    }
    seletedPieceType(id: number){
        var type = this.piecesData.find(p => p.id == id)?.piece;
        return type;
    }
    isPotentialMove(pieceId: number, tileId: string){
        var isPotentialMove = this.piecesData.find(p => p.id == pieceId)?.potentialMoves.includes(tileId);
        if(isPotentialMove){
            return true;
        }
        else{
            return false
        }
    }
    removePieceFromTile(tileId: number){
        this.piecesData.find(p => p.id == tileId)!.piece = "";
        this.piecesData.find(p => p.id == tileId)!.pieceType = "";
        this.piecesData.find(p => p.id == tileId)!.colour = "";
        this.deleteAllPotentialMoves(tileId);
    }
    addBlackPieceOnTile(tileId: number, latestPieceType: string){
        this.piecesData.find(p => p.id == tileId)!.colour = "black";

        switch(latestPieceType)
       {
          case 'rook':
            this.piecesData.find(p => p.id == tileId)!.piece = "rook";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.BlackRook;
            break;
          case 'pawn':
            this.piecesData.find(p => p.id == tileId)!.piece = "pawn";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.BlackPawn;
            break;
          case 'horse':
            this.piecesData.find(p => p.id == tileId)!.piece = "horse";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.BlackHorse;
            break;
          case 'bishop':
            this.piecesData.find(p => p.id == tileId)!.piece = "bishop";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.BlackBishop;
            break;
          case 'queen':
            this.piecesData.find(p => p.id == tileId)!.piece = "queen";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.BlackQueen;
            break;
          case 'king':
            this.piecesData.find(p => p.id == tileId)!.piece = "king";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.BlackKing;
            break;
       }
    }

    addWhitePieceOnTile(tileId: number, latestPieceType: string){
        this.piecesData.find(p => p.id == tileId)!.colour = "white";

        switch(latestPieceType)
       {
          case 'rook':
            this.piecesData.find(p => p.id == tileId)!.piece = "rook";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.WhiteRook;
            break;
          case 'pawn':
            this.piecesData.find(p => p.id == tileId)!.piece = "pawn";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.WhitePawn;
            break;
          case 'horse':
            this.piecesData.find(p => p.id == tileId)!.piece = "horse";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.WhiteHorse;
            break;
          case 'bishop':
            this.piecesData.find(p => p.id == tileId)!.piece = "bishop";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.WhiteBishop;
            break;
          case 'queen':
            this.piecesData.find(p => p.id == tileId)!.piece = "queen";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.WhiteQueen;
            break;
          case 'king':
            this.piecesData.find(p => p.id == tileId)!.piece = "king";
            this.piecesData.find(p => p.id == tileId)!.pieceType = ChessFigures.WhiteKing;
            break;
       }
    }

    returnPiece(id: number){
        var piece = this.piecesData.find(p => p.id == id)?.pieceType;
        return piece;
    }

}