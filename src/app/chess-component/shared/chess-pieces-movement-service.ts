import { Component, Injectable } from "@angular/core";
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
    public currentTurn: boolean = true;
    public inFuncCounter: number = 0;
    //true is white, false is black

    constructor(private chessPiecesDataService: chessPiecesDataService){
    }

    // isInCheck(kingColour: string){
    //     if(kingColour === "white")
    //     {
    //         var whiteKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "white"))!.id;
    //         this.chessPiecesDataService.piecesData.forEach(element => {
    //             if(element.colour === "black" && element.potentialMoves.includes(whiteKingPos!.toString()))
    //             {
    //                 this.inCheck = true;
    //                 this.figurePlacingCheckId = element.id.toString();
    //             }
    //         });
    //     }
    //     else if(kingColour === "black")
    //     {
    //         var blackKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "black"))!.id;
    //         this.chessPiecesDataService.piecesData.forEach(element => {
    //             if(element.colour === "white" && element.potentialMoves.includes(blackKingPos!.toString()))
    //             {
    //                 this.inCheck = true;
    //                 this.figurePlacingCheckId = element.id.toString();
    //             }
    //         });
        // }
    // }

    setCurrentTurn(currTurn: boolean)
    {
        this.currentTurn = currTurn;
    }


    isMyKingInCheckAfterMyMove(pieceId: string, potentialMoveId: string, pieceColour: string, piece: string,){
        //clearing the tile of the selected piece to check if the king would be in check after move of the selected piece
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.colour = "";
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.piece = "";

        this.inFuncCounter++;

        //console.log("its in king check func");
        var pieceOntoPotentialMove: string = this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.piece;
        var colourOntoPotentialMove: string = this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(potentialMoveId))!.colour;
        //console.log(pieceOntoPotentialMove);
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
            //this.removeAllColourPotentialMoves("black");
            this.checkAllColourPotentialMoves("black", true);
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
            // this.checkAllColourPotentialMoves("black", true);
            // if(this.currentTurn === false)
            // {
            //     this.checkAllColourPotentialMoves("black", false);
            // }
            // else
            // {
            //     this.checkAllColourPotentialMoves("black", true);
            // }
        }
        else if(pieceColour === "black")
        {
            //console.log(this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId)));
            var blackKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "black"))!.id;
            //this.removeAllColourPotentialMoves("white");
            this.checkAllColourPotentialMoves("white", true);
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "white" && element.potentialMoves.includes(blackKingPos.toString()))
                {
                    //console.log("the king is in check from: " + piece);
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
            // this.checkAllColourPotentialMoves("white", true);
            // if(this.currentTurn === false)
            // {
            //     this.checkAllColourPotentialMoves("white", true);
            // }
            // else
            // {
            //     this.checkAllColourPotentialMoves("white", false);
            // }
        }
        return isInCheckAfterMove;
    }

    // checkAllPotentialMovesById(pieceId: string, pieceColour: string, pieceType: string)
    // {
    //     if(pieceColour === "white")
    //         {
    //             switch(pieceType)
    //             {
    //                 case "pawn":
    //                     this.whitePawnMovement(pieceId, false);
    //                     break;
    //                 case "rook":
    //                         this.whiteRookMovement(pieceId, false);
    //                         break;
    //                 case "horse":
    //                         this.whiteHorseMovement(pieceId, false);
    //                         break;
    //                 case "bishop":
    //                         this.whiteBishopMovement(pieceId, false);
    //                         break;
    //                 case "queen":
    //                         this.whiteQueenMovement(pieceId, false);
    //                         break;
    //                 case "king":
    //                         this.whiteKingMovement(pieceId, false);
    //                         break;
    //                 default:
    //                         break;
    //             }
    //         }
    //         else if(pieceColour === "black")
    //         {
    //             switch(pieceType)
    //             {
    //                 case "pawn":
    //                     this.blackPawnMovement(pieceId, false);
    //                     break;
    //                 case "rook":
    //                     this.blackRookMovement(pieceId, false);
    //                     break;
    //                 case "horse":
    //                     this.blackHorseMovement(pieceId, false);
    //                     break;
    //                 case "bishop":
    //                     this.blackBishopMovement(pieceId, false);
    //                     break;
    //                 case "queen":
    //                     this.blackQueenMovement(pieceId, false);
    //                     break;
    //                 case "king":
    //                     this.blackKingMovement(pieceId, false);
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    // }

    checkAllPotentialMoves()
    {
        this.chessPiecesDataService.piecesData.forEach(element => {
            if(element.colour === "white")
            {
                switch(element.piece)
                {
                    case "pawn":
                        this.whitePawnMovement(element.id.toString(), false);
                        break;
                    case "rook":
                            this.whiteRookMovement(element.id.toString(), false);
                            break;
                    case "horse":
                            this.whiteHorseMovement(element.id.toString(), false);
                            break;
                    case "bishop":
                            this.whiteBishopMovement(element.id.toString(), false);
                            break;
                    case "queen":
                            this.whiteQueenMovement(element.id.toString(), false);
                            break;
                    case "king":
                            this.whiteKingMovement(element.id.toString(), false);
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
                        this.blackPawnMovement(element.id.toString(), false);
                        break;
                    case "rook":
                        this.blackRookMovement(element.id.toString(), false);
                        break;
                    case "horse":
                        this.blackHorseMovement(element.id.toString(), false);
                        break;
                    case "bishop":
                        this.blackBishopMovement(element.id.toString(), false);
                        break;
                    case "queen":
                        this.blackQueenMovement(element.id.toString(), false);
                        break;
                    case "king":
                        this.blackKingMovement(element.id.toString(), false);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    checkAllColourPotentialMoves(checkThisColour: string, isInCheckFunc: boolean){
        if(checkThisColour === "white")
        {
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "white")
                {
                    switch(element.piece)
                    {
                        case "pawn":
                            this.whitePawnMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "rook":
                            this.whiteRookMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "horse":
                            this.whiteHorseMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "bishop":
                            this.whiteBishopMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "queen":
                            this.whiteQueenMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "king":
                            this.whiteKingMovement(element.id.toString(), isInCheckFunc);
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
                            this.blackPawnMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "rook":
                            this.blackRookMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "horse":
                            this.blackHorseMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "bishop":
                            this.blackBishopMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "queen":
                            this.blackQueenMovement(element.id.toString(), isInCheckFunc);
                            break;
                        case "king":
                            this.blackKingMovement(element.id.toString(), isInCheckFunc);
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
        //console.log("array: "+ arrayOfPotentialMoves);
        for(var i = 0; i < arrayOfPotentialMoves.length; i++)
        {
            document.getElementById(arrayOfPotentialMoves[i])?.classList.add("potentialMove");
        }
    }

    public blackPawnMovement(id: string, whiteKingCheck: boolean)
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
        
        if(whiteKingCheck)
        {
            //Checks if the upward tile is clear from black or white piece and marks the tile as a potentialMove if it is clear
            if(this.chessPiecesDataService.isTileClear(parseInt(posAfterOneMoveUpwards)))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id),posAfterOneMoveUpwards);
            }

            //Cheks if two tiles upward the tile is clear from black or white piece and if its the first move of the pawn(on col 2) - mark as a potentialMove
            if(this.chessPiecesDataService.isTileClear(parseInt(posAfterTwoMovesUpwards)) && colPos == 2)
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterTwoMovesUpwards);
            }

            //checks if there is enemy on the right side 1 column upwards
            if(this.chessPiecesDataService.isThePieceWhite(parseInt(posAfterRightEnemyMove)))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterRightEnemyMove);
            }

            //checks if there is enemy on the left side 1 column upwards
            if(this.chessPiecesDataService.isThePieceWhite(parseInt(posAfterLeftEnemyMove)))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterLeftEnemyMove);
            }
        }
        else
        {
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
        }

        

        //if(colPos == 2 && this.isClear(id))
    }

    public blackRookMovement(id: string, whiteKingCheck: boolean)
    {
        var currentFigure: string = "rook";
        if(this.isQueenMovement)
        {
            currentFigure = "queen";
        }
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);    

        var noMoreUpwardMoves = false;
        var noMoreDownwardMoves = false;
        var noMoreRightMoves = false;
        var noMoreLeftMoves = false;

        if(whiteKingCheck)
        {
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
                        if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId)))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                        }
                        else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId)))
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
                        if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId1)))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                        }
                        else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId1)))
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
                        if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId2)))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                        }
                        else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId2)))
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
                        if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId3)))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                        }
                        else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId3)))
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
        else
        {
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
                        if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId, "black",currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                        }
                        else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId, "black",currentFigure))
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
                        if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId1)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId1, "black", currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                        }
                        else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId1)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId1, "black", currentFigure))
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
                        if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId2)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId2, "black" ,currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                        }
                        else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId2)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId2, "black",currentFigure))
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
                        if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId3)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId3, "black",currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                        }
                        else if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationId3)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId3, "black",currentFigure))
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
    }
 //check if the break in the else does save cpu time

    public blackHorseMovement(id: string, whiteKingCheck: boolean)
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


        var asdd;
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
                    asdd = filteredHorseMovesArr.unshift(currentPotentialHorseMove);
                }
            }
        }
        if(whiteKingCheck)
        {
            for(var i = 0; i < filteredHorseMovesArr.length; i++)
            {
                if(!this.chessPiecesDataService.isThePieceBlack(parseInt(filteredHorseMovesArr[i])))
                {
                    this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredHorseMovesArr[i]);
                }
            }
        }
        else
        {
            for(var i = 0; i < filteredHorseMovesArr.length; i++)
            {
                if(!this.chessPiecesDataService.isThePieceBlack(parseInt(filteredHorseMovesArr[i])) && !this.isMyKingInCheckAfterMyMove(id, filteredHorseMovesArr[i],"black","horse"))
                {
                    this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredHorseMovesArr[i]);
                }
            }
        }
    }

    public blackBishopMovement(id: string, whiteKingCheck: boolean)
    {
        var currentFigure: string = "bishop";
        if(this.isQueenMovement)
        {
            currentFigure = "queen";
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

        if(whiteKingCheck)
        {
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
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                {
                    noMoreUR = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
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
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                {
                    noMoreDL = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
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
                if(this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)))
                {
                    noMoreDR = true;
                }
                else
                {
                    if(!this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
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
        else
        {
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
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentFigure))
                            {
                                this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                            }
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentFigure))
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
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentFigure))
                            {
                                this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                            }
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentFigure))
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
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentFigure))
                            {
                                this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                            }
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentFigure))
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
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentFigure))
                            {
                                this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                            }
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid, "black", currentFigure))
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
    }

    public blackKingMovement(id: string, whiteKingCheck: boolean)
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
        if(whiteKingCheck)
        {
            for(var s = 0; s < filteredKingMovesArr.length; s++)
            {
                if(!this.chessPiecesDataService.isThePieceBlack(parseInt(filteredKingMovesArr[s])))
                {
                    this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredKingMovesArr[s]);
                }
            }
        }
        else
        {
            for(var s = 0; s < filteredKingMovesArr.length; s++)
            {
                if(!this.chessPiecesDataService.isThePieceBlack(parseInt(filteredKingMovesArr[s])) && !this.isMyKingInCheckAfterMyMove(id,filteredKingMovesArr[s],"black","king"))
                {
                    this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredKingMovesArr[s]);
                }
            }
        }
    }

    public blackQueenMovement(id: string, whiteKingCheck: boolean)
    {
        this.isQueenMovement = true;
        this.blackRookMovement(id, whiteKingCheck);
        this.isQueenMovement = true;
        this.blackBishopMovement(id, whiteKingCheck);
        this.isQueenMovement = false;
    }

    public whitePawnMovement(id: string, blackKingCheck: boolean)
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
        
        if(blackKingCheck)
        {
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
        }
        else
        {
                //Checks if the upward tile is clear from black or white piece and marks the tile as a potentialMove if it is clear
            if(this.chessPiecesDataService.isTileClear(parseInt(posAfterOneMoveDownwards)) && !this.isMyKingInCheckAfterMyMove(id, posAfterOneMoveDownwards, "white", "pawn"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id),posAfterOneMoveDownwards);
            }

            //Cheks if two tiles upward the tile is clear from black or white piece and if its the first move of the pawn(on col 2) - mark as a potentialMove
            if(this.chessPiecesDataService.isTileClear(parseInt(posAfterTwoMovesDownwards)) && colPos == 7 && !this.isMyKingInCheckAfterMyMove(id, posAfterTwoMovesDownwards, "white", "pawn"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterTwoMovesDownwards);
            }

            //checks if there is enemy on the right side 1 column upwards
            if(this.chessPiecesDataService.isThePieceBlack(parseInt(posAfterRightEnemyMove)) && !this.isMyKingInCheckAfterMyMove(id, posAfterRightEnemyMove, "white", "pawn"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterRightEnemyMove);
            }

            //checks if there is enemy on the left side 1 column upwards
            if(this.chessPiecesDataService.isThePieceBlack(parseInt(posAfterLeftEnemyMove)) && !this.isMyKingInCheckAfterMyMove(id, posAfterLeftEnemyMove, "white", "pawn"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterLeftEnemyMove);
            }
        }

        //if(colPos == 2 && this.isClear(id))
    }

    public whiteRookMovement(id: string, blackKingCheck: boolean)
    {
        var currentFigure: string = "rook";
        if(this.isQueenMovement)
        {
            currentFigure = "queen";
        }
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);    

        var noMoreUpwardMoves = false;
        var noMoreDownwardMoves = false;
        var noMoreRightMoves = false;
        var noMoreLeftMoves = false;

        if(blackKingCheck)
        {
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
        else
        {
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
                        if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId, "white", currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationId, "white", currentFigure))
                            {
                                noMoreUpwardMoves = true;
                                this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                            }
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
                        if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId1)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId1, "white", currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationId1, "white", currentFigure))
                            {
                                this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                                noMoreDownwardMoves = true;
                            }
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
                        if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId2)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId2, "white", currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationId2, "white", currentFigure))
                            {
                                this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                                noMoreRightMoves = true;
                            }
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
                        if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationId3)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationId3, "white", currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationId3, "white", currentFigure))
                            {
                                this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                                noMoreLeftMoves = true;
                            }
                        }
                    }
                }
                else
                {
                    break;
                }
            }
        }
    }
 //check if the break in the else does save cpu time

    public whiteHorseMovement(id: string, blackKingCheck: boolean)
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
        var filteredHorseMovesArr: string[] = [];

        for(var i = 0; i < horseMovesArr.length; i++)
        {
            var currentPotentialHorseMove = horseMovesArr[i];
            if(parseInt(currentPotentialHorseMove[0]) > 0 && parseInt(currentPotentialHorseMove[0]) < 9)
            {
                if(parseInt(currentPotentialHorseMove[1]) > 0 && parseInt(currentPotentialHorseMove[1]) < 9)
                {
                    //console.log("white horse: " + currentPotentialHorseMove);
                    filteredHorseMovesArr.unshift(currentPotentialHorseMove);
                }
            }
        }

        if(blackKingCheck)
        {
            for(var i = 0; i < filteredHorseMovesArr.length; i++)
            {
                if(!this.chessPiecesDataService.isThePieceWhite(parseInt(filteredHorseMovesArr[i])))
                {
                    this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredHorseMovesArr[i]);
                }
            }
        }
        else
        {
            for(var i = 0; i < filteredHorseMovesArr.length; i++)
            {
                if(!this.chessPiecesDataService.isThePieceWhite(parseInt(filteredHorseMovesArr[i])) && !this.isMyKingInCheckAfterMyMove(id, filteredHorseMovesArr[i], "white", "horse"))
                {
                    this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredHorseMovesArr[i]);
                }
            }
        }
    }

    public whiteBishopMovement(id: string, blackKingCheck: boolean)
    {
        var currentFigure: string = "bishop";
        if(this.isQueenMovement)
        {
            currentFigure = "queen";
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

        if(blackKingCheck)
        {
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
        else
        {
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
                        if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationBid,"white",currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid,"white",currentFigure))
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
                    if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                    {
                        noMoreUR = true;
                    }
                    else
                    {
                        if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationBid,"white",currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid,"white",currentFigure))
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
                    if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                    {
                        noMoreDL = true;
                    }
                    else
                    {
                        if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationBid,"white",currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid,"white",currentFigure))
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
                    if(this.chessPiecesDataService.isThePieceWhite(parseInt(currentIterationBid)))
                    {
                        noMoreDR = true;
                    }
                    else
                    {
                        if(!this.chessPiecesDataService.isThePieceBlack(parseInt(currentIterationBid)) && !this.isMyKingInCheckAfterMyMove(id, currentIterationBid,"white",currentFigure))
                        {
                            this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                        }
                        else
                        {
                            if(!this.isMyKingInCheckAfterMyMove(id, currentIterationBid,"white",currentFigure))
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
    }

    public whiteKingMovement(id: string, blackKingCheck: boolean)
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
        var filteredKingMovesArr: string[] = [];

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

        if(blackKingCheck)
        {
            for(var s = 0; s < filteredKingMovesArr.length; s++)
            {
                if(!this.chessPiecesDataService.isThePieceWhite(parseInt(filteredKingMovesArr[s])))
                {
                    this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredKingMovesArr[s]);
                }
            }
        }
        else
        {
            for(var s = 0; s < filteredKingMovesArr.length; s++)
            {
                if(!this.chessPiecesDataService.isThePieceWhite(parseInt(filteredKingMovesArr[s])) && !this.isMyKingInCheckAfterMyMove(id,filteredKingMovesArr[s],"white","king"))
                {
                    this.chessPiecesDataService.addPotentialMove(parseInt(id), filteredKingMovesArr[s]);
                }
            }
        }
    }

    public whiteQueenMovement(id: string, blackKingCheck: boolean)
    {
        this.isQueenMovement = true;
        this.whiteBishopMovement(id, blackKingCheck);
        this.isQueenMovement = true;
        this.whiteRookMovement(id, blackKingCheck);
        this.isQueenMovement = false;
    }

    public allWhitePotentialMovements(){

    }

    public allBlackPotentialMovements(){

    }
}