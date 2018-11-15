import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SearchPipe } from '../pipes/search/search';
import { InputCounterModule } from 'ng4-input-counter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { OrdersPage } from '../pages/orders/orders';
import { CartPage } from '../pages/cart/cart';
import { PagamentoPage } from '../pages/pagamento/pagamento';

import { CadastroPage } from '../pages/cadastro/cadastro';
import { ServiceProvider } from '../providers/service/service';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { MyordersPage } from '../pages/myorders/myorders';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SearchPipe,
    OrdersPage,
    CartPage,
    PagamentoPage,
    CadastroPage,
    MyordersPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InputCounterModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    OrdersPage,
    CartPage,
    PagamentoPage,
    CadastroPage,
    MyordersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    Geolocation,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider
  ]
})
export class AppModule {}
