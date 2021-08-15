import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./shared/guard/auth.guard";
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './email/verify-email/verify-email.component';

const routes: Routes = [
  // { path: "", component: UsersComponent, pathMatch: "full" },

  // { path: "login", component: LoginComponent, pathMatch: "full" }

  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-verification', component: VerifyEmailComponent },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "add-users", component: AddUsersComponent, canActivate: [AuthGuard] },
  { path: "edit-users/:code", component: EditUsersComponent, canActivate: [AuthGuard] },
  // {
  //   path: "",
  //   component: AdminLayoutComponent,
  //   children: [
  //     {
  //       path: "",
  //       loadChildren:
  //         "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
  //       canActivateChild: [GuardGuard]
  //     },
  //   ],
  //   canActivate: [GuardGuard],
  //   canLoad: [GuardGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
