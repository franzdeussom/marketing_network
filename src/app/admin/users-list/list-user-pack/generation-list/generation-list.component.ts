import { Component, ElementRef, ViewChild } from '@angular/core';
import { GenerationService } from 'src/services/app/admin/generation.service';
import { UserSuscribed } from 'src/services/app/admin/souscriptionListUser.model';
import { AccountService } from 'src/services/app/user/account.service';
import { PageSecurityService } from 'src/services/page-security.service';

@Component({
  selector: 'app-generation-list',
  templateUrl: './generation-list.component.html',
  styleUrls: ['./generation-list.component.scss']
})
export class GenerationListComponent {
  @ViewChild('firstGen') firstGen!: ElementRef;
  @ViewChild('secondGen') secondGen!: ElementRef;
  @ViewChild('thirdGen') thirdGen!: ElementRef;
  showFirst: boolean = true;
  showSecond: boolean = false;
  showThird : boolean = false;

  user: UserSuscribed = new UserSuscribed();

    constructor(public generationSrv: GenerationService, private pageSecurity: PageSecurityService,
                public accountServ: AccountService
                ){
        this.hasAuthority();
        this.loadTmpUserData();
    }

  hasAuthority(){
      this.pageSecurity.hasAuthority()
  }

  ngOnDestroy() {
      this.generationSrv.renitList();
      this.generationSrv.renitGain();
  }

  loadTmpUserData(){
    let user = localStorage.getItem('userSuscribed');
    if(user){
      Object.assign(this.user, JSON.parse(user));
      console.log('user log', this.user);
    }
  }

  switchToFirst(){
      this.showSecond = false;
      this.showThird = false;
      this.thirdGen.nativeElement.classList.remove('active');
      this.secondGen.nativeElement.classList.remove('active');
      this.firstGen.nativeElement.classList.add('active');
      this.showFirst = true;
  }

  switchToSecond(){
    this.showThird = false;
    this.showFirst = false;
    this.thirdGen.nativeElement.classList.remove('active');
    this.firstGen.nativeElement.classList.remove('active');
    this.secondGen.nativeElement.classList.add('active');
    this.showSecond = true;

  }
  
  switchToThird(){
    this.showFirst = false;
    this.showSecond = false;
    this.secondGen.nativeElement.classList.remove('active');
    this.firstGen.nativeElement.classList.remove('active');
    this.thirdGen.nativeElement.classList.add('active');
    this.showThird = true;

  }
}
