import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSessionPage } from './edit-session.page';

describe('EditSessionPage', () => {
  let component: EditSessionPage;
  let fixture: ComponentFixture<EditSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
