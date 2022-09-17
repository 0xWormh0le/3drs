import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerCalendarPage } from './manager-calendar.page';

describe('ManagerCalendarPage', () => {
  let component: ManagerCalendarPage;
  let fixture: ComponentFixture<ManagerCalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerCalendarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
