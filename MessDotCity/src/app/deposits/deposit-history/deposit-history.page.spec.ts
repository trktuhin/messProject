import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DepositHistoryPage } from './deposit-history.page';

describe('DepositHistoryPage', () => {
  let component: DepositHistoryPage;
  let fixture: ComponentFixture<DepositHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DepositHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
