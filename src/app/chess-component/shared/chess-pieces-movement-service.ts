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

    constructor(private chessPiecesDataService: chessPiecesDataService){

    }

    isInCheck(kingColour: string){
        if(kingColour === "white")
        {
            var whiteKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "white"))!.id;
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "black" && element.potentialMoves.includes(whiteKingPos!.toString()))
                {
                    console.log("its trueeew");
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
                    
                    console.log("its trueeeb");
                    this.inCheck = true;
                    this.figurePlacingCheckId = element.id.toString();
                }
            });
        }
    }

    isMyKingInCheckAfterMyMove(pieceId: string, potentialMoveId: string, pieceColour: string, piece: string,){
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.colour = "";
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.piece = "";
        var isInCheckAfterMove: boolean = false;
        console.log("removed piece: " + this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))?.piece);
        if(pieceColour === "white")
        {
            var whiteKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "white"))!.id;
            this.removeAllColourPotentialMoves("black");
            this.checkAllColourPotentialMoves("black");
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "black" && element.potentialMoves.includes(whiteKingPos.toString()))
                {
                    console.log("voala");
                    isInCheckAfterMove = true;
                }
            });
            this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.colour = pieceColour;
            this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.piece = piece;
        }
        else if(pieceColour === "black")
        {
            console.log(this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId)));
            var blackKingPos = this.chessPiecesDataService.piecesData.find(p => (p.piece === "king") &&(p.colour === "black"))!.id;
            this.removeAllColourPotentialMoves("white");
            this.checkAllColourPotentialMoves("white");
            this.chessPiecesDataService.piecesData.forEach(element => {
                if(element.colour === "white" && element.piece === "bishop")
                {
                    console.log("in if");
                    for(var i = 0; i < element.potentialMoves.length; i++)
                    {
                        console.log(element.potentialMoves[i]);
                    }
                }
                if(element.colour === "white" && element.potentialMoves.includes(blackKingPos.toString()))
                {
                    console.log("voala");
                    isInCheckAfterMove = true;
                }
            });
        }
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.colour = pieceColour;
        this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(pieceId))!.piece = piece;
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
            if(!this.isMyKingInCheckAfterMyMove(id,posAfterTwoMovesUpwards,"black", "pawn"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterTwoMovesUpwards);
            }
        }

        //checks if there is enemy on the right side 1 column upwards
        if(this.chessPiecesDataService.isThePieceWhite(parseInt(posAfterRightEnemyMove)))
        {
            if(!this.isMyKingInCheckAfterMyMove(id,posAfterRightEnemyMove,"black", "pawn"))
            {
             this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterRightEnemyMove);
            }
        }

        //checks if there is enemy on the left side 1 column upwards
        if(this.chessPiecesDataService.isThePieceWhite(parseInt(posAfterLeftEnemyMove)))
        {
            if(!this.isMyKingInCheckAfterMyMove(id,posAfterLeftEnemyMove,"black", "pawn"))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterLeftEnemyMove);
            }
        }

        //if(colPos == 2 && this.isClear(id))
    }

    public blackRookMovement(id: string)
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

    public blackHorseMovement(id: string)
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
            if(!this.chessPiecesDataService.isThePieceBlack(parseInt(horseMovesArr[i])))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), horseMovesArr[i]);
            }
        }
    }

    public blackBishopMovement(id: string)
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

        var kingMovesArr: string[] = [upMove, downMove, rightMove, leftMove, upLeftMove, upRightMove, downLeftMove, downRightMove];

        for(var s = 0; s < kingMovesArr.length; s++)
        {
            if(!this.chessPiecesDataService.isThePieceBlack(parseInt(kingMovesArr[s])))
            {
                this.chessPiecesDataService.addPotentialMove(parseInt(id), kingMovesArr[s]);
            }
        }
    }

    public blackQueenMovement(id: string)
    {
        this.blackBishopMovement(id);
        this.blackRookMovement(id);
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
        this.whiteBishopMovement(id);
        this.whiteRookMovement(id);
    }

    public allWhitePotentialMovements(){

    }

    public allBlackPotentialMovements(){

    }
}