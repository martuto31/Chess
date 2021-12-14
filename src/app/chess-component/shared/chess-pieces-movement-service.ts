import { Injectable } from "@angular/core";
import { chessPiecesDataService } from "./chess-pieces-data-service";

@Injectable()
export class piecesMovementService
{
    public latestFieldId: string = "";
    public latestPieceType: string = "";
    public latestPieceColour: string = "";
    public inCheck: boolean = false;
    public figurePlacingCheckId: string = "";
    private isQueenMovement: boolean = false;

    constructor(private chessPiecesDataService: chessPiecesDataService){
    }

    /*isInCheck(kingColour: string){
        if(kingColour === "white")
        {
            var whiteKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "white"))!.id;
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "black" && element.potentialMoves.includes(whiteKingPos!.toString()))
                {
                    this.inCheck = true;
                    this.figurePlacingCheckId = element.id.toString();
                }
            });
        }
        else if(kingColour === "black")
        {
            var blackKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "black"))!.id;
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "white" && element.potentialMoves.includes(blackKingPos!.toString()))
                {
                    this.inCheck = true;
                    this.figurePlacingCheckId = element.id.toString();
                }
            });
        }
    }*/

    isMyKingInCheckAfterMyMove(pieceId: string, potentialMoveId: string, pieceColour: string, piece: string,){
        //clearing the tile of the selected piece to check if the king would be in check after move of the selected piece
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.colour = "";
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.piece = "";

        var pieceOntoPotentialMove: string = this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.piece;
        var colourOntoPotentialMove: string = this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.colour;
        console.log(pieceOntoPotentialMove);
        var noPieceOntoPotentialMove: boolean = false;
        //simulating a move and checking if the King still would be in check after making a move
        if(pieceOntoPotentialMove === "")
        {
            noPieceOntoPotentialMove = true;
        }
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.colour = pieceColour;
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.piece = piece;

        var isInCheckAfterMove: boolean = false;

        if(pieceColour === "white")
        {
            var whiteKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "white"))!.id;
            this.removeAllColourPotentialMoves("black");
            this.checkAllColourPotentialMoves("black");
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "black" && element.potentialMoves.includes(whiteKingPos.toString()))
                {
                    isInCheckAfterMove = true;
                }
            });
            if(noPieceOntoPotentialMove)
            {
                this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.colour = "";
                this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.piece = "";
            }
            else
            {
                this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.colour = colourOntoPotentialMove;
                this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.piece = pieceOntoPotentialMove;
            }
            this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.colour = pieceColour;
            this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.piece = piece;
            this.removeAllColourPotentialMoves("black");
            this.checkAllColourPotentialMoves("black");
        }
        else if(pieceColour === "black")
        {
            console.log(this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId)));
            var blackKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "black"))!.id;
            this.removeAllColourPotentialMoves("white");
            this.checkAllColourPotentialMoves("white");
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "white" && element.potentialMoves.includes(blackKingPos.toString()))
                {
                    console.log("the king is in check from: " + piece);
                    isInCheckAfterMove = true;
                }
            });
            if(noPieceOntoPotentialMove)
            {
                this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.colour = "";
                this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.piece = "";
            }
            else
            {
                this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.colour = colourOntoPotentialMove;
                this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.piece = pieceOntoPotentialMove;
            }
            this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.colour = pieceColour;
            this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.piece = piece;
            this.removeAllColourPotentialMoves("white");
            this.checkAllColourPotentialMoves("white");
        }
        return isInCheckAfterMove;
    }

    checkAllPotentialMoves()
    {
        this.chessPiecesDataService.piecesData.forEach(element => {
            if(element.colour === "white")
            {
                switch(element.piece)
                {
                    case "pawn":
                        this.whitePawnMovement(element.id.toString());
                        break;
                    case "rook":
                            this.whiteRookMovement(element.id.toString());
                            break;
                    case "horse":
                            this.whiteHorseMovement(element.id.toString());
                            break;
                    case "bishop":
                            this.whiteBishopMovement(element.id.toString());
                            break;
                    case "queen":
                            this.whiteQueenMovement(element.id.toString());
                            break;
                    case "king":
                            this.whiteKingMovement(element.id.toString());
                            break;
                    default:
                            break;
                }
            }
            else if(element.colour === "black")
            {
                switch(element.piece)
                {
                    case "pawn":
                        this.blackPawnMovement(element.id.toString());
                        break;
                    case "rook":
                        this.blackRookMovement(element.id.toString());
                        break;
                    case "horse":
                        this.blackHorseMovement(element.id.toString());
                        break;
                    case "bishop":
                        this.blackBishopMovement(element.id.toString());
                        break;
                    case "queen":
                        this.blackQueenMovement(element.id.toString());
                        break;
                    case "king":
                        this.blackKingMovement(element.id.toString());
                        break;
                    default:
                        break;
                }
            }
        });
    }

    checkAllColourPotentialMoves(checkThisColour: string){
        if(checkThisColour === "white")
        {
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "white")
                {
                    switch(element.piece)
                    {
                        case "pawn":
                            this.whitePawnMovement(element.id.toString());
                            break;
                        case "rook":
                            this.whiteRookMovement(element.id.toString());
                            break;
                        case "horse":
                            this.whiteHorseMovement(element.id.toString());
                            break;
                        case "bishop":
                            this.whiteBishopMovement(element.id.toString());
                            break;
                        case "queen":
                            this.whiteQueenMovement(element.id.toString());
                            break;
                        case "king":
                            this.whiteKingMovement(element.id.toString());
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        else if(checkThisColour === "black")
        {
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "black")
                {
                    switch(element.piece)
                    {
                        case "pawn":
                            this.blackPawnMovement(element.id.toString());
                            break;
                        case "rook":
                            this.blackRookMovement(element.id.toString());
                            break;
                        case "horse":
                            this.blackHorseMovement(element.id.toString());
                            break;
                        case "bishop":
                            this.blackBishopMovement(element.id.toString());
                            break;
                        case "queen":
                            this.blackQueenMovement(element.id.toString());
                            break;
                        case "king":
                            this.blackKingMovement(element.id.toString());
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }
    removeAllPotentialMoves(){
        this.chessPiecesDataService.piecesData.forEach(element => {
            this.chessPiecesDataService.deleteAllPotentialMoves(element.id);
        });
    }

    removeAllColourPotentialMoves(removeColour: string){
        this.chessPiecesDataService.piecesData.forEach(element => {
            this.chessPiecesDataService.deleteAllColourPotentialMoves(element.id, removeColour);
        });
    }

    showAllPotentialMoves(id: number, latestColour: string, latestPiece: string){
        this.latestPieceColour = latestColour;
        this.latestPieceType = latestPiece;
        this.latestFieldId = id.toString();
        var arrayOfPotentialMoves: string[];
        arrayOfPotentialMoves = this.chessPiecesDataService.piecesData.find(p => p.id == id)!.potentialMoves;
        console.log("array: "+ arrayOfPotentialMoves);
        for(var i = 0; i < arrayOfPotentialMoves.length; i++)
        {
            document.getElementById(arrayOfPotentialMoves[i])?.classList.add("potentialMove");
        }
    }

    public blackPawnMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        var posAfterOneMoveUpwards: string = (++colPos).toString() + rowPos.toString();
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        var posAfterTwoMovesUpwards: string = (colPos+2).toString() + rowPos.toString();
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        var posAfterRightEnemyMove: string = (++colPos).toString() + (++rowPos).toString();
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        var posAfterLeftEnemyMove: string = (++colPos).toString() + (--rowPos).toString();
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        //Pawn movement after its first move -> pawn is only able to move upwards and if there is enemy piece upRight and if its king it will go in check()
        
        //Checks if the upward tile is clear from black or white piece and marks the tile as a potentialMove if it is clear
        if(this.chessPiecesDataService.isTileClear(parseInt(posAfterOneMoveUpwards)))
        {
            
            if(!this.isMyKingInCheckAfterMyMove(id,posAfterOneMoveUpwards, "black", "pawn"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id),posAfterOneMoveUpwards);
            }
        }

        //Cheks if two tiles upward the tile is clear from black or white piece and if its the first move of the pawn(on col 2) - mark as a potentialMove
        if(this.chessPiecesDataService.isTileClear(parseInt(posAfterTwoMovesUpwards)) && colPos == 2)
        {
            if(!this.isMyKingInCheckAfterMyMove(id,posAfterTwoMovesUpwards, "black", "pawn"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterTwoMovesUpwards);
            }
        }

        //checks if there is enemy on the right side 1 column upwards
        if(this.chessPiecesDataService.isThePieceWhite(parseInt(posAfterRightEnemyMove)))
        {
            if(!this.isMyKingInCheckAfterMyMove(id, posAfterRightEnemyMove, "black", "pawn"))
            {
             this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterRightEnemyMove);
            }
        }

        //checks if there is enemy on the left side 1 column upwards
        if(this.chessPiecesDataService.isThePieceWhite(parseInt(posAfterLeftEnemyMove)))
        {
            if(!this.isMyKingInCheckAfterMyMove(id,posAfterLeftEnemyMove, "black", "pawn"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterLeftEnemyMove);
            }
        }

        //if(colPos == 2 && this.isClear(id))
    }

    public blackRookMovement(id: string)
    {
        var currentMovement: string = "rook";
        if(this.isQueenMovement)
        {
            currentMovement = "queen";
        }
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);    

        var noMoreUpwardMoves = false;
        var noMoreDownwardMoves = false;
        var noMoreRightMoves = false;
        var noMoreLeftMoves = false;

        //checks for all possible upward moves
        for(var c = colPos + 1; c <= 8; c++)
        {
            if(!noMoreUpwardMoves)
            {
                var currentIterationId = c.toString() + rowPos.toString();
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId)))
                {
                    noMoreUpwardMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId, "black",currentMovement))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                    }
                    else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId, "black",currentMovement))
                    {
                        noMoreUpwardMoves = true;
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                    }
                }
            }
            else{
                break;
            }
        }

        //checks for all possible downward moves
        for(var c1 = colPos - 1; c1 >= 1; c1--)
        {
            if(!noMoreDownwardMoves)
            {
                var currentIterationId1 = c1.toString() + rowPos.toString();
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId1)))
                {
                    noMoreDownwardMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId1)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId1, "black", currentMovement))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                    }
                    else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId1)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId1, "black", currentMovement))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                        noMoreDownwardMoves = true;
                    }
                }
            }
            else
            {
                break;
            }
        }

        //checks for all possible right moves
        for(var r = rowPos + 1; r <= 8; r++)
        {
            if(!noMoreRightMoves)
            {
                var currentIterationId2 = colPos.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId2)))
                {
                    noMoreRightMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId2)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId2, "black" ,currentMovement))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                    }
                    else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId2)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId2, "black",currentMovement))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                        noMoreRightMoves = true;
                    }
                }
            }
            else
            {
                break;
            }
        }

        //checks for all possible left moves
        for(var r1 = rowPos - 1; r1 >=1; r1--)
        {
            if(!noMoreLeftMoves)
            {
                var currentIterationId3 = colPos.toString() + r1.toString();
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId3)))
                {
                    noMoreLeftMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId3)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId3, "black",currentMovement))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                    }
                    else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId3)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId3, "black",currentMovement))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                        noMoreLeftMoves = true;
                    }
                }
            }
            else
            {
                break;
            }
        }
    }
 //check if the break in the else does save cpu time

    public blackHorseMovement(id: string)
    {
        console.log(id);
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        var upLeftLMove = (colPos+2).toString() + (rowPos-1).toString();
        var upRightLMove = (colPos+2).toString() + (rowPos+1).toString();
        var leftUpLMove = (colPos+1).toString() + (rowPos -2).toString();
        var leftDownLMove = (colPos-1).toString() + (rowPos-2).toString();
        var rightUpLMove = (colPos+1).toString() + (rowPos+2).toString();
        var rightDownLMove = (colPos-1).toString() + (rowPos+2).toString();
        var downRightLMove = (colPos-2).toString() + (rowPos+1).toString();
        var downLeftLMove = (colPos-2).toString() + (rowPos-1).toString();

        var filteredHorseMovesArrLenght;
        var filteredHorseMovesArr: string[] = [];
        var horseMovesArr: string[] = [upLeftLMove,upRightLMove,leftUpLMove,leftDownLMove,rightUpLMove,rightDownLMove,downRightLMove,downLeftLMove];
        
        //without values outside of chess board boundaries
        for(var i = 0; i < horseMovesArr.length; i++)
        {
            var currentPotentialHorseMove = horseMovesArr[i];
            if(parseInt(currentPotentialHorseMove[0]) > 0 && parseInt(currentPotentialHorseMove[0]) < 9)
            {
                if(parseInt(currentPotentialHorseMove[1]) > 0 && parseInt(currentPotentialHorseMove[1]) < 9)
                {
                    filteredHorseMovesArrLenght = filteredHorseMovesArr.unshift(currentPotentialHorseMove);
                }
            }
        }

        for(var i = 0; i < filteredHorseMovesArr.length; i++)
        {
            if(!this.chessPiecesDataService.isThePieceBlack(parseInt(filteredHorseMovesArr[i])) && !this.isMyKingInCheckAfterMyMove(id, filteredHorseMovesArr[i],"black","horse"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredHorseMovesArr[i]);
            }
        }
    }

    public blackBishopMovement(id: string)
    {
        var currentMovement: string = "bishop";
        if(this.isQueenMovement)
        {
            currentMovement = "queen";
        }
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        //checks whether there is a piece on the way
        var noMoreUL = false;
        var noMoreUR = false;
        var noMoreDL = false;
        var noMoreDR = false;

        var c = colPos + 1;
        var r = rowPos - 1;

        //col+i row-i UL
        while(c <= 8 && r > 0)
        {
            if(!noMoreUL)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                {
                    noMoreUL = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                    {
                        if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentMovement))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        }
                    }
                    else
                    {
                        if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentMovement))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                            noMoreUL = true;
                        }
                    }
                }
            }
            else
            {
                break;
            }
            c++;
            r--;
        }

        c = colPos+1;
        r = rowPos+1;

        //col+i row+i UR
        while(c <= 8 && r <= 8)
        {
            if(!noMoreUR)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                {
                    noMoreUR = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                    {
                        if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentMovement))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        }
                    }
                    else
                    {
                        if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentMovement))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                            noMoreUR = true;
                        }
                    }
                }
            }
            else
            {
                break;
            }
            c++;
            r++;
        }

        c = colPos-1;
        r = rowPos-1;

        //col-i row-i DL
        while(c > 0 && r > 0)
        {
            if(!noMoreDL)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                {
                    noMoreDL = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                    {
                        if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentMovement))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        }
                    }
                    else
                    {
                        if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentMovement))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                            noMoreDL = true;
                        }
                    }
                }
            }
            else
            {
                break;
            }
            c--;
            r--;
        }
        
        c = colPos-1;
        r = rowPos+1;

        //col-i row+i DR
        while(c > 0 && r <= 8)
        {
            if(!noMoreDR)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                {
                    noMoreDR = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                    {
                        if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentMovement))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        }
                    }
                    else
                    {
                        if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentMovement))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                            noMoreDR = true;
                        }
                    }
                }
            }
            else
            {
                break;
            }
            c--;
            r++;
        }
    }

    public blackKingMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        //col+1
        var upMove = (colPos+1).toString() + rowPos.toString();
        //col-1
        var downMove = (colPos-1).toString() + rowPos.toString();
        //row+1
        var rightMove = (colPos).toString() + (rowPos+1).toString();
        //row-1
        var leftMove = (colPos).toString() + (rowPos-1).toString();
        //col+1 row-1
        var upLeftMove = (colPos+1).toString() + (rowPos-1).toString();
        //col+1 row+1
        var upRightMove = (colPos+1).toString() + (rowPos+1).toString();
        //col-1 row-1
        var downLeftMove = (colPos-1).toString() + (rowPos-1).toString();
        //col-1 row+1
        var downRightMove = (colPos-1).toString() + (rowPos+1).toString();

        var filteredKingMovesArr: string[] = [];
        var kingMovesArr: string[] = [upMove, downMove, rightMove, leftMove, upLeftMove, upRightMove, downLeftMove, downRightMove];

        for(var i = 0; i < kingMovesArr.length; i++)
        {
            var currPotentialKingMove = kingMovesArr[i];
            if(parseInt(currPotentialKingMove[0]) > 0 && parseInt(currPotentialKingMove[0]) < 9)
            {
                if(parseInt(currPotentialKingMove[1]) > 0 && parseInt(currPotentialKingMove[1]) < 9)
                {
                    filteredKingMovesArr.unshift(currPotentialKingMove);
                }
            }
        }
        for(var s = 0; s < filteredKingMovesArr.length; s++)
        {
            if(!this.chessPiecesDataService.isThePieceBlack(parseInt(filteredKingMovesArr[s])) && !this.isMyKingInCheckAfterMyMove(id,filteredKingMovesArr[s],"black","king"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredKingMovesArr[s]);
            }
        }
    }

    public blackQueenMovement(id: string)
    {
        this.isQueenMovement = true;
        this.blackRookMovement(id);
        this.isQueenMovement = true;
        this.blackBishopMovement(id);
        this.isQueenMovement = false;
    }

    public whitePawnMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);


        var posAfterOneMoveDownwards: string = (--colPos).toString() + rowPos.toString();
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        var posAfterTwoMovesDownwards: string = (colPos-2).toString() + rowPos.toString();
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        var posAfterRightEnemyMove: string = (--colPos).toString() + (++rowPos).toString();
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        var posAfterLeftEnemyMove: string = (--colPos).toString() + (--rowPos).toString();
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        //Pawn movement after its first move -> pawn is only able to move upwards and if there is enemy piece upRight and if its king it will go in check()
        
        //Checks if the upward tile is clear from black or white piece and marks the tile as a potentialMove if it is clear
        if(this.chessPiecesDataService.isTileClear(parseInt(posAfterOneMoveDownwards)))
        {
            this.chessPiecesDataService.addPotentialMove(parseInt(id),posAfterOneMoveDownwards);
        }

        //Cheks if two tiles upward the tile is clear from black or white piece and if its the first move of the pawn(on col 2) - mark as a potentialMove
        if(this.chessPiecesDataService.isTileClear(parseInt(posAfterTwoMovesDownwards)) && colPos == 7)
        {
            this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterTwoMovesDownwards);
        }

        //checks if there is enemy on the right side 1 column upwards
        if(this.chessPiecesDataService.isThePieceBlack(parseInt(posAfterRightEnemyMove)))
        {
            this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterRightEnemyMove);
        }

        //checks if there is enemy on the left side 1 column upwards
        if(this.chessPiecesDataService.isThePieceBlack(parseInt(posAfterLeftEnemyMove)))
        {
            this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterLeftEnemyMove);
        }

        //if(colPos == 2 && this.isClear(id))
    }

    public whiteRookMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);    

        var noMoreUpwardMoves = false;
        var noMoreDownwardMoves = false;
        var noMoreRightMoves = false;
        var noMoreLeftMoves = false;

        //checks for all possible upward moves
        for(var c = colPos + 1; c <= 8; c++)
        {
            if(!noMoreUpwardMoves)
            {
                var currentIterationId = c.toString() + rowPos.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId)))
                {
                    noMoreUpwardMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                    }
                    else
                    {
                        noMoreUpwardMoves = true;
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                    }
                }
            }
            else{
                break;
            }
        }

        //checks for all possible downward moves
        for(var c1 = colPos - 1; c1 >= 1; c1--)
        {
            if(!noMoreDownwardMoves)
            {
                var currentIterationId1 = c1.toString() + rowPos.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId1)))
                {
                    noMoreDownwardMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId1)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                        noMoreDownwardMoves = true;
                    }
                }
            }
            else
            {
                break;
            }
        }

        //checks for all possible right moves
        for(var r = rowPos + 1; r <= 8; r++)
        {
            if(!noMoreRightMoves)
            {
                var currentIterationId2 = colPos.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId2)))
                {
                    noMoreRightMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId2)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                        noMoreRightMoves = true;
                    }
                }
            }
            else
            {
                break;
            }
        }

        //checks for all possible left moves
        for(var r1 = rowPos - 1; r1 >=1; r1--)
        {
            if(!noMoreLeftMoves)
            {
                var currentIterationId3 = colPos.toString() + r1.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId3)))
                {
                    noMoreLeftMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId3)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                        noMoreLeftMoves = true;
                    }
                }
            }
            else
            {
                break;
            }
        }
    }
 //check if the break in the else does save cpu time

    public whiteHorseMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        var upLeftLMove = (colPos+2).toString() + (rowPos-1).toString();
        var upRightLMove = (colPos+2).toString() + (rowPos+1).toString();
        var leftUpLMove = (colPos+1).toString() + (rowPos -2).toString();
        var leftDownLMove = (colPos-1).toString() + (rowPos-2).toString();
        var rightUpLMove = (colPos+1).toString() + (rowPos+2).toString();
        var rightDownLMove = (colPos-1).toString() + (rowPos+2).toString();
        var downRightLMove = (colPos-2).toString() + (rowPos+1).toString();
        var downLeftLMove = (colPos-2).toString() + (rowPos-1).toString();

        var horseMovesArr: string[] = [upLeftLMove,upRightLMove,leftUpLMove,leftDownLMove,rightUpLMove,rightDownLMove,downRightLMove,downLeftLMove];
        
        for(var i = 0; i < horseMovesArr.length; i++)
        {
            if(!this.chessPiecesDataService.isThePieceWhite(parseInt(horseMovesArr[i])))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), horseMovesArr[i]);
            }
        }
    }

    public whiteBishopMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        //checks whether there is a piece on the way
        var noMoreUL = false;
        var noMoreUR = false;
        var noMoreDL = false;
        var noMoreDR = false;

        var c = colPos + 1;
        var r = rowPos - 1;

        //col+i row-i UL
        while(c <= 8 && r > 0)
        {
            if(!noMoreUL)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                {
                    noMoreUL = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        noMoreUL = true;
                    }
                }
            }
            else
            {
                break;
            }
            c++;
            r--;
        }

        c = colPos+1;
        r = rowPos+1;

        //col+i row+i UR
        while(c <= 8 && r <= 8)
        {
            if(!noMoreUR)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                {
                    noMoreUR = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        noMoreUR = true;
                    }
                }
            }
            else
            {
                break;
            }
            c++;
            r++;
        }

        c = colPos-1;
        r = rowPos-1;

        //col-i row-i DL
        while(c > 0 && r > 0)
        {
            if(!noMoreDL)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                {
                    noMoreDL = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        noMoreDL = true;
                    }
                }
            }
            else
            {
                break;
            }
            c--;
            r--;
        }
        
        c = colPos-1;
        r = rowPos+1;

        //col-i row+i DR
        while(c > 0 && r <= 8)
        {
            if(!noMoreDR)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                {
                    noMoreDR = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        noMoreDR = true;
                    }
                }
            }
            else
            {
                break;
            }
            c--;
            r++;
        }
    }

    public whiteKingMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        //col+1
        var upMove = (colPos+1).toString() + rowPos.toString();
        //col-1
        var downMove = (colPos-1).toString() + rowPos.toString();
        //row+1
        var rightMove = (colPos).toString() + (rowPos+1).toString();
        //row-1
        var leftMove = (colPos).toString() + (rowPos-1).toString();
        //col+1 row-1
        var upLeftMove = (colPos+1).toString() + (rowPos-1).toString();
        //col+1 row+1
        var upRightMove = (colPos+1).toString() + (rowPos+1).toString();
        //col-1 row-1
        var downLeftMove = (colPos-1).toString() + (rowPos-1).toString();
        //col-1 row+1
        var downRightMove = (colPos-1).toString() + (rowPos+1).toString();

        var kingMovesArr: string[] = [upMove, downMove, rightMove, leftMove, upLeftMove, upRightMove, downLeftMove, downRightMove];

        for(var s = 0; s < kingMovesArr.length; s++)
        {
            if(!this.chessPiecesDataService.isThePieceWhite(parseInt(kingMovesArr[s])))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), kingMovesArr[s]);
            }
        }
    }

    public whiteQueenMovement(id: string)
    {
        //Bishop
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);

        //checks whether there is a piece on the way
        var noMoreUL = false;
        var noMoreUR = false;
        var noMoreDL = false;
        var noMoreDR = false;

        var c = colPos + 1;
        var r = rowPos - 1;

        //col+i row-i UL
        while(c <= 8 && r > 0)
        {
            if(!noMoreUL)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                {
                    noMoreUL = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        noMoreUL = true;
                    }
                }
            }
            else
            {
                break;
            }
            c++;
            r--;
        }

        c = colPos+1;
        r = rowPos+1;

        //col+i row+i UR
        while(c <= 8 && r <= 8)
        {
            if(!noMoreUR)
            {
                var currentIterationBid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                {
                    noMoreUR = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        noMoreUR = true;
                    }
                }
            }
            else
            {
                break;
            }
            c++;
            r++;
        }

        c = colPos-1;
        r = rowPos-1;

        //col-i row-i DL
        while(c > 0 && r > 0)
        {
            if(!noMoreDL)
            {
                var currentIterationCid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationCid)))
                {
                    noMoreDL = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationCid)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationCid);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationCid);
                        noMoreDL = true;
                    }
                }
            }
            else
            {
                break;
            }
            c--;
            r--;
        }
        
        c = colPos-1;
        r = rowPos+1;

        //col-i row+i DR
        while(c > 0 && r <= 8)
        {
            if(!noMoreDR)
            {
                var currentIterationGid = c.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationGid)))
                {
                    noMoreDR = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationGid)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationGid);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationGid);
                        noMoreDR = true;
                    }
                }
            }
            else
            {
                break;
            }
            c--;
            r++;
        }
        //rook
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);    

        var noMoreUpwardMoves = false;
        var noMoreDownwardMoves = false;
        var noMoreRightMoves = false;
        var noMoreLeftMoves = false;

        //checks for all possible upward moves
        for(var c = colPos + 1; c <= 8; c++)
        {
            if(!noMoreUpwardMoves)
            {
                var currentIterationId = c.toString() + rowPos.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId)))
                {
                    noMoreUpwardMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                    }
                    else
                    {
                        noMoreUpwardMoves = true;
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                    }
                }
            }
            else{
                break;
            }
        }

        //checks for all possible downward moves
        for(var c1 = colPos - 1; c1 >= 1; c1--)
        {
            if(!noMoreDownwardMoves)
            {
                var currentIterationId1 = c1.toString() + rowPos.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId1)))
                {
                    noMoreDownwardMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId1)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                        noMoreDownwardMoves = true;
                    }
                }
            }
            else
            {
                break;
            }
        }

        //checks for all possible right moves
        for(var r = rowPos + 1; r <= 8; r++)
        {
            if(!noMoreRightMoves)
            {
                var currentIterationId2 = colPos.toString() + r.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId2)))
                {
                    noMoreRightMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId2)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                        noMoreRightMoves = true;
                    }
                }
            }
            else
            {
                break;
            }
        }

        //checks for all possible left moves
        for(var r1 = rowPos - 1; r1 >=1; r1--)
        {
            if(!noMoreLeftMoves)
            {
                var currentIterationId3 = colPos.toString() + r1.toString();
                if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId3)))
                {
                    noMoreLeftMoves = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId3)))
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                    }
                    else
                    {
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                        noMoreLeftMoves = true;
                    }
                }
            }
            else
            {
                break;
            }
        }
    }

    public allWhitePotentialMovements(){

    }

    public allBlackPotentialMovements(){

    }
}