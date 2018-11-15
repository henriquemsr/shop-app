import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { PagamentoPage } from '../pagamento/pagamento';


@IonicPage()
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',
})
export class MyordersPage {
  idUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: ServiceProvider
  ) {
    this.idUser = localStorage.getItem("iduser");
  }
  orderViewNoConfirm: any;
  countOrdersView: any;
  modalViewNoConfirm: Boolean = false;
  showMsg: Boolean = true;

  loadInCart: Boolean = false;
  viewOrder(order) {
    this.modalViewNoConfirm = true;
    this.showMsg = false;
    this.loadInCart = true;
    this.service.getOrder(order).subscribe(
      data => {
        this.orderViewNoConfirm = data.message;
        this.countOrdersView = data.count;
        console.log(this.orderViewNoConfirm)
        console.log(this.countOrdersView)
        this.loadInCart = false;
      },
      err => this.error
    )
  }

  closeModal() {
    this.modalViewNoConfirm = false;
    this.showMsg = true;
    this.listOrdersNoConfirm(this.idUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyordersPage');
  }
  load: any;
  orders: any;
  error: any;
  countOrders: number;
  listOrdersNoConfirm(id) {
    this.load = true;
    this.service.getOrdersByUserNoConfirm(id).subscribe(
      data => {
        this.orders = data.message;
        this.countOrders = data.count;
        this.load = false;
        console.log(this.orders)
      },
      err => this.error
    )
  }
  listOrdersConfirm(id) {
    this.load = true;
    this.service.getOrdersByUserConfirm(id).subscribe(
      data => {
        this.orders = data.message;
        this.countOrders = data.count;
        this.load = false;
        console.log(this.orders)
      },
      err => this.error
    )
  }
  pop: Boolean = false;
  showMenuPop() {
    if (this.pop === false) {
      this.pop = true;
    } else {
      this.pop = false;
    }
  }
  closePop() {
    this.pop = false;
  }
  ordersConfirm: Boolean = false;
  ordersNoConfirm: Boolean = false;
  selectPhrase: Boolean = true;
  noConfirm() {
    this.ordersNoConfirm = true;
    this.ordersConfirm = false;
    this.selectPhrase = false;
    this.listOrdersNoConfirm(this.idUser);
  }
  confirm() {
    this.ordersConfirm = true;
    this.ordersNoConfirm = false;
    this.selectPhrase = false;
  }
  deleteOrdersByorderNoConfirm(id) {
    this.load = true;
    this.service.deleteOrder(id).subscribe(
      data => {
        this.load = false;
        this.listOrdersNoConfirm(this.idUser);
        console.log(data)
      },
      err => this.error
    )
  }
  deleteItem(id, np) {
    this.load = true;
    this.service.deleteItemCart(id).subscribe(
      data => {
        this.load = false;
        this.viewOrder(np);
        console.log(data)
      },
      err => this.error
    )
  }
  
  logout() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
  goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}
