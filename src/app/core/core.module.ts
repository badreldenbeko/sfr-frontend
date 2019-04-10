import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {SystemsComponent} from '../systems/systems.component';
import {BranchesComponent} from '../branches/branches.component';
import {UsersComponent} from '../users/users.component';
import {BranchDetailComponent} from '../branches/branch-detail/branch-detail.component';
import {SystemDetailComponent} from '../systems/system-detail/system-detail.component';
import {ProductsComponent} from '../products/products.component';
import {ProductDetailComponent} from '../products/product-detail/product-detail.component';
import {RequestsComponent} from '../requests/requests.component';
import {RequestDetailComponent} from '../requests/request-detail/request-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'branch/:id', component: BranchDetailComponent, canActivate: [AuthGuard]},
  {path: 'system/:id', component: SystemDetailComponent, canActivate: [AuthGuard]},
  {path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},
  {path: 'requests/:id', component: RequestsComponent, canActivate: [AuthGuard]},
  {path: 'request/:id', component: RequestDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    SystemsComponent,
    BranchesComponent,
    UsersComponent,
    BranchDetailComponent,
    SystemDetailComponent,
    ProductsComponent,
    ProductDetailComponent,
    RequestsComponent,
    RequestDetailComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [AuthService]
})
export class CoreModule {
}
