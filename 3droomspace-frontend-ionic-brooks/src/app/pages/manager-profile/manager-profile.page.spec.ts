import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagerProfilePage } from './manager-profile.page';

describe('ManagerProfilePage', () => {
  let component: ManagerProfilePage;
  let fixture: ComponentFixture<ManagerProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
