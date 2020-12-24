import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAssigndatePage } from './add-assigndate.page';

describe('AddAssigndatePage', () => {
  let component: AddAssigndatePage;
  let fixture: ComponentFixture<AddAssigndatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssigndatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAssigndatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
