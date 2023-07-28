import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { AlertMessage } from 'src/services/app/alert.message';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  loginFormControl!: FormGroup;
  credentials : {email: string, password: string} 
              = { email: '', password:''};
  typeInput: string = 'password';

  constructor(public adminAccountSrv: AdminAccountService,
              private fb: FormBuilder
              ){this.createFormControl(); }

  createFormControl(){
    this.loginFormControl = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    this.loginFormControl.valueChanges.subscribe((data)=> {
        this.setData(data);
    })
  }

  showPassword(){
    if(this.typeInput === 'password'){
        this.typeInput = 'text';
    }else{
      this.typeInput = 'password';
    }
  }
  setData(formData: any){
      this.credentials.email = formData.email;
      this.credentials.password = formData.password;
  }

  doLogin(){
    if(this.isFormDataSet()){
        this.adminAccountSrv.login(this.credentials);
        this.loginFormControl.reset();
    }else{
      this.adminAccountSrv.activeAlertError(AlertMessage.ERROR);
    }
  } 
  isFormDataSet(): boolean{
      return this.loginFormControl.valid;
  }
}
