import { Component, ElementRef, ViewChild } from '@angular/core';
import { GenerationService } from 'src/services/app/admin/generation.service';
import { AccountService } from 'src/services/app/user/account.service';
import { PageSecurityService } from 'src/services/page-security.service';

@Component({
  selector: 'app-list-generation',
  templateUrl: './list-generation.component.html',
  styleUrls: ['./list-generation.component.scss']
})
export class ListGenerationComponent {
  @ViewChild('firstGen') firstGen!: ElementRef;
  @ViewChild('secondGen') secondGen!: ElementRef;
  @ViewChild('thirdGen') thirdGen!: ElementRef;
  showFirst: boolean = true;
  showSecond: boolean = false;
  showThird : boolean = false;

    constructor(public generationSrv: GenerationService, private pageSecurity: PageSecurityService,
                public accountServ: AccountService
                ){
        this.hasAuthority();
    }

  hasAuthority(){
      this.pageSecurity.hasAuthority()
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
