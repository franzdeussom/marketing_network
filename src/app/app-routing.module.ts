import { FormationComponent } from './user/formation/formation.component';
import { EditFormationComponent } from './admin/edit-formation/edit-formation.component';
import { ListUserPackComponent } from './admin/users-list/list-user-pack/list-user-pack.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { UserGenerationsComponent } from './user/user-generations/user-generations.component';
import { UserProfilsComponent } from './user/user-profils/user-profils.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { CreateNewUserComponent } from './user/user-generations/create-new-user/create-new-user.component';
import { UpdatePackComponent } from './admin/admin-home/update-pack/update-pack.component';
import { CreatePackComponent } from './admin/admin-home/create-pack/create-pack.component';
import { SouscriptionRequestComponent } from './admin/admin-home/souscription-request/souscription-request.component';
import { UpdateAccountComponent } from './admin/update-account/update-account.component';
import { ListGenerationComponent } from './user/user-generations/list-generation/list-generation.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { GenerationListComponent } from './admin/users-list/list-user-pack/generation-list/generation-list.component';

const routes: Routes = [

  //default app connexion login
  {
    path: 'login',
    component: UserLoginComponent
  },

  //user routes
  {
    path: 'home',
    component: UserHomeComponent
  },
  {
    path: 'my-packs',
    component: UserGenerationsComponent
  },
  {
    path: 'my-generation/list',
    component: ListGenerationComponent
  },
  {
    path: 'generate-user',
    component: CreateNewUserComponent
  },
  {
    path: 'profil',
    component: UserProfilsComponent
  },
  {
    path: 'formation',
    component: FormationComponent

  },
  
  //admin routes
  {
    path: 'admin/home',
    component: AdminHomeComponent
  },
  {
    path : 'generation/global',
    component: UsersListComponent,
  },
  {
    path:'admin/list/pack/users',
    component: ListUserPackComponent
  },
  {
    path: 'admin/list/pack/users/generation',
    component: GenerationListComponent
    
  },
  {
    path: 'update/pack',
    component: UpdatePackComponent
  },
  {
    path: 'create/pack',
    component: CreatePackComponent
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'souscription/list/request',
    component: SouscriptionRequestComponent
  },
  {
    path: 'admin/formation',
    component: EditFormationComponent
  },
  {
    path: 'admin/account/update',
    component: UpdateAccountComponent
  },


  //default page 
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
