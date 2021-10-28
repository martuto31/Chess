import { Component, OnInit } from '@angular/core';
import { ChessFigures } from './chess-figures';

@Component({
  selector: 'app-chess-component',
  templateUrl: './chess-component.component.html',
  styleUrls: ['./chess-component.component.css']
})
export class ChessComponentComponent implements OnInit 
{
//---------black-pieces---------
blackRookLeftPos: string = "11";
blackRookRightPos: string = "18";

blackKnightLeftPos: string = "12";
blackKnightRightPos: string = "17";

blackBishopRightPos: string = "13";
blackBishopLeftPos: string = "16";

blackQueenPos: string = "14";
blackKingPos: string = "15";

//pawn from left to right

blackPawn1Pos: string = "21";
blackPawn2Pos: string = "22";
blackPawn3Pos: string = "23";
blackPawn4Pos: string = "24";
blackPawn5Pos: string = "25";
blackPawn6Pos: string = "26";
blackPawn7Pos: string = "27";
blackPawn8Pos: string = "28";

//---------white-pieces---------

whiteRookLeftPos: string = "81";
whiteRookRightPos: string = "88";

whiteKnightLeftPos: string = "82";
whiteKnightRightPos: string = "87";

whiteBishopLeftPos: string = "83";
whiteBishopRightPos: string = "86";

whiteQueenPos: string = "84";
whiteKingPos: string = "85";

//pawn from left to right

whitePawn1Pos: string = "71";
whitePawn2Pos: string = "72";
whitePawn3Pos: string = "73";
whitePawn4Pos: string = "74";
whitePawn5Pos: string = "75";
whitePawn6Pos: string = "76";
whitePawn7Pos: string = "77";
whitePawn8Pos: string = "78";

targetFieldId: string = "";
targetPlayer: string = "";
isGameOver: boolean = false;
latestFieldId: string = "";
latestPieceType: string = "";
latestPieceColour: string = "";
currentTurn: string = "black"; //change to white

 onCalled(event: any)
 {
   var target = event.target;
   this.targetFieldId = target.id;
   this.targetPlayer = target.attributes.player.value;
   var chessPiece = document.getElementById(this.targetFieldId)?.getAttribute('piece');
   console.log("latest piece type: " + this.latestPieceType);
   console.log("target id: "+ this.targetFieldId); 

   var potentialMoveElements = document.getElementsByClassName("potentialMove");

   console.log("targetFieldId: " + this.targetFieldId);
   console.log("targeted player: "+ this.targetPlayer);
   console.log(event);

   var isTheTileClear = document.getElementById(this.targetFieldId)?.getAttribute('piece') == "";
   var selectedPieceColour = document.getElementById(this.targetFieldId)?.getAttribute('player');
   console.log("curr col: " + selectedPieceColour);
   console.log("piece: "+ document.getElementById(this.targetFieldId)?.getAttribute('piece'));
   console.log(!isTheTileClear);

  if(this.currentTurn == "white")
  {
      if(isTheTileClear || selectedPieceColour == "black")
      {
        this.tryMovePiece(this.targetFieldId);
      }
      else if(selectedPieceColour == "white")
      {
        for(var i = 0; i < potentialMoveElements.length; i++)
        {
          potentialMoveElements[i].classList.remove("potentialMove");
        }

        /*switch(chessPiece)
        {
          case "pawn":
            this.blackPawnMovement(this.targetFieldId);
            break;
          case "rook":
            this.blackRookMovement(this.targetFieldId);
            break;
        }*/
      }
    }
  else if(this.currentTurn == "black")
  {
    if(isTheTileClear || selectedPieceColour == "white")
    {
      this.tryMovePiece(this.targetFieldId);
    }
    else if(selectedPieceColour == "black")
    {
      while(potentialMoveElements.length > 0)
      {
        potentialMoveElements[0].classList.remove("potentialMove");
      }

      switch(chessPiece)
      {
        case "pawn":
          this.blackPawnMovement(this.targetFieldId);
          break;
        case "rook":
          this.blackRookMovement(this.targetFieldId);
          break;
        case "horse":
          this.blackHorseMovement(this.targetFieldId);
          break;
        case "bishop":
          this.blackBishopMovement(this.targetFieldId);
          break;
        case "queen":
          this.blackQueenMovement(this.targetFieldId);
          break;
      }
   }

  } //+ if the tile is clear or if there is piece of the opposite colour; else if the piece is current colour
}

