export class chessMovement
{
    public latestFieldId: string = "";
    public latestPieceType: string = "";
    public latestPieceColour: string = "";

    //shows potential move and marks it
    public blackPawnMovement(id: string)
    {
        var colPos = parseInt(id[0]);
        var rowPos = parseInt(id[1]);
        this.latestFieldId = id;
        this.latestPieceType = 'pawn';
        this.latestPieceColour = 'black';


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
        if(this.isClear(posAfterOneMoveUpwards))
        {
            document.getElementById(posAfterOneMoveUpwards)?.classList.add("potentialMove");
        }

        //Cheks if two tiles upward the tile is clear from black or white piece and if its the first move of the pawn(on col 2) - mark as a potentialMove
        if(this.isClear(posAfterTwoMovesUpwards) && colPos == 2)
        {
            document.getElementById(posAfterTwoMovesUpwards)?.classList.add("potentialMove");
        }

        //checks if there is enemy on the right side 1 column upwards
        if(this.isWhite(posAfterRightEnemyMove))
        {
            document.getElementById(posAfterRightEnemyMove)?.classList.add("potentialMove");
        }

        //checks if there is enemy on the left side 1 column upwards
        if(this.isWhite(posAfterLeftEnemyMove))
        {
            document.getElementById(posAfterLeftEnemyMove)?.classList.add("potentialMove");
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
                if(this.isBlack(currentIterationId))
                {
                    noMoreUpwardMoves = true;
                }
                else
                {
                    if(!this.isWhite(currentIterationId))
                    {
                        document.getElementById(currentIterationId)?.classList.add("potentialMove");
                    }
                    else
                    {
                        noMoreUpwardMoves = true;
                        document.getElementById(currentIterationId)?.classList.add("potentialMove");
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
                if(this.isBlack(currentIterationId1))
                {
                    noMoreDownwardMoves = true;
                }
                else
                {
                    if(!this.isWhite(currentIterationId1))
                    {
                        document.getElementById(currentIterationId1)?.classList.add("potentialMove");
                    }
                    else
                    {
                        document.getElementById(currentIterationId1)?.classList.add("potentialMove");
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
                if(this.isBlack(currentIterationId2))
                {
                    noMoreRightMoves = true;
                }
                else
                {
                    if(!this.isWhite(currentIterationId2))
                    {
                        document.getElementById(currentIterationId2)?.classList.add("potentialMove");
                    }
                    else
                    {
                        document.getElementById(currentIterationId2)?.classList.add("potentialMove");
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
                if(this.isBlack(currentIterationId3))
                {
                    noMoreLeftMoves = true;
                }
                else
                {
                    if(!this.isWhite(currentIterationId3))
                    {
                        document.getElementById(currentIterationId3)?.classList.add("potentialMove");
                    }
                    else
                    {
                        document.getElementById(currentIterationId3)?.classList.add("potentialMove");
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
            console.log(horseMovesArr[i]);
            if(!this.isBlack(horseMovesArr[i]))
            {
                document.getElementById(horseMovesArr[i])?.classList.add("potentialMove");
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
                if(this.isBlack(currentIterationBid))
                {
                    noMoreUL = true;
                }
                else
                {
                    if(!this.isWhite(currentIterationBid))
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
                if(this.isBlack(currentIterationBid))
                {
                    noMoreUR = true;
                }
                else
                {
                    if(!this.isWhite(currentIterationBid))
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
                if(this.isBlack(currentIterationBid))
                {
                    noMoreDL = true;
                }
                else
                {
                    if(!this.isWhite(currentIterationBid))
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
                if(this.isBlack(currentIterationBid))
                {
                    noMoreDR = true;
                }
                else
                {
                    if(!this.isWhite(currentIterationBid))
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
                    }
                    else
                    {
                        document.getElementById(currentIterationBid)?.classList.add("potentialMove");
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
            if(!this.isBlack(kingMovesArr[s]))
            {
                document.getElementById(kingMovesArr[s])?.classList.add("potentialMove");
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

    isClear(id: string)
    {
        var isTheTileClear = document.getElementById(id)?.getAttribute('player') == "";
        if(isTheTileClear){
            return true;
        }
        else{
            return false;
        }
    }

 //checks if the piece on the selected tile is white
    isWhite(id: string)
    {
        var IspieceColorOnTileIdWhite = document.getElementById(id)?.getAttribute('player') == "white";
        if(IspieceColorOnTileIdWhite)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

 //checks if the piece on the selected tile is black
    isBlack(id: string)
    {
        var IspieceColorOnTileIdBlack = document.getElementById(id)?.getAttribute('player') == "black";
        if(IspieceColorOnTileIdBlack)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

}