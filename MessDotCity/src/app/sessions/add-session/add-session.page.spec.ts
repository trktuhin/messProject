import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSessionPage } from './add-session.page';

describe('AddSessionPage', () => {
  let component: AddSessionPage;
  let fixture: ComponentFixture<AddSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
