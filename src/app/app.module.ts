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
import { SearchWordComponent } from './components/search-word/search-word.component'

const routerConfig: Route[] = [
  {
    canActivate:[AuthGuard],
    path:'',
    component: MainComponent,
    children:[
      { path: '', redirectTo: 'pool', pathMatch: 'full' ,canActivate:[AuthGuard]},
      { path: 'pool', component: PoolComponent ,canActivate:[AuthGuard]},
      { path: 'pools', component: PoolsComponent ,canActivate:[AuthGuard]},
      { path: 'pools/:poolId', component: PWordComponent ,canActivate:[AuthGuard]},
      { path: 'createWord', component: CreateWordComponent ,canActivate:[AuthGuard]},
      { path: 'random', component: RandomComponent ,canActivate:[AuthGuard]},
      
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
    SearchWordComponent
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
