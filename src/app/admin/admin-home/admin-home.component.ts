import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { Pack } from 'src/services/app/admin/pack.model';
import { PackService } from 'src/services/app/admin/pack.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  imgChoose: string ='';
  ext: any;
  packChoose: any;
  constructor(public packService : PackService,
              private accountAdminSrv: AdminAccountService,
              private route: Router,
              private ngBmodal: NgbModal
              ){ this.hasAuthority(); this.loadPack()}

  hasAuthority(){
      if(typeof this.accountAdminSrv.currentAdminData.id === 'undefined'){
            this.route.navigateByUrl('admin/login');
      }
  }

  loadPack(){
      if(this.packService.listPack.length == 0){
         this.packService.getAllPackAdmin();
      }
  }

    
  changePp(content: any, pack: Pack){
    this.packChoose = JSON.stringify(pack);
    this.ngBmodal.open(content);
  }

  close(){
    this.ngBmodal.dismissAll();
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
            this.packService.activeAlertError('Echec : Image trop lourde...!');            
          }
      }else{
        this.packService.activeAlertError('Echec : Format pas pris en charge');
      }
  }

  isFileTypeCorrect(type: string){
      console.log('tyu', type);
      const tab = ['jpg', 'jpeg', 'png', 'ico']

      return tab.includes(type.split('/')[1]);
  }

  DoUpdateImg(){
    if(this.imgChoose.length != 0 ){
      this.packService.updatePp(this.imgChoose, this.packChoose);
    }

      this.close();
  }


  refresh(){
      this.packService.listPack = [];
      this.packService.getAllPackAdmin();
  }
  goToUpdate(pack: any){
    this.packService.packToModify = pack;
    this.route.navigateByUrl('update/pack');
  }

  goToFormPageNewPack(){
    this.route.navigateByUrl('create/pack');
  }
}
