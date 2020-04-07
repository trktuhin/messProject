import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyExpensesPage } from './daily-expenses.page';

describe('DailyExpensesPage', () => {
  let component: DailyExpensesPage;
  let fixture: ComponentFixture<DailyExpensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyExpensesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyExpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
