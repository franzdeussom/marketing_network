import { PageSecurityService } from './../../../../services/page-security.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertMessage } from 'src/services/app/alert.message';
import { AccountService } from 'src/services/app/user/account.service';
import { User } from 'src/services/app/user/user.model';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})

export class CreateNewUserComponent {
  formGenerateControl!: FormGroup;
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  newUser : User = new User();
  
  constructor(public accountSrv: AccountService,
              private fb: FormBuilder
              ){this.hasAuthority();
                this.createFormControl();
                }

  ngOnDestroy() {
      this.accountSrv.showCredentialsNewUser = false;
  }

  createFormControl(){
      this.formGenerateControl = this.fb.group({
            nom: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            prenom: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
            tel: ['', Validators.compose([Validators.required, Validators.min(600000000), Validators.max(699999999)])]
      });

      this.formGenerateControl.valueChanges.subscribe((data)=>{
          this.setData(data);
      })
  }

  hasAuthority(){
      if(!this.accountSrv.currentUsersData.hasSuscribed && typeof this.accountSrv.currentUsersData.id === 'undefined'){
          throw new Error("Can't access in this page");
      }
  }

  setData(data: any){
    this.newUser.email = data.email.toLowerCase();
    this.newUser.surname = data.prenom;
    this.newUser.username = data.nom;
    this.newUser.tel = data.tel;
  }

  generate(){
    this.scrollTop();
    if(this.isFormDataSet()){
      this.accountSrv.saveUserGenerate(this.newUser, this.newUser.email);
      this.reset();
    }else{
      this.accountSrv.activeAlertError(AlertMessage.ERROR_EMPTY_FIELD);
    }
  }

  reset(){
    this.formGenerateControl.reset();
  }

  isFormDataSet(): boolean{
    return this.formGenerateControl.valid;
  }

  scrollTop(){
    window.scrollTo(0,0);
  }
}
