import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { Souscription } from 'src/services/app/admin/souscription.model';
import { SouscriptionService } from 'src/services/app/admin/souscription.service';

@Component({
  selector: 'app-souscription-request',
  templateUrl: './souscription-request.component.html',
  styleUrls: ['./souscription-request.component.scss']
})
export class SouscriptionRequestComponent {
  suscRequestToApprv: Souscription = new Souscription();
  suscRequestToDel : Souscription = new Souscription();

  listSearchRslt : Souscription[] = [];
  searchValue: string = '';

  constructor(public souscriptionService: SouscriptionService,
              private adminAccountSrv: AdminAccountService,
              private route: Router,
              private ngbModal: NgbModal
            ){ 
               this.hasAuthority()
               this.loadListRequest()}
  
               
  hasAuthority(){
      if(typeof this.adminAccountSrv.currentAdminData.id === 'undefined'){
          this.route.navigateByUrl('admin/login');
      }
  }

  loadListRequest(){
      if(this.souscriptionService.listSouscriptionRequest.length == 0 ){
          this.souscriptionService.loadListSouscriptionRequest();
      }
  }
  
  refresh(){
    this.souscriptionService.listSouscriptionRequest = [];
    this.souscriptionService.loadListSouscriptionRequest();
  }

  doSearch(){
      this.listSearchRslt = Array.from(this.souscriptionService.searchInSouscriptionList(this.searchValue));
  }

  openeModal(content: any, souscription: Souscription){
      Object.assign(this.suscRequestToApprv, souscription);
      this.ngbModal.open(content);
  }

  doApprouve(){
      this.souscriptionService.approuve(this.suscRequestToApprv.id, this.suscRequestToApprv.id_user);
      this.close();
  }

  close(){
      this.ngbModal.dismissAll();
  }

  openDeleteModal(content: any, souscription: Souscription){
    Object.assign(this.suscRequestToDel, souscription);
    this.ngbModal.open(content);
  }

  doDelete(){
      this.souscriptionService.deleteRequest(this.suscRequestToDel.id);
      this.close();
  }
}
