import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { AdminsignupComponent } from './adminsignup/adminsignup.component';
import { NormalheaderComponent } from './normalheader/normalheader.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { WelguestComponent } from './welguest/welguest.component';
import { WeluserComponent } from './weluser/weluser.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ListofmembersComponent } from './listofmembers/listofmembers.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { AddcatComponent } from './addcat/addcat.component';
import { AddsubcatComponent } from './addsubcat/addsubcat.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ShowcatComponent } from './showcat/showcat.component';
import { ShowsubcatComponent } from './showsubcat/showsubcat.component';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { ShowproddeatailsComponent } from './showproddeatails/showproddeatails.component';
import { ShowcartComponent } from './showcart/showcart.component';
import { UpdatesubcatComponent } from './updatesubcat/updatesubcat.component';
import { HomeComponent } from './home/home.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { UpdatestatusComponent } from './updatestatus/updatestatus.component';
import { ListofordersComponent } from './listoforders/listoforders.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { AboutComponent } from './about/about.component';
import { AddwcatComponent } from './addwcat/addwcat.component';
import { WsubcatComponent } from './wsubcat/wsubcat.component';
import { LogoutComponent } from './logout/logout.component';
import { ContactComponent } from './contact/contact.component';
import { ActivateComponent } from './activate/activate.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { FpComponent } from './fp/fp.component';
import { MatRippleModule } from '@angular/material/core';
// import { NgImageSliderModule } from 'ng-image-slider';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
// import {  NgxImgZoomModule } from 'ngx-img-zoom';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
// import { NgMagnizoomModule } from 'ng-magnizoom';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    SigninComponent,
    AdminsignupComponent,
    NormalheaderComponent,
    AdminheaderComponent,
    WelguestComponent,
    WeluserComponent,
    ChangepasswordComponent,

    FooterComponent,
    ListofmembersComponent,
    SearchuserComponent,
    AddcatComponent,
    AddsubcatComponent,
    AddproductComponent,
    ShowcatComponent,
    ShowsubcatComponent,
    ShowproductComponent,
    ShowproddeatailsComponent,
    ShowcartComponent,
    UpdatesubcatComponent,
    HomeComponent,
    AdminpanelComponent,
    UpdateproductComponent,
    CheckoutComponent,
    OrdersummaryComponent,
    OrderhistoryComponent,
    OrderdetailsComponent,
    UpdatestatusComponent,
    ListofordersComponent,
    SearchresultsComponent,
    AboutComponent,
    AddwcatComponent,
    WsubcatComponent,
    LogoutComponent,
    ContactComponent,
    ActivateComponent,
    ForgetpasswordComponent,
    FpComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // NgImageSliderModule,
    NgbModule,
    MatRippleModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    NgHttpLoaderModule.forRoot(),
    NgxSpinnerModule,
    // NgMagnizoomModule,
    // NgxImgZoomModule
  ],
  // exports: [NgbdCarouselPause],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

// @NgbModule({
//   declarations: [
//     SigninComponent
//   ],
//   imports: [
//     NgbModule
//   ],
//   providers: [NgbModalConfig, NgbModal],
//   bootstrap: [AppComponent]

// })
