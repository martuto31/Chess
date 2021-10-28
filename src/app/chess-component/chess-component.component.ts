import { Component, OnInit } from '@angular/core';
import { ChessFigures } from './chess-figures';
import { chessMovement } from './chess-movement';

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

public targetFieldId: string = "";
public targetPlayer: string = "";
public isGameOver: boolean = false;
public currentTurn: string = "black"; //change to white
chessMovements: chessMovement = new chessMovement();

 onCalled(event: any)
 {
   var target = event.target;
   this.targetFieldId = target.id;
   this.targetPlayer = target.attributes.player.value;
   var chessPiece = document.getElementById(this.targetFieldId)?.getAttribute('piece');

   var potentialMoveElements = document.getElementsByClassName("potentialMove");

   var isTheTileClear = document.getElementById(this.targetFieldId)?.getAttribute('piece') == "";
   var selectedPieceColour = document.getElementById(this.targetFieldId)?.getAttribute('player');

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
          this.chessMovements.blackPawnMovement(this.targetFieldId);
          break;
        case "rook":
          this.chessMovements.blackRookMovement(this.targetFieldId);
          break;
        case "horse":
          this.chessMovements.blackHorseMovement(this.targetFieldId);
          break;
        case "bishop":
          this.chessMovements.blackBishopMovement(this.targetFieldId);
          break;
        case "queen":
          this.chessMovements.blackQueenMovement(this.targetFieldId);
          break;
        case "king":
          this.chessMovements.blackKingMovement(this.targetFieldId);
          break;
      }
   }

  } //+ if the tile is clear or if there is piece of the opposite colour; else if the piece is current colour
}
 //checks if there is a player on the the selected tile
 tryMovePiece(id: string)
 {
   var isPotentialMove = document.getElementById(id)?.classList.contains("potentialMove");
   var potentialMoveCol = parseInt(id[0]);
   var potentialMoveRow = parseInt(id[1]);

   var latestIdCol = parseInt(this.chessMovements.latestFieldId[0]);
   var latestIdRow = parseInt(this.chessMovements.latestFieldId[1]);

   //checks if there is a potentialMove class and if there is => checks which is the latest piece color ->
   //and changes the new tile 'player' attribute to black or white, and changes the type of the new tile ->
   //'piece' attribute to the latestSelected piece
   if(id == this.targetFieldId && isPotentialMove)
   {
     if(this.chessMovements.latestPieceColour == 'black')
     {
       document.getElementById(id)?.setAttribute('player', 'black');
       switch(this.chessMovements.latestPieceType)
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
          case 'king':
            document.getElementById(id)!.innerHTML = ChessFigures.BlackKing;
            document.getElementById(id)?.setAttribute('piece', 'king');
            break;
       }
     }
     else if(this.chessMovements.latestPieceColour == 'white')
     {

     }

     //removing the player attribute from the previous piece position and removing the old piece attribute as well as the html of the piece
     document.getElementById(this.chessMovements.latestFieldId)!.innerHTML = "";
     document.getElementById(this.chessMovements.latestFieldId)?.setAttribute('player', '');
     document.getElementById(this.chessMovements.latestFieldId)?.setAttribute('piece', '');

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
