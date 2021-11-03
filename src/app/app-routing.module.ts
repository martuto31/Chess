import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { chessPiecesDataService } from './chess-component/shared/chess-pieces-data-service';

import { piecesMovementService } from './chess-component/shared/chess-pieces-movement-service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [piecesMovementService, chessPiecesDataService]
})
export class AppRoutingModule { }
