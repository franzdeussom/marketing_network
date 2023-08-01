import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { UserGenerationsComponent } from './user/user-generations/user-generations.component';
import { UserProfilsComponent } from './user/user-profils/user-profils.component';
import { CreateNewUserComponent } from './user/user-generations/create-new-user/create-new-user.component';
import { UpdatePackComponent } from './admin/admin-home/update-pack/update-pack.component';
import { CreatePackComponent } from './admin/admin-home/create-pack/create-pack.component';
import { SouscriptionRequestComponent } from './admin/admin-home/souscription-request/souscription-request.component';
import { UpdateAccountComponent } from './admin/update-account/update-account.component';
import { ListGenerationComponent } from './user/user-generations/list-generation/list-generation.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { ListUserPackComponent } from './admin/users-list/list-user-pack/list-user-pack.component';
import { GenerationListComponent } from './admin/users-list/list-user-pack/generation-list/generation-list.component';
import { ParseGainPipe } from 'src/services/app/pipe/parse-gain.pipe';
import { EditFormationComponent } from './admin/edit-formation/edit-formation.component';
import { FormationComponent } from './user/formation/formation.component';
import { AutoresizeDirective } from 'src/services/app/admin/autoresize.directive';
import { SlicePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    UserLoginComponent,
    UserHomeComponent,
    NavBarComponent,
    UserGenerationsComponent,
    UserProfilsComponent,
    CreateNewUserComponent,
    UpdatePackComponent,
    CreatePackComponent,
    SouscriptionRequestComponent,
    UpdateAccountComponent,
    ListGenerationComponent,
    UsersListComponent,
    ListUserPackComponent,
    GenerationListComponent,
    ParseGainPipe,
    EditFormationComponent,
    FormationComponent,
    AutoresizeDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlicePipe,
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
