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
public isFirstTurn: boolean = true;

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
      if(this.isFirstTurn)
      {
        this.piecesMovementService.checkAllPotentialMoves();
      }

      console.log(this.piecesMovementService.inCheck);
      if(this.chessPiecesDataService.isTileClear(parseInt(this.targetFieldId)) || this.chessPiecesDataService.selectedPieceColour(parseInt(this.targetFieldId)) === "black")
      {
        this.tryMovePiece(this.targetFieldId);
      }
      else if(this.chessPiecesDataService.selectedPieceColour(parseInt(this.targetFieldId)) === "white")
      {
        while(potentialMoveElements.length > 0)
        {
          potentialMoveElements[0].classList.remove("potentialMove");
        }

        switch(chessPiece)
        {
          case "pawn":
            this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "white", "pawn");
            break;
          case "rook":
            this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "white", "rook");
            break;
          case "horse":
            this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "white", "horse");
            break;
          case "bishop":
            this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "white", "bishop");
            break;
          case "queen":
            this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "white", "queen");
            break;
          case "king":
            this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "white", "king");
            break;
        }
      }
    }
  else if(this.currentTurn == "black")
  {
    if(this.isFirstTurn)
    {
      this.piecesMovementService.checkAllPotentialMoves();
    }

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
          this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "black", "pawn");
          break;
        case "rook":
          this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "black", "rook");
          break;
        case "horse":
          this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "black", "horse");
          break;
        case "bishop":
          this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "black", "bishop");
          break;
        case "queen":
          this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "black", "queen");
          break;
        case "king":
          this.piecesMovementService.showAllPotentialMoves(parseInt(this.targetFieldId), "black", "king");
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
        this.piecesMovementService.inCheck = false;
        this.piecesMovementService.figurePlacingCheckId = "";
        this.piecesMovementService.removeAllPotentialMoves();
        this.piecesMovementService.checkAllPotentialMoves();
        this.piecesMovementService.isInCheck("white");
        this.piecesMovementService.isInCheck("black");
        console.log("is it in check after move" + this.piecesMovementService.inCheck);
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
