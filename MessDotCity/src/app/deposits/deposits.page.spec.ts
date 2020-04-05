import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DepositsPage } from './deposits.page';

describe('DepositsPage', () => {
  let component: DepositsPage;
  let fixture: ComponentFixture<DepositsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DepositsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
