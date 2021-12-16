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
  public currentTurnBool: boolean = true;
  public isFirstTurn: boolean = true;

 onReset()
 {
 }

 constructor(private piecesMovementService: piecesMovementService, private chessPiecesDataService: chessPiecesDataService) { }

 ngOnInit(): void {
  this.piecesMovementService.checkAllColourPotentialMoves("white", true);
 }

 onCalled(event: any)
 {
    var target = event.target;
    this.targetFieldId = target.id;
    var chessPiece = this.chessPiecesDataService.seletedPieceType(parseInt(this.targetFieldId));

    var potentialMoveElements = document.getElementsByClassName("potentialMove");

    this.piecesMovementService.setCurrentTurn(this.currentTurnBool);

   console.log(this.chessPiecesDataService.piecesData.find(p => p.id == parseInt(this.targetFieldId)));
    if(this.currentTurn == "white")
    {
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
      var latestPieceId: number = parseInt(this.piecesMovementService.latestFieldId);
      var latestPieceType1 = this.piecesMovementService.latestPieceType;
      var isPotentialMove = this.chessPiecesDataService.isPotentialMove(latestPieceId, id);

      if(id == this.targetFieldId && isPotentialMove)
      {
        var latestPieceColour = "";
        if(this.piecesMovementService.latestPieceColour == 'black')
        {
          this.chessPiecesDataService.addBlackPieceOnTile(parseInt(id), latestPieceType1);
          latestPieceColour = "black";
          this.currentTurn = "white";
          this.currentTurnBool = true;
          console.log("curr turn: white");
        }
        else if(this.piecesMovementService.latestPieceColour == 'white')
        {
          this.chessPiecesDataService.addWhitePieceOnTile(parseInt(id), latestPieceType1);
          latestPieceColour = "white";
          this.currentTurn = "black";
          this.currentTurnBool = false;
        }
        this.chessPiecesDataService.removePieceFromTile(latestPieceId);
        this.piecesMovementService.removeAllPotentialMoves();
        if(latestPieceColour === "white")
        {
          this.piecesMovementService.checkAllColourPotentialMoves("white", true);
          this.piecesMovementService.removeAllColourPotentialMoves("black");
          this.piecesMovementService.checkAllColourPotentialMoves("black", false);
        }
        else if(latestPieceColour === "black")
        {
          this.piecesMovementService.checkAllColourPotentialMoves("black", true);
          this.piecesMovementService.removeAllColourPotentialMoves("white");
          this.piecesMovementService.checkAllColourPotentialMoves("white", false);
        }

        if(this.chessPiecesDataService.isCheckMate(this.currentTurn))
        {
          console.log("checkmate");
        }

        console.log("funcCounter: " + this.piecesMovementService.inFuncCounter);
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
