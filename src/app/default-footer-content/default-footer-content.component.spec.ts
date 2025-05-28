import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultFooterContentComponent} from './default-footer-content.component';

describe('DefaultFooterContentComponent', () => {
  let component: DefaultFooterContentComponent;
  let fixture: ComponentFixture<DefaultFooterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultFooterContentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DefaultFooterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
