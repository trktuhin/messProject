import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FixedExpensesPage } from './fixed-expenses.page';

describe('FixedExpensesPage', () => {
  let component: FixedExpensesPage;
  let fixture: ComponentFixture<FixedExpensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedExpensesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FixedExpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
