import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessage } from 'src/services/app/alert.message';
import { AccountService } from 'src/services/app/user/account.service';
import { User } from 'src/services/app/user/user.model';
import { PageSecurityService } from 'src/services/page-security.service';

@Component({
  selector: 'app-user-profils',
  templateUrl: './user-profils.component.html',
  styleUrls: ['./user-profils.component.scss']
})
export class UserProfilsComponent {
  tmpUserData: User = new User();
  formUpdateAccount!: FormGroup;
  newPassword : string = '';
  OldPassword : string = '';
  confirmPass : string = '';
  imgChoose: string = '';
  ext: string ='';

  constructor(public accountSrv: AccountService,
              private authority: PageSecurityService,
              private fb: FormBuilder,
              private ngBmodal: NgbModal

              ){ this.hasAuthority() }

  hasAuthority(){
      this.authority.hasAuthority();
  }

  createControlFormUpdate(){
      this.formUpdateAccount = this.fb.group({
          nom : ['', Validators.required],
          prenom: ['', Validators.required],
          email: ['', Validators.required],
          tel : ['', Validators.required]
      });

      this.formUpdateAccount.controls['nom'].setValue(this.accountSrv.currentUsersData.username);
      this.formUpdateAccount.controls['prenom'].setValue(this.accountSrv.currentUsersData.surname);
      this.formUpdateAccount.controls['email'].setValue(this.accountSrv.currentUsersData.email);
      this.formUpdateAccount.controls['tel'].setValue(this.accountSrv.currentUsersData.tel);
      
      this.formUpdateAccount.valueChanges.subscribe((data)=>{
          this.setData(data);
      });
 }

  updateRequest(modal: any){
      Object.assign(this.tmpUserData, this.accountSrv.currentUsersData);
      this.createControlFormUpdate();
      this.ngBmodal.open(modal);
  }

  setData(data: any){
    this.tmpUserData.surname = data.prenom;
    this.tmpUserData.username = data.nom;
    this.tmpUserData.email = data.email;
    this.tmpUserData.tel = data.tel;
  }

  doUpdate(){
    console.log(this.tmpUserData);
      if(this.isFormValid()){
          if(this.accountSrv.currentUsersData.password === this.OldPassword){
            if(this.confirmPass === this.newPassword){
                this.tmpUserData.password = this.newPassword;
                this.accountSrv.updtade(JSON.stringify(this.tmpUserData));
                this.formUpdateAccount.reset();
                this.close();
            }else{
            this.accountSrv.activeAlertError('Echec ! Mot de passe de confirmation différent.')
            } 
          }else{
            this.accountSrv.activeAlertError('Echec ! Mot de passe actuelle invalide.')
          }
      }else{
            this.accountSrv.activeAlertError(AlertMessage.ERROR_EMPTY_FIELD);
      }
  }

  changePp(content: any){
    this.ngBmodal.open(content);
  }

  setPp(event: any){
      const img = event.target.files[0];
      let fileReader = new FileReader();

      if(this.isFileTypeCorrect(img.type)){
          if(img.size < 80000000){

              fileReader.onload =(prog: any)=>{
                  this.imgChoose = String(prog.target.result);
              }
              this.ext = img.type;

              fileReader.readAsDataURL(img);
          }else{
            this.accountSrv.activeAlertError('Echec : Image trop lourde...!');            
          }
      }else{
        this.accountSrv.activeAlertError('Echec : Format pas pris en charge');
      }
  }

  isFileTypeCorrect(type: string){
      console.log('tyu', type);
      const tab = ['jpg', 'jpeg', 'png', 'ico']

      return tab.includes(type.split('/')[1]);
  }

  DoUpdateImg(){
      this.accountSrv.updatePp(this.imgChoose, this.ext);
      console.log(this.imgChoose);
      this.close();
  }

  isFormValid(): boolean{
      return this.formUpdateAccount.valid;
  }

  close(){
      this.ngBmodal.dismissAll();
  }
}
