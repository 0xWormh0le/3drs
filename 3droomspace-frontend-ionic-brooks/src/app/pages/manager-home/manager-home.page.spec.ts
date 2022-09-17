import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerHomePage } from './manager-home.page';

describe('ManagerHomePage', () => {
  let component: ManagerHomePage;
  let fixture: ComponentFixture<ManagerHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
