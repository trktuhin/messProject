import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignedDatesPage } from './assigned-dates.page';

describe('AssignedDatesPage', () => {
  let component: AssignedDatesPage;
  let fixture: ComponentFixture<AssignedDatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedDatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
