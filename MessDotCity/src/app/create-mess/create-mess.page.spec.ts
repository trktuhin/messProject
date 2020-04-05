import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateMessPage } from './create-mess.page';

describe('CreateMessPage', () => {
  let component: CreateMessPage;
  let fixture: ComponentFixture<CreateMessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
