import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultHeaderContentComponent} from './default-header-content.component';

describe('DefaultHeaderContentComponent', () => {
  let component: DefaultHeaderContentComponent;
  let fixture: ComponentFixture<DefaultHeaderContentComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultHeaderContentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DefaultHeaderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
