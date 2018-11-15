import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

declare var PagSeguroDirectPayment;
declare let paypal: any;
@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})

export class PagamentoPage {
  orderNumber: any;

  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: any;
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  date: any = new Date();
  idUser: any;
  idEnd: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public service: ServiceProvider
  ) {
    this.idUser = localStorage.getItem("id");
    this.orderNumber = this.navParams.get("idOrder");
    this.viewOrder(this.orderNumber);
    // this.CheckAdress();
    this.monthNames = [
      'Janeiro',
      'Fevereiro',
      'Maio',
      'Abril',
      'Março',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
    this.getDaysOfMonth();
  }
  orderView: any;
  orderViewCount: any;
  error: any;
  totalOrder: any;
  viewOrder(order) {
    this.service.getOrder(order).subscribe(
      data => {
        this.orderView = data.message;
        this.orderViewCount = data.count;
        this.totalOrder = this.orderView.reduce(function (a, b) {
          return a + b['vlr_total'];
        }, 0).toFixed(2);
        console.log(this.orderView)
      },
      err => this.error
    )
  }
  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

    for (let i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (let i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
    for (let i = 0; i < (6 - lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i + 1);
    }
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (let i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }
  formatarData(data) {
    var d = new Date(data),
      mes = '' + (d.getMonth() + 1),
      dia = '' + d.getDate(),
      ano = d.getFullYear();
    if (mes.length < 2) mes = '0' + mes;
    if (dia.length < 2) dia = '0' + dia;
    return [ano, mes, dia].join('-');
  }
  // showRegisterSuccess() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Atenção!',
  //     subTitle: 'Cadastro realizado',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }
  checkDate: Boolean = false;
  saveDate: any;
  hideHeader: Boolean = false;
  btConfirm: Boolean = false;
  showPeriod: Boolean = false;
  dia: any;
  getDay(day) {
    this.dia = day;
    var d = new Date();
    var today = this.formatarData(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
    var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day;
    this.saveDate = this.formatarData(thisDate1);
    if (today > this.saveDate) {
      this.checkDate = true;
      this.hideHeader = true;
      console.log('if == ' + this.checkDate)
    } else {
      this.checkDate = false;
      this.showCalendar = false;
      this.showPeriod = true;
    }
    console.log('saveDate ' + this.saveDate)
  }
  closeInfo() {
    this.checkDate = false;
    this.hideHeader = false;
  }
  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.checkDate = false;
    this.getDaysOfMonth();
  }
  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.checkDate = false;
    this.getDaysOfMonth();
  }
  choiceMoney: Boolean = false;
  choicePgtoMoney() {
    this.choiceMoney = true;
    this.choiceCard = false;
    this.showCalendar = false;
  }
  choiceCard: Boolean = false;
  choicePgtoCard() {
    this.choiceCard = true;
    this.choiceMoney = false;
    this.showCalendar = false;
  }
  showCalendar: Boolean = false;
  showCalendarChoiceDate() {
    this.showCalendar = true;
    this.showPeriod = false;
    this.btConfirm = false;
    this.choiceMorning = false;
    this.choiceAfternoon = false;
    this.choiceNight = false;
  }
  // showAdress: boolean = false;
  // count: any;
  // nomerua: any;
  // idadress: any;
  // totalend: any;
  // CheckAdress() {
  //   this.service.checkEndereco(localStorage.getItem("id")).subscribe(
  //     data => {
  //       this.count = data.count;
  //       if (this.count > 0) {
  //         this.showAdress = true;
  //         this.totalend = data.message;
  //         console.log(this.totalend);
  //         this.nomerua = data.message.rua_user;
  //         console.log(this.nomerua);
  //         this.idadress = data.message.id_end;
  //         console.log(this.idadress);
  //       } else {
  //         this.showAdress = false;
  //       }
  //     },
  //     err => this.error
  //   )
  // }
  // cep: any;
  // bairro: any;
  // cidade: any;
  // estado: any;
  // rua: any;
  // numero: any;
  // compl: any;
  // getEndereco(event: any) {
  //   this.service.getCep(this.cep).subscribe(
  //     data => {
  //       if (data.bairro != '' && data.cidade != '' && data.uf != '') {
  //         this.bairro = data.bairro;
  //         this.cidade = data.cidade;
  //         this.estado = data.uf;
  //         this.rua = data.logradouro;

  //       } else {
  //         alert('Cep Não encontrado tente novamente');
  //       }
  //     }
  //   ,
  //   );

  // }
  // //cadastro endereço
  // cadAdress() {
  //   this.service.registerAdress(
  //     "cep_user=" + this.cep +
  //     "&rua_user=" + this.rua +
  //     "&id_user=" + this.idUser +
  //     "&rau_user" + this.rua +
  //     "&estado_user=" + this.estado +
  //     "&cidade_user=" + this.cidade +
  //     "&bairro_user=" + this.bairro +
  //     "&numero=" + this.numero
  //   )
  //     .subscribe(
  //       data => {
  //         if (data.error == false) {
  //           this.showRegisterSuccess();

  //           this.modalRegister = false;
  //           this.CheckAdress();
  //         } else {
  //           //this.showAlert1();
  //         }

  //       }
  //     );
  // }



  choiceMorning: Boolean = false;
  choiceAfternoon: Boolean = false;
  choiceNight: Boolean = false;
  morning() {
    this.btConfirm = true;
    this.choiceMorning = true;
    this.choiceAfternoon = false;
    this.choiceNight = false;
  }
  afternoon() {
    this.btConfirm = true;
    this.choiceAfternoon = true;
    this.choiceMorning = false;
    this.choiceNight = false;
  }
  night() {
    this.btConfirm = true;
    this.choiceNight = true;
    this.choiceMorning = false;
    this.choiceAfternoon = false;
  }
  // modalRegister: Boolean = false;
  // openRegisterAdrress() {
  //   this.modalRegister = true;
  //   this.hideHeader = true;
  // }
  // closeModalRegister() {
  //   this.modalRegister = false;
  // }


}

