import { AdminAccountService } from 'src/services/app/admin/admin-account.service';
import { Component } from '@angular/core';
import { AccountService } from 'src/services/app/user/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pancmiewApp';
  
  constructor(public accountService: AccountService, public adminAccount: AdminAccountService){
  }

  
}
