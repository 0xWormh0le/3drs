import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignUpPage } from './sign-up.page';
import { FormGroupDirective, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register/register.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

class MockRegisterService {

  registerUser(): Observable<any> {
    
    return ;
  }
}

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;
  let registerService: RegisterService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpPage],
      imports: [HttpClientModule, ReactiveFormsModule, IonicModule.forRoot()],
      providers: [{ provide: registerService, useValue: MockRegisterService }
      ]
    }).compileComponents();
    registerService = TestBed.get(RegisterService);
    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('it should call the register from RegisterService', () => {
    spyOn(registerService, 'registerUser');

    component.createAccount();
    expect(registerService.registerUser).toHaveBeenCalled();
  });
});
