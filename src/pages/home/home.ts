import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OrdersPage } from '../orders/orders';
import { LoginPage } from '../login/login';
import { ServiceProvider } from '../../providers/service/service';
import { MyordersPage } from '../myorders/myorders';
import JQuery from "jquery";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imageUrl: any;
  idUser: any;
  nameUser: any;
  /* variáveis google geolocalização*/
  ruaGeo: string;
  bairroGeo: string;
  cidadeGeo: string;
  estadoGeo: string;
  cepGeo: string;
  latitudeGeo: string;
  longitudeGeo: string;
  saveGeo: Boolean = false;
  saveCep: Boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: ServiceProvider,
    public alertCtrl: AlertController,
    public geolocation: Geolocation
  ) {
    this.idUser = localStorage.getItem("id");
    this.nameUser = localStorage.getItem("name");
    this.listBusiness();
    this.CheckAdress();
    this.ruaGeo = localStorage.getItem("ruaGeo");
    this.bairroGeo = localStorage.getItem("bairroGeo");
    this.cidadeGeo = localStorage.getItem("cidadeGeo");
    this.estadoGeo = localStorage.getItem("estadoGeo");
    this.cepGeo = localStorage.getItem("cepGeo");
    // this.latitudeGeo = localStorage.getItem("latitudeGeo");
    // this.longitudeGeo = localStorage.getItem("longitudeGeo");
  }
  pp: string = "";
  palavra: Boolean = false;
  iconsLeave: Boolean = false;
  iconsIn: Boolean = false;
  onKeySearch(event: any) {
    if (this.pp != "") {
      this.palavra = true;
      this.iconsIn = false;
      this.iconsLeave = true;
    } else {
      this.palavra = false;
      this.iconsLeave = false;
      this.iconsIn = true;
    }
  }
  searchInput: Boolean = false;
  showSerach() {
    if (this.searchInput === false) {
      this.searchInput = true;
    } else {
      this.searchInput = false;
    }
  }
  closeSearch() {
    this.pp = "";
    this.palavra = false;
    this.searchInput = false;
    this.iconsLeave = false;
    this.iconsIn = true;
  }
  goOrders(data) {
    this.navCtrl.push(OrdersPage, {
      obj: data
    });
  }
  pop: Boolean = false;
  showMenuPop() {
    if (this.pop === false) {
      this.pop = true;
    } else {
      this.pop = false;
    }
  }
  business: any;
  error: any;
  load: Boolean = false;
  listBusiness() {
    this.load = true;
    this.service.getBusiness().subscribe(
      data => {
        this.business = data.message;
        this.load = false;
      },
      err => this.error
    )
  }
  goMyOrders() {
    this.navCtrl.push(MyordersPage);
  }
  goBack() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }


  /**  Endereço */
  showAdress: boolean = false;
  count: any;
  nomerua: any;
  idadress: any;
  totalend: any;
  rua: any;
  cep: any;
  bairro: any;
  numero: any;
  complem: any;
  cidade: any;
  estado: any;
  arrteste = [];
  nomemunicipio: any;
  codigomunicipio: any;
  CheckAdress() {
    this.service.checkEndereco(this.idUser).subscribe(
      data => {
        this.count = data.count;
        this.bairro = data.message.bairro_user;
        this.cidade = data.message.cidade_user;
        this.estado = data.message.estado_user;
        this.cep = data.message.cep_user;
        this.rua = data.message.rua_user;
        this.numero = data.message.numero;
        this.complem = data.message.compl_user;
        this.count === 0 ? this.cepUser = this.cepGeo : this.cepUser = this.cepUser;
        this.count === 0 ? this.bairroUser = this.bairroGeo : this.bairroUser = this.bairroUser;
        this.count === 0 ? this.ruaUser = this.ruaGeo : this.ruaUser = this.ruaUser;
        this.count === 0 ? this.cidadeUser = this.cidadeGeo : this.cidadeUser = this.cidadeUser;
        this.count === 0 ? this.estadoUser = this.estadoGeo : this.estadoUser = this.estadoUser;

      },
      err => this.error
    )
  }
  updateAdd(id) {
    this.load = true;
    this.service.updateAddress(
      "cep_user=" + this.cep +
      "&id_user=" + this.idUser +
      "&rua_user=" + this.rua +
      "&estado_user=" + this.estado +
      "&cidade_user=" + this.cidade +
      "&bairro_user=" + this.bairro +
      "&compl_user=" + this.complem +
      "&numero=" + this.numero +
      "&id_bairro=0",
      id
    )
      .subscribe(
        data => {
          console.log(data);
          this.load = false;
          this.CheckAdress();
          this.showRegisterSuccess();

        }
      );
  }

  cepUser: any = '';
  bairroUser: any;
  cidadeUser: any;
  estadoUser: any;
  ruaUser: any;
  numeroUser: any;
  complUser: any;
  idEnd: any;
  getEndereco(event: any) {//captura campos de endereço pelo cep digitado no input para cadastro
    this.service.getCep(this.cepUser).subscribe(
      data => {
        if (data.bairro != '' && data.cidade != '' && data.uf != '') {
          this.bairroUser = data.bairro;
          this.ruaUser = data.rua;
          this.cidadeUser = data.cidade;
          this.estadoUser = data.uf;
          this.ruaUser = data.logradouro;
          this.highlightInput = true;
          this.saveGeo = false;
          this.saveCep = true;
          this.getAddressByCep();
        } else {
          this.showErrorCep();
        }
      });
  }
  showInfoCep: Boolean = false;
  getUpdateAdd(event: any) {//captura campos de endereço pelo cep digitado no input para alteração
    this.service.getCep(this.cep).subscribe(
      data => {
        if (data.bairro != '' && data.cidade != '' && data.uf != '') {

          this.bairro = data.bairro;
          this.rua = data.rua;
          this.cidade = data.cidade;
          this.estado = data.uf;
          this.rua = data.logradouro;
          this.numero = 'número';
          this.complem = 'Complemento';

        } else {
          this.showInfoCep = true;
          this.cep = '';
        }
      });
  }
  closeInfoCep() {
    this.showInfoCep = false;
  }
  serching() {
    this.showInfoCep = false;
  }

  btCep: Boolean = false;
  //botão não
  showAddressCepAPI() {
    this.btCep = true;
    this.cepUser = '';
    this.ruaUser = '';
    this.bairroUser = '';
    this.numeroUser = '';
    this.complUser = '';
    this.cidadeUser = '';
    this.estadoUser = '';
    this.highlightInput = false;
    this.btSave = false;
    this.btYes = false;
    this.btNo = true;
  }
  highlightInput: Boolean = false;
  btYes: Boolean = false;
  btNo: Boolean = false;
  //botão não
  showAddressGeo() {
    this.btCep = false;
    this.cepUser = this.cepGeo;
    this.bairroUser = this.bairroGeo;
    this.ruaUser = this.ruaGeo;
    this.cidadeUser = this.cidadeGeo;
    this.estadoUser = this.estadoGeo;
    this.highlightInput = true;
    this.btSave = false;
    this.btYes = true;
    this.btNo = false;
    this.latitudeGeo = localStorage.getItem("latitudeGeo");
    this.longitudeGeo = localStorage.getItem("longitudeGeo");
    console.log('console geo', this.latitudeGeo)
    console.log('console geo', this.longitudeGeo)
    this.saveGeo = true;
    this.saveCep = false;
  }
  btSave: Boolean = false;
  btSaveCep: Boolean = false;
  writingNumber() {
    this.numero != '' ? this.highlightInput = false : this.highlightInput = true;
    this.saveGeo === true ? this.btSave = true : this.btSave = false;
    this.saveCep === true ? this.btSaveCep = true : this.btSaveCep = false;
  }


  hideHeader: Boolean = false;

  showRegisterSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Cadastro realizado',
      buttons: ['OK']
    });
    alert.present();
  }
  showErrorCep() {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Cep inválido',
      buttons: ['OK']
    });
    alert.present();
  }
  modalUpdateAddress: Boolean = false;
  openUpdateAdrress() {
    this.modalUpdateAddress = true;
    this.hideHeader = true;
  }
  closseModalUpdateAddress() {
    this.modalUpdateAddress = false;
  }
  modalRegister: Boolean = false;
  openRegisterAdrress() {
    this.modalRegister = true;
    this.hideHeader = true;
  }
  closeModalRegister() {
    this.modalRegister = false;
  }
  switch: Boolean = false;
  classActive(data) {
    if (data.status_info_end === 0) {
      data.status_info_end = 1;
      this.switch = false;
    } else {
      this.switch = true;
      data.status_info_end = 0;
    }
    console.log(data.status_info_end);
  }
  getLat = '';
  getLong = '';

  getAddressByCep() {
    this.geolocation.getCurrentPosition().then((resp) => {
      var GoogleAPI = 'https://maps.google.com/maps/api/geocode/json?address=' + this.cepUser + '&sensor=false&key=AIzaSyBxdYLhgMNdTXYyvvakmR1CoejZZX-L1VU';
      var getLocation = JQuery.get(GoogleAPI);
      getLocation.done(function (data) {
        this.getLat = data.results[0].geometry.location['lat'];
        this.getLong = data.results[0].geometry.location['lng'];
        console.log('dentro da função da API do Google',this.getLat)
        console.log('dentro da função da API do Google',this.getLong)
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  //cadastro endereço por geolocalização
  cadAdress() {
    this.service.registerAdress(
      "cep_user=" + this.cepUser +
      "&rua_user=" + this.ruaUser +
      "&id_user=" + this.idUser +
      "&rua_user=" + this.ruaUser +
      "&estado_user=" + this.estadoUser +
      "&cidade_user=" + this.cidadeUser +
      "&bairro_user=" + this.bairroUser +
      "&numero=" + this.numeroUser +
      "&latitude=" + this.latitudeGeo +
      "&longitude=" + this.longitudeGeo
    )
      .subscribe(
        data => {
          if (data.error === false) {
            this.showRegisterSuccess();

            this.modalRegister = false;
            this.CheckAdress();
          } else {
            //this.showAlert1();
          }

        }
      );
  }
  //cadastro endereço por cep digitado
  cadAdressByCep() {
    console.log('fora da função da API do Google',this.getLat)
    console.log('fora da função da API do Google',this.getLong)
    this.service.registerAdress(
      "cep_user=" + this.cepUser +
      "&rua_user=" + this.ruaUser +
      "&id_user=" + this.idUser +
      "&rua_user=" + this.ruaUser +
      "&estado_user=" + this.estadoUser +
      "&cidade_user=" + this.cidadeUser +
      "&bairro_user=" + this.bairroUser +
      "&numero=" + this.numeroUser +
      "&latitude=" + this.getLat +
      "&longitude=" + this.getLong
    )
      .subscribe(
        data => {
          if (data.error === false) {
            this.showRegisterSuccess();

            this.modalRegister = false;
            this.CheckAdress();
          } else {
            //this.showAlert1();
          }

        }
      );
  }
}
