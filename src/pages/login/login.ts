import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HomePage } from '../../pages/home/home';
import { ServiceProvider } from '../../providers/service/service';
import { Geolocation } from '@ionic-native/geolocation';
import JQuery from "jquery";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  userData: any;
  name: any;
  familyname: any;
  logging: any;
  userData1: any;
  username: any;
  password: any;
  latitude: any;
  longitude: any;
  rua: any;
  bairro: any;
  cidade: any;
  estado: any;
  cep: any;
  isLoggedIn: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: Facebook,
    public events: Events,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public service: ServiceProvider,
    private geolocation: Geolocation,
    private googlePlus: GooglePlus
    ) {

  } // constructor

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      var GoogleAPI = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + resp.coords.latitude + ',' + resp.coords.longitude+"&key=AIzaSyBxdYLhgMNdTXYyvvakmR1CoejZZX-L1VU";
      var getLocation = JQuery.get(GoogleAPI);
      getLocation.done(function (data) {

        this.rua = data.results[0].address_components[1].long_name;
        this.bairro = data.results[0].address_components[2].long_name;
        this.cidade = data.results[0].address_components[3].long_name;
        this.estado = data.results[0].address_components[4].long_name;
        // this.pais = data.results[0].address_components[5].long_name;
        this.cep = data.results[0].address_components[6].long_name;
        let lat = data.results[0].geometry.location['lat'];
        let long = data.results[0].geometry.location['lng'];
        console.log(this.rua);
        console.log(this.bairro);
        console.log(this.cidade);
        console.log(this.estado);
        console.log(this.cep);
        console.log(data.results);
        console.log('lat', lat);
        console.log('long',long);
        localStorage.setItem("ruaGeo", this.rua);
        localStorage.setItem("bairroGeo", this.bairro);
        localStorage.setItem("cidadeGeo", this.cidade);
        localStorage.setItem("estadoGeo", this.estado);
        localStorage.setItem("cepGeo", this.cep);
        localStorage.setItem("latitudeGeo", lat);
        localStorage.setItem("longitudeGeo", long);
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  createUserFace(user) {
    this.events.publish('userFace:created', user, Date.now());
  }
  createUserGoogle(user) {
    this.events.publish('userGoogle:created', user, Date.now());
  }
  //logar com google
  loginGoogle() {
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '417557082014-6qvq5330p1lsb8md959j1d2o5onn6pb3.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
      .then(res => {

        this.name = res.displayName;
        this.email = res.email;
        this.familyname = res.familyName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;
        this.logging = 1;

        this.userData1 = { nameg: this.name, email: this.email, family: this.familyname, id: this.userId, image: this.imageUrl, statusg: this.logging };
        this.createUserFace(this.userData1);
        this.navCtrl.setRoot(HomePage, { idg: this.userId, emailgoogle: this.email, namegoogle: this.name, image: this.imageUrl, rua: localStorage.getItem("rua"), bairro: localStorage.getItem("bairro"), cidade: localStorage.getItem("cidade"), estado: localStorage.getItem("estado"), cep: localStorage.getItem("cep"), tipo: "google" });

      })
      .catch(err => console.error(err));
  }
  //logar com facebook
  loginface() {
    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,name,email,first_name,picture.width(100).height(100).as(picture_large)', []).then(profile => {
        this.isLoggedIn = true;
        this.imageUrl = profile['picture_large']['data']['url'];
        this.userData = { emailface: profile['email'], statusf: this.isLoggedIn, idface: profile['id'], nameface: profile['name'], first_name: profile['first_name'], picture: this.imageUrl, username: profile['name'] }
        let loader = this.loading.create({
          content: 'Carregando..',
        });
        loader.present().then(() => {
          this.createUserGoogle(this.userData);
          this.navCtrl.setRoot(HomePage, { idf: profile['id'], nameface: profile['name'], image: this.imageUrl, emailface: profile['email'], rua: localStorage.getItem("rua"), bairro: localStorage.getItem("bairro"), cidade: localStorage.getItem("cidade"), estado: localStorage.getItem("estado"), cep: localStorage.getItem("cep"), tipo: "face" });

        });
        loader.dismiss();
      });
    });

  }

  goHome() {
    this.navCtrl.push(HomePage, { image: "image/logotipo.png", rua: localStorage.getItem("rua"), bairro: localStorage.getItem("bairro"), cidade: localStorage.getItem("cidade"), estado: localStorage.getItem("estado"), cep: localStorage.getItem("cep") });
  }
  goCad() {
    this.navCtrl.push(CadastroPage);
  }
  loadLogin: Boolean = false;
  logar() {
    this.loadLogin = true;

    this.service.PostLogin("login=" + this.username + "&password=" + this.password)
      .subscribe(
        data => {
          if (data.error == false) {

            localStorage.setItem("token", data.user.token);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("id", data.user.id);
            localStorage.setItem("perfil", data.user.perfil);
            this.navCtrl.setRoot(HomePage, { tipo: "user", image: "image/logotipo.png", rua: localStorage.getItem("rua"), bairro: localStorage.getItem("bairro"), cidade: localStorage.getItem("cidade"), estado: localStorage.getItem("estado"), cep: localStorage.getItem("cep") });
            this.loadLogin = false;
          } else {
            this.showAlert();
          }
        }

      );

  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Usuario ou senha incorretos',
      buttons: ['OK']
    });
    alert.present();
    this.loadLogin = false;
  }
}
