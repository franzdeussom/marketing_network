import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertMessage } from 'src/services/app/alert.message';
import { AccountService } from 'src/services/app/user/account.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  loginFormControl!: FormGroup;
  login = {email: '', password: '', sessionSaveEnabled: false}
  typeInput : string = 'password';

  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  
  constructor(private fb: FormBuilder, 
              public accountService: AccountService
              ){
    this.checkLocalSession();
    this.createLoginFormControl()
  }

  checkLocalSession(){
    if(this.accountService.checkLocalSessionSaved()){
      this.accountService.checkSuscription(); //and navigate home or my packs list
      return;
    }
  }
  createLoginFormControl(){
    this.loginFormControl = this.fb.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
          password: ['', Validators.required],
          sessionSaveEnabled: ['']
    });

    this.loginFormControl.valueChanges.subscribe((data)=>{
        this.setLoginData(data);
    })
  }

  setLoginData(data: any){
    Object.assign(this.login, data);
  }

  showPassword(){
    if(this.typeInput === 'text'){
      this.typeInput = 'password';
    }else{
      this.typeInput = 'text';
    }
  }

  doLogin(){
    if(this.loginFormControl.valid){
        this.accountService.login(this.login);
    }else{
        this.accountService.activeAlertError(AlertMessage.ERROR_EMPTY_FIELD);
    }
  }

}
