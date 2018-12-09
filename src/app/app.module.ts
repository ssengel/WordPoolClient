import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Route } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { MainComponent } from './components/main/main.component'
import { HeaderComponent } from './components/header/header.component';
import { WallComponent } from './components/wall/wall.component'
import { AuthGuard } from './guards/auth.guard';
import { PoolComponent } from './components/pool/pool.component';
import { AuthInterceptor } from './intercepters/auth-interceptor';
import { CreateWordComponent } from './components/create-word/create-word.component';
import { HttpErrorInterceptor } from './intercepters/http-error-interceptor';
import { RandomComponent } from './components/random/random.component';
import { FooterComponent } from './components/footer/footer.component';
import { PoolsComponent } from './components/pools/pools.component';
import { PWordComponent } from './components/pword/pword.component'
import { ErrorHandlerService } from './services/error-handler.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchWordComponent } from './components/search-word/search-word.component';
import { PoolDetailComponent } from './components/pool-detail/pool-detail.component';
import { ExploreComponent } from './components/explore/explore.component';
import { CardExploreComponent } from './components/card-explore/card-explore.component';
import { CardExploreFooterComponent } from './components/card-explore-footer/card-explore-footer.component';
import { ExplorePoolDetailComponent } from './components/explore-pool-detail/explore-pool-detail.component';
import { ModalCreateWordToPoolComponent } from './components/modal-create-word-to-pool/modal-create-word-to-pool.component';
import { MyProfileLinkComponent } from './components/my-profile-link/my-profile-link.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { WordDetailComponent } from './components/word-detail/word-detail.component'

const routerConfig: Route[] = [
  {
    canActivate:[AuthGuard],
    path:'',
    component: MainComponent,
    children:[
      { path: '', redirectTo: 'pool', pathMatch: 'full' ,canActivate:[AuthGuard]},
      { path: 'pool', component: PoolComponent ,canActivate:[AuthGuard]},
      { path: 'word/:wordId', component: WordDetailComponent ,canActivate:[AuthGuard]},
      { path: 'myProfile', component: MyProfileComponent ,canActivate:[AuthGuard]},
      { path: 'pools', component: PoolsComponent ,canActivate:[AuthGuard]},
      { path: 'pools/:poolId', component: PoolDetailComponent ,canActivate:[AuthGuard]},
      { path: 'createWord', component: CreateWordComponent ,canActivate:[AuthGuard]},
      { path: 'explore', component: ExploreComponent ,canActivate:[AuthGuard]},
      { path: 'random', component: RandomComponent ,canActivate:[AuthGuard]},
      { path: 'explore/pool/:poolId', component: ExplorePoolDetailComponent ,canActivate:[AuthGuard]},
      
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    MainComponent,
    HeaderComponent,
    WallComponent,
    PoolComponent,
    CreateWordComponent,
    RandomComponent,
    FooterComponent,
    PoolsComponent,
    PWordComponent,
    SearchWordComponent,
    PoolDetailComponent,
    ExploreComponent,
    CardExploreComponent,
    CardExploreFooterComponent,
    ExplorePoolDetailComponent,
    ModalCreateWordToPoolComponent,
    MyProfileLinkComponent,
    MyProfileComponent,
    WordDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routerConfig),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true},
    { provide: ErrorHandler, useClass:ErrorHandlerService },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
