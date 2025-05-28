import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameEventModalComponent} from './game-event-modal.component';
import {Game, GameEvent} from '../../../../api/billard/generated';
import type = GameEvent.type;

describe('GameEventModalComponent', () => {
  let component: GameEventModalComponent;
  let fixture: ComponentFixture<GameEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameEventModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameEventModalComponent);
    fixture.componentRef.setInput('gameEvent', <GameEvent>{
      type: type.GAME_STARTED,
      game: <Game>{}
    })
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
