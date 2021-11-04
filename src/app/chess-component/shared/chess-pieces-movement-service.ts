import { Injectable } from "@angular/core";
import { chessPiecesDataService } from "./chess-pieces-data-service";

@Injectable()
export class piecesMovementService
{
    public latestFieldId: string = "";
    public latestPieceType: string = "";
    public latestPieceColour: string = "";

    constructor(private chessPiecesDataService: chessPiecesDataService){

    }

    checkAllPotentialMoves(){
        this.chessPiecesDataService.piecesData.forEach(element => {
            if(element.colour === "black")
            {
                switch(element.piece)
                {
                    case "pawn":
                        this.blackPawnMovement(element.id.toString());
                        break;
                    default:
                        break;
                }
            }
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
            this.chessPiecesDataService.addPotentialMove(parseInt(id),posAfterOneMoveUpwards);
            //document.getElementById(posAfterOneMoveUpwards)?.classList.add("potentialMove");
        }

        //Cheks if two tiles upward the tile is clear from black or white piece and if its the first move of the pawn(on col 2) - mark as a potentialMove
        if(this.chessPiecesDataService.isTileClear(parseInt(posAfterTwoMovesUpwards)) && colPos == 2)
        {
            this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterTwoMovesUpwards);
            //document.getElementById(posAfterTwoMovesUpwards)?.classList.add("potentialMove");
        }

        //checks if there is enemy on the right side 1 column upwards
        if(this.chessPiecesDataService.isThePieceWhite(parseInt(posAfterRightEnemyMove)))
        {
            this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterRightEnemyMove);
            //document.getElementById(posAfterRightEnemyMove)?.classList.add("potentialMove");
        }

        //checks if there is enemy on the left side 1 column upwards
        if(this.chessPiecesDataService.isThePieceWhite(parseInt(posAfterLeftEnemyMove)))
        {
            //document.getElementById(posAfterLeftEnemyMove)?.classList.add("potentialMove");
            this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterLeftEnemyMove);
        }

        //if(colPos == 2 && this.isClear(id))
    }

    public blackRookMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);    
        this.latestFieldId = id;
        this.latestPieceType = 'rook'
        this.latestPieceColour = 'black'

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
                        document.getElementById(currentIterationId)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                    }
                    else
                    {
                        noMoreUpwardMoves = true;
                        document.getElementById(currentIterationId)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationId1)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                    }
                    else
                    {
                        document.getElementById(currentIterationId1)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationId2)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                    }
                    else
                    {
                        document.getElementById(currentIterationId2)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationId3)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                    }
                    else
                    {
                        document.getElementById(currentIterationId3)?.classList.add("potentialMove");
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
        this.latestFieldId = id;
        this.latestPieceType = 'horse';
        this.latestPieceColour = 'black';

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
                document.getElementById(horseMovesArr[i])?.classList.add("potentialMove");
                this.chessPiecesDataService.addPotentialMove(parseInt(id), horseMovesArr[i]);
            }
        }
    }

    public blackBishopMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);
        this.latestFieldId = id;
        this.latestPieceType = 'bishop';
        this.latestPieceColour = 'black';

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
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
        this.latestFieldId = id;
        this.latestPieceType = 'king';
        this.latestPieceColour = 'black';

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
                document.getElementById(kingMovesArr[s])?.classList.add("potentialMove");
                this.chessPiecesDataService.addPotentialMove(parseInt(id), kingMovesArr[s]);
            }
        }
    }

    public blackQueenMovement(id: string)
    {
        this.latestFieldId = id;
        this.latestPieceType = 'queen';
        this.latestPieceColour = 'black';

        this.blackBishopMovement(id);
        this.latestPieceType = 'queen';
        this.blackRookMovement(id);
        this.latestPieceType = 'queen';
    }

    public whitePawnMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);
        this.latestFieldId = id;
        this.latestPieceType = 'pawn';
        this.latestPieceColour = 'white';


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
            document.getElementById(posAfterOneMoveDownwards)?.classList.add("potentialMove");
        }

        //Cheks if two tiles upward the tile is clear from black or white piece and if its the first move of the pawn(on col 2) - mark as a potentialMove
        if(this.chessPiecesDataService.isTileClear(parseInt(posAfterTwoMovesDownwards)) && colPos == 7)
        {
            this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterTwoMovesDownwards);
            document.getElementById(posAfterTwoMovesDownwards)?.classList.add("potentialMove");
        }

        //checks if there is enemy on the right side 1 column upwards
        if(this.chessPiecesDataService.isThePieceBlack(parseInt(posAfterRightEnemyMove)))
        {
            this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterRightEnemyMove);
            document.getElementById(posAfterRightEnemyMove)?.classList.add("potentialMove");
        }

        //checks if there is enemy on the left side 1 column upwards
        if(this.chessPiecesDataService.isThePieceBlack(parseInt(posAfterLeftEnemyMove)))
        {
            document.getElementById(posAfterLeftEnemyMove)?.classList.add("potentialMove");
            this.chessPiecesDataService.addPotentialMove(parseInt(id), posAfterLeftEnemyMove);
        }

        //if(colPos == 2 && this.isClear(id))
    }

    public whiteRookMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);    
        this.latestFieldId = id;
        this.latestPieceType = 'rook'
        this.latestPieceColour = 'white'

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
                        document.getElementById(currentIterationId)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId);
                    }
                    else
                    {
                        noMoreUpwardMoves = true;
                        document.getElementById(currentIterationId)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationId1)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId1);
                    }
                    else
                    {
                        document.getElementById(currentIterationId1)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationId2)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId2);
                    }
                    else
                    {
                        document.getElementById(currentIterationId2)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationId3)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationId3);
                    }
                    else
                    {
                        document.getElementById(currentIterationId3)?.classList.add("potentialMove");
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
        this.latestFieldId = id;
        this.latestPieceType = 'horse';
        this.latestPieceColour = 'white';

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
            console.log(horseMovesArr[i]);
            if(!this.chessPiecesDataService.isThePieceWhite(parseInt(horseMovesArr[i])))
            {
                document.getElementById(horseMovesArr[i])?.classList.add("potentialMove");
                this.chessPiecesDataService.addPotentialMove(parseInt(id), horseMovesArr[i]);
            }
        }
    }

    public whiteBishopMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);
        this.latestFieldId = id;
        this.latestPieceType = 'bishop';
        this.latestPieceColour = 'white';

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
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                        this.chessPiecesDataService.addPotentialMove(parseInt(id), currentIterationBid);
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
        this.latestFieldId = id;
        this.latestPieceType = 'king';
        this.latestPieceColour = 'white';

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
                document.getElementById(kingMovesArr[s])?.classList.add("potentialMove");
                this.chessPiecesDataService.addPotentialMove(parseInt(id), kingMovesArr[s]);
            }
        }
    }

    public whiteQueenMovement(id: string)
    {
        this.latestFieldId = id;
        this.latestPieceType = 'queen';
        this.latestPieceColour = 'white';

        this.whiteBishopMovement(id);
        this.latestPieceType = 'queen';
        this.whiteRookMovement(id);
        this.latestPieceType = 'queen';
    }

    public allWhitePotentialMovements(){

    }

    public allBlackPotentialMovements(){

    }
}