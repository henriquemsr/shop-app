import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { ServiceProvider } from '../../providers/service/service';
import { HomePage } from '../../pages/home/home';
import JQuery from "jquery";


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  nome: any;
  email: any;
  telefone: any;
  cep: any;
  rua: any;
  bairro: any;
  cidade: any;
  estado: any;
  nomeface: any;
  emailface: any;
  nomegoogle: any;
  emailgoogle: any;
  senha: any;
  rsenha: any;
  tipo: any;
  latitude: any;
  longitude: any;
  msnome: any;
  msemail: any;
  mstelefone: any;
  mssenha: any;
  msrsenha: any;
  msrua: any;
  mscep: any;
  msbairro: any;
  mscidade: any;
  msestado: any;
  email1: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: ServiceProvider,
    public alertCtrl: AlertController

  ) {
    

  }

  ionViewDidLoad() {
    this.nomegoogle = this.navParams.get("namegoogle");
    this.emailgoogle = this.navParams.get("emailgoogle");
    this.nomeface = this.navParams.get("nameface");
    this.emailface = this.navParams.get("emailface");
    this.tipo = this.navParams.get("tipo");

    switch (this.tipo) {

      case 'face':
        this.nome = this.nomeface;
        this.email = this.emailface;
        break;

      case 'google':
        this.nome = this.nomegoogle;
        this.email = this.emailgoogle;
        break;

      case 'user':
        // loga com user
        break;

    }
  }
  showAlert3() {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Cadastro realizado',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'As senhas não estão iguais',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert1() {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Esse usuario ja existe',
      buttons: ['OK']
    });
    alert.present();
  }
  testecadastro() {
    if (this.nome == undefined || this.nome == '') {

      this.msnome = "Por favor preencha o nome";
    } else if (this.email == undefined || this.email == '') {

      this.msemail = "Por favor preencha o email";

    }
    else if (this.telefone == undefined || this.telefone == '') {

      this.mstelefone = "Por favor preencha o telefone";

    }

    else if (this.senha == undefined || this.senha == '') {
      this.mssenha = "Por favor preencha a senha";

    }
    else if (this.rsenha == undefined || this.rsenha == '') {
      this.msrsenha = "Por favor confirme a senha";

    }

    else {
      this.cadUser();
    }
  }
  checkCampos(ev: any) {
    if (this.nome != undefined || this.nome != '') {
      this.msnome = '';
      this.msnome = undefined;
    } if (this.telefone != undefined || this.telefone != '') {
      this.mstelefone = '';
      this.mstelefone = undefined;
    } if (this.email != undefined || this.email != '') {
      this.msemail = '';
      this.msemail = undefined;
    } if (this.senha != undefined || this.senha != '') {
      this.mssenha = '';
      this.mssenha = undefined;
    }
    if (this.rsenha != undefined || this.rsenha != '') {
      this.msrsenha = '';
      this.msrsenha = undefined;
    }

  }
  cadUser() {
    if (this.senha != this.rsenha) {
      this.showAlert2();
    } else {
      this.service.registerUser(
        "name=" + this.nome +
        "&email1=" + this.email +
        "&email=" + this.email +
        "&telefone=" + this.telefone +
        "&password=" + this.senha +
        "&passwordview=" + this.rsenha +
        "&perfil=2")
        .subscribe(
          data => {
            if (data.error == false) {
              this.showAlert3();
              localStorage.setItem("iduser", data.id);
              localStorage.setItem("nomeuser", this.nome);
              this.navCtrl.setRoot(HomePage, { nome: this.nome, rua: localStorage.getItem("rua"), bairro: localStorage.getItem("bairro"), cidade: localStorage.getItem("cidade"), estado: localStorage.getItem("estado"), cep: localStorage.getItem("cep") });

            } else {
              this.showAlert1();
            }

          }
        );
    }

  }  
  goBack() {
    this.navCtrl.pop();
  }

}
