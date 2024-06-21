import { FpComponent } from './fp/fp.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ActivateComponent } from './activate/activate.component';
import { ContactComponent } from './contact/contact.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { AddwcatComponent } from './addwcat/addwcat.component';
import { AboutComponent } from './about/about.component';
import { ListofordersComponent } from './listoforders/listoforders.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { ShowcartComponent } from './showcart/showcart.component';
import { HomeComponent } from './home/home.component';
import { ShowproddeatailsComponent } from './showproddeatails/showproddeatails.component';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { ShowsubcatComponent } from './showsubcat/showsubcat.component';
import { ShowcatComponent } from './showcat/showcat.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdatesubcatComponent } from './updatesubcat/updatesubcat.component';
import { AddsubcatComponent } from './addsubcat/addsubcat.component';
import { AddcatComponent } from './addcat/addcat.component';
import { ListofmembersComponent } from './listofmembers/listofmembers.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { WeluserComponent } from './weluser/weluser.component';
import { WelguestComponent } from './welguest/welguest.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NormalheaderComponent } from './normalheader/normalheader.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AdminsignupComponent } from './adminsignup/adminsignup.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { UpdatestatusComponent } from './updatestatus/updatestatus.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { LogoutComponent } from './logout/logout.component';
import { ActivateGuard } from './activate.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'adminheader',
    component: AdminheaderComponent,
  },
  {
    path: 'fp',
    component: FpComponent,
  },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent,
  },
  {
    path: 'activate',
    component: ActivateComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'adminsignup',
    component: AdminsignupComponent,
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
  },
  {
    path: 'footer',
    component: FooterComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'normalheader',
    component: NormalheaderComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'welguest',
    component: WelguestComponent,
  },
  {
    path: 'weluser',
    component: WeluserComponent,
  },
  {
    path: 'searchuser',
    component: SearchuserComponent,
  },
  {
    path: 'listofmembers',
    component: ListofmembersComponent,
  },
  {
    path: 'addcat',
    component: AddcatComponent,
    // canActivate:[ActivateGuard]
  },
  {
    path: 'addwcat',
    component: AddwcatComponent,
  },
  {
    path: 'addsubcat',
    component: AddsubcatComponent,
  },
  {
    path: 'updatesubcat',
    component: UpdatesubcatComponent,
  },
  {
    path: 'addproduct',
    component: AddproductComponent,
  },
  {
    path: 'showcat',
    component: ShowcatComponent,
  },
  {
    path: 'showsubcat',
    component: ShowsubcatComponent,
  },
  {
    path: 'showproducts',
    component: ShowproductComponent,
  },
  {
    path: 'showproddetails',
    component: ShowproddeatailsComponent,
  },
  {
    path: 'showcart',
    component: ShowcartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'ordersummary',
    component: OrdersummaryComponent,
  },
  {
    path: 'orderdetails',
    component: OrderdetailsComponent,
  },
  {
    path: 'orderhistory',
    component: OrderhistoryComponent,
  },
  {
    path: 'listoforders',
    component: ListofordersComponent,
  },
  {
    path: 'updatestatus',
    component: UpdatestatusComponent,
  },
  {
    path: 'searchresults',
    component: SearchresultsComponent,
  },
  {
    path: 'updateproduct',
    component: UpdateproductComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