 //shows potential move and marks it
 blackPawnMovement(id: string)
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

 blackHorseMovement(id: string)
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

 blackQueenMovement(id: string)
 {
  this.latestFieldId = id;
  this.latestPieceType = 'queen';
  this.latestPieceColour = 'black';

  this.blackBishopMovement(id);
  this.latestPieceType = 'queen';
  this.blackRookMovement(id);
  this.latestPieceType = 'queen';
 }

 blackBishopMovement(id: string)
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

 blackRookMovement(id: string)
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

 //checks if there is a player on the the selected tile
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
   if(IspieceColorOnTileIdWhite){
     return true;
   }
   else{
     return false;
   }
 }

 //checks if the piece on the selected tile is black
 isBlack(id: string)
 {
   var IspieceColorOnTileIdBlack = document.getElementById(id)?.getAttribute('player') == "black";
   if(IspieceColorOnTileIdBlack){
     return true;
   }
   else{
     return false;
   }
 }


 tryMovePiece(id: string)
 {
   var isPotentialMove = document.getElementById(id)?.classList.contains("potentialMove");
   var potentialMoveCol = parseInt(id[0]);
   var potentialMoveRow = parseInt(id[1]);

   var latestIdCol = parseInt(this.latestFieldId[0]);
   var latestIdRow = parseInt(this.latestFieldId[1]);

   //checks if there is a potentialMove class and if there is => checks which is the latest piece color ->
   //and changes the new tile 'player' attribute to black or white, and changes the type of the new tile ->
   //'piece' attribute to the latestSelected piece
   if(id == this.targetFieldId && isPotentialMove)
   {
     if(this.latestPieceColour == 'black')
     {
       document.getElementById(id)?.setAttribute('player', 'black');
       switch(this.latestPieceType)
       {
          case 'rook':
            document.getElementById(id)!.innerHTML = ChessFigures.BlackRook;
            document.getElementById(id)?.setAttribute('piece', 'rook');
            break;
          case 'pawn':
            document.getElementById(id)!.innerHTML = ChessFigures.BlackPawn;
            document.getElementById(id)?.setAttribute('piece', 'pawn');
            break;
          case 'horse':
            document.getElementById(id)!.innerHTML = ChessFigures.BlackHorse;
            document.getElementById(id)?.setAttribute('piece', 'horse');
            break;
          case 'bishop':
            document.getElementById(id)!.innerHTML = ChessFigures.BlackBishop;
            document.getElementById(id)?.setAttribute('piece', 'bishop');
            break;
          case 'queen':
            document.getElementById(id)!.innerHTML = ChessFigures.BlackQueen;
            document.getElementById(id)?.setAttribute('piece', 'queen');
            break;
       }
     }
     else if(this.latestPieceColour == 'white')
     {

     }

     //removing the player attribute from the previous piece position and removing the old piece attribute as well as the html of the piece
     document.getElementById(this.latestFieldId)!.innerHTML = "";
     document.getElementById(this.latestFieldId)?.setAttribute('player', '');
     document.getElementById(this.latestFieldId)?.setAttribute('piece', '');

     //current turn = the opposite of latest turn
     console.log("we moved it!")
   }
   var potentialMoveElements = document.getElementsByClassName("potentialMove");

   while(potentialMoveElements.length > 0)
   {
      potentialMoveElements[0].classList.remove("potentialMove");
   }
 }

 onReset()
 {
 }

 constructor() { }

 ngOnInit(): void 
 {
 }
}
