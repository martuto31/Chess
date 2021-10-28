import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessComponentComponent } from './chess-component.component';

describe('ChessComponentComponent', () => {
  let component: ChessComponentComponent;
  let fixture: ComponentFixture<ChessComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
