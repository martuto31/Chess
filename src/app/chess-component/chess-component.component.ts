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
public currentTurn: string = "white";

 onReset()
 {
 }

 constructor(private piecesMovementService: piecesMovementService, private chessPiecesDataService: chessPiecesDataService) { }

 ngOnInit(): void {
 }

 onCalled(event: any)
 {
   var target = event.target;
   this.targetFieldId = target.id;
   var chessPiece = this.chessPiecesDataService.seletedPieceType(parseInt(this.targetFieldId));

   var potentialMoveElements = document.getElementsByClassName("potentialMove");

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
          //remove all potential moves inside the program
        }

        this.piecesMovementService.checkAllPotentialMoves();

        var arrayOfPotentialMoves: string[];

        switch(chessPiece)
        {
          case "pawn":
            this.piecesMovementService.whitePawnMovement(this.targetFieldId);
            break;
          case "rook":
            this.piecesMovementService.whiteRookMovement(this.targetFieldId);
            break;
          case "horse":
            this.piecesMovementService.whiteHorseMovement(this.targetFieldId);
            break;
          case "bishop":
            this.piecesMovementService.whiteBishopMovement(this.targetFieldId);
            break;
          case "queen":
            this.piecesMovementService.whiteQueenMovement(this.targetFieldId);
            break;
          case "king":
            this.piecesMovementService.whiteKingMovement(this.targetFieldId);
            break;
        }
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

      this.piecesMovementService.checkAllPotentialMoves();

      switch(chessPiece)
      {
        case "pawn":
          this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "black", "pawn");
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

  }
}

  tryMovePiece(id: string)
  {
      var isPotentialMove = this.chessPiecesDataService.isPotentialMove(parseInt(this.piecesMovementService.latestFieldId), id);

      if(id == this.targetFieldId && isPotentialMove)
      {
        if(this.piecesMovementService.latestPieceColour == 'black')
        {
          this.chessPiecesDataService.addBlackPieceOnTile(parseInt(id), this.piecesMovementService.latestPieceType);
          this.currentTurn = "white";
        }
        else if(this.piecesMovementService.latestPieceColour == 'white')
        {
          this.chessPiecesDataService.addWhitePieceOnTile(parseInt(id), this.piecesMovementService.latestPieceType);
          this.currentTurn = "black";
        }
        this.chessPiecesDataService.removePieceFromTile(parseInt(this.piecesMovementService.latestFieldId));
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
