import { Component, OnInit } from '@angular/core';
import { ChessFigures } from './shared/chess-figures';
import { piecesMovementService } from './shared/chess-pieces-movement-service';
import { chessPiecesDataService } from './shared/chess-pieces-data-service';
import { chessPiece } from './shared/chess-piece-model';

@Component({
  selector: 'app-chess-component',
  templateUrl: './chess-component.component.html',
  styleUrls: ['./chess-component.component.css']
})
export class ChessComponentComponent implements OnInit 
{
public targetFieldId: string = "";
public targetPlayer: string = "";
public isGameOver: boolean = false;
public currentTurn: string = "black"; //change to white
private chessPieces: chessPiece[] = [];

 onReset()
 {
 }

 constructor(private piecesMovementService: piecesMovementService, private chessPiecesDataService: chessPiecesDataService) { }

 ngOnInit(): void 
 {
   this.chessPieces = this.chessPiecesDataService.piecesData;
 }

 onCalled(event: any)
 {
   var target = event.target;
   this.targetFieldId = target.id;
   this.targetPlayer = target.attributes.player.value;
   var chessPiece = this.chessPiecesDataService.seletedPieceType(parseInt(this.targetFieldId));

   var potentialMoveElements = document.getElementsByClassName("potentialMove");

   //service
    // console.log(this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(this.targetFieldId))?.colour);
    // this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(this.targetFieldId))!.colour = 'white';
    // console.log(this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(this.targetFieldId))?.colour);
   //\service

  if(this.currentTurn == "white")
  {
      if(this.chessPiecesDataService.isTileClear(parseInt(this.targetFieldId)) || this.chessPiecesDataService.selectedPieceColour(parseInt(this.targetFieldId)) === "black")
      {
        this.tryMovePiece(this.targetFieldId);
      }
      else if(this.chessPiecesDataService.selectedPieceColour(parseInt(this.targetFieldId)) === "white")
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
    if(this.chessPiecesDataService.isTileClear(parseInt(this.targetFieldId)) || this.chessPiecesDataService.selectedPieceColour(parseInt(this.targetFieldId)) === "white")
    {
      this.tryMovePiece(this.targetFieldId);
    }
    else if(this.chessPiecesDataService.selectedPieceColour(parseInt(this.targetFieldId)) === "black")
    {
      while(potentialMoveElements.length > 0)
      {
        potentialMoveElements[0].classList.remove("potentialMove");
      }

      switch(chessPiece)
      {
        case "pawn":
          this.piecesMovementService.blackPawnMovement(this.targetFieldId);
          break;
        case "rook":
          this.piecesMovementService.blackRookMovement(this.targetFieldId);
          break;
        case "horse":
          this.piecesMovementService.blackHorseMovement(this.targetFieldId);
          break;
        case "bishop":
          this.piecesMovementService.blackBishopMovement(this.targetFieldId);
          break;
        case "queen":
          this.piecesMovementService.blackQueenMovement(this.targetFieldId);
          break;
        case "king":
          this.piecesMovementService.blackKingMovement(this.targetFieldId);
          break;
      }
   }

  } //+ if the tile is clear or if there is piece of the opposite colour; else if the piece is current colour
}
 //checks if there is a player on the the selected tile
  tryMovePiece(id: string)
  {
      var isPotentialMove = this.chessPiecesDataService.isPotentialMove(parseInt(this.piecesMovementService.latestFieldId), id);
      //checks if there is a potentialMove class and if there is => checks which is the latest piece color ->
      //and changes the new tile 'player' attribute to black or white, and changes the type of the new tile ->
      //'piece' attribute to the latestSelected piece
      if(id == this.targetFieldId && isPotentialMove)
      {
        if(this.piecesMovementService.latestPieceColour == 'black')
        {
          this.chessPiecesDataService.addBlackPieceOnTile(parseInt(id), this.piecesMovementService.latestPieceType);
        }
        else if(this.piecesMovementService.latestPieceColour == 'white')
        {

        }
        this.chessPiecesDataService.removePieceFromTile(parseInt(this.piecesMovementService.latestFieldId));

        //current turn = the opposite of latest turn
        console.log("we moved it!")
      }
      var potentialMoveElements = document.getElementsByClassName("potentialMove");

      while(potentialMoveElements.length > 0)
      {
          potentialMoveElements[0].classList.remove("potentialMove");
      }
    }
  returnPiece(id: number)
  {
    return this.chessPiecesDataService.returnPiece(id);
  }
}
