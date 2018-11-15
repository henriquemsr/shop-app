import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, IonicApp } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { OrdersPage } from '../orders/orders';
import { PagamentoPage } from '../pagamento/pagamento';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})

export class CartPage {
  totalOrder: any;
  orderNumber: any;
  idEstabCart: any;
  nameEstabCart: any;
  imgEstabCart: any;
  sendCart=1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private ionicApp: IonicApp,
    public service: ServiceProvider
  ) {
    this.orderNumber = this.navParams.get("nPedido");

    this.idEstabCart = this.navParams.get("idEstabGetBack");
    this.nameEstabCart = this.navParams.get("nameEstabGetBack");
    this.imgEstabCart = this.navParams.get("imgEstabGetBack");

    this.listOrder(this.orderNumber);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  closeModal() {
    this.app.getRootNav().setRoot(
      OrdersPage,
      {
        idBusinessCart: this.idEstabCart,
        nameBusinessCart: this.nameEstabCart,
        imgBusinessCart: this.imgEstabCart,
        orderNumberCart: this.orderNumber,
        cart: this.sendCart
      }
    );
    this.navCtrl.pop();    
  }

  orderDataBase: any;
  Orderconut:any;
  error: any;
  load: any;
  empty:Boolean=false;
  listOrder(id) {
    this.load = true;
    this.service.getOrder(id).subscribe(
      data => {
        this.orderDataBase = data.message;
        this.Orderconut = data.count;
        this.load = false;
        console.log('object ',this.orderDataBase)
        
        if(this.orderDataBase != 0){
          console.log('inside if ',this.empty)
          this.totalOrder = this.orderDataBase.reduce(function (a, b) {
            return a + b['vlr_total'];
          }, 0).toFixed(2);
        }else{
          this.empty=true;
          console.log('inside else ',this.empty)
        }


      },
      err => this.error
    )
  }
  deleteItem(id) {
    this.load = true;
    this.service.deleteItemCart(id).subscribe(
      data => {
        this.load = false;
        this.listOrder(this.orderNumber);
        console.log(data)
      },
      err => this.error
    )
  }

  confirmPgto(id){
    console.log(id)
    this.navCtrl.push(PagamentoPage,{idOrder:id})
  }

}
