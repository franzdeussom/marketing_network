import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { AccountService } from 'src/services/app/user/account.service';
import { Role } from 'src/services/app/user/role.enum';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @ViewChild('collapse') collapse!: ElementRef;
   routes = [ 
      {
        name : 'Accueil',
        route : 'home',
        iconClass: 'fa fa-home'
      },
      {
        name : 'Mes Packs',
        route : 'my-packs',
        iconClass: 'fa fa-handshake-o'
      },
      {
        name : 'Mon Profile',
        route : 'profil',
        iconClass: 'fa fa-user'
      },
      {
        name : 'Formation',
        route: 'formation',
        iconClass: "fa fa-newspaper-o"
      },
      {
        name: 'Deconnexion',
        route: 'logout',
        iconClass: 'fa fa-sign-out'
     }
   ]

   routeAdmin = [
    {
        name : 'Accueil',
        route: 'admin/home',
        iconClass: 'fa fa-home'
    },
    {
      name : 'Generation',
      route: 'generation/global',
      iconClass: 'fa fa-users'
    },
    {
      name: 'Demande Souscription',
      route: 'souscription/list/request',
      iconClass: 'fa fa-handshake-o'
    },
    {
      name: 'Create New Pack',
      route: 'create/pack',
      iconClass: 'fa fa-plus-circle'
    },
      {
        name: 'Admin Profil',
        route: 'admin/account/update',
        iconClass: 'fa fa-user'
      },
      {
        name : 'Formation',
        route: 'admin/formation',
        iconClass: "fa fa-newspaper-o"
      },
    {
        name: 'Deconnexion',
        route: 'logout',
        iconClass: 'fa fa-sign-out'
    }
    
   ]

   role = Role;

  constructor(private router: Router,
              public accountSrv: AccountService, //user
              public adminAccount: AdminAccountService){}

  showLink(){
    if(!this.collapse.nativeElement.classList.contains('show')){
        this.collapse.nativeElement.classList.add('show');
    }else{
        this.collapse.nativeElement.classList.remove('show');
    }
  }

  navigate(route : string){
      this.showLink(); //???
      if(route != 'logout'){
          this.router.navigateByUrl(route);
      }else{
          this.accountSrv.isAuthentificated = false;
          this.adminAccount.isAdminAuthentificated = false;
          this.accountSrv.clearSessionSave();
          window.location.href = '';
      }
  }
  
}
