import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMealsPage } from './edit-meals.page';

describe('EditMealsPage', () => {
  let component: EditMealsPage;
  let fixture: ComponentFixture<EditMealsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMealsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMealsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
