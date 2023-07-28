import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { Administrator } from 'src/services/app/admin/admin.model';
import { AlertMessage } from 'src/services/app/alert.message';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent {
  formUpdateAccount!: FormGroup;
  dataToUpdate : Administrator = new Administrator();

  newPassword: string = '';
  OldPassword: string = '';
  confirmPass: string ='';

  constructor(private fb: FormBuilder, public adminAccount: AdminAccountService){
    this.hasAuthority();
    this.createControlForm();
  }

  hasAuthority(){
    if(typeof this.adminAccount.currentAdminData.id === 'undefined'){
        throw new Error('cant access this page');
    }
  }

  createControlForm(){
      this.formUpdateAccount = this.fb.group({
          username: ['', Validators.required],
          surname: ['', Validators.required],
          email: ['', Validators.required],
          tel: ['', Validators.required]
      });

      Object.assign(this.dataToUpdate, this.adminAccount.currentAdminData);
      this.initForm();

      this.formUpdateAccount.valueChanges.subscribe((data)=>{
          this.setData(data);
      });
  }

  initForm(){
      this.formUpdateAccount.controls['username'].setValue(this.dataToUpdate.username);
      this.formUpdateAccount.controls['surname'].setValue(this.dataToUpdate.surname);
      this.formUpdateAccount.controls['email'].setValue(this.dataToUpdate.email);
      this.formUpdateAccount.controls['tel'].setValue(this.dataToUpdate.tel);

  }

  setData(data: any){
      Object.assign(this.dataToUpdate, data);
  }

  doUpdate(){
    this.srollToTop();
    if(this.isDataSet()){
        if(this.newPassword === this.confirmPass){
          if(this.OldPassword === this.adminAccount.currentAdminData.password){
              this.dataToUpdate.password = this.newPassword;
              this.adminAccount.updateAccount(JSON.stringify(this.dataToUpdate));
          }else{
              this.adminAccount.activeAlertError('Mot de passe actuel incorrect');
          }
        }else{
            this.adminAccount.activeAlertError('Le mot de passe de confirmation est different');
        }
    }else{
      this.adminAccount.activeAlertError(AlertMessage.ERROR_EMPTY_FIELD);
    }
  }

  isDataSet(): boolean{
      return this.formUpdateAccount.valid;
  }

  reset(){
      this.formUpdateAccount.reset();
  }

  srollToTop(){
      window.scrollTo(0,0);
  }
}
