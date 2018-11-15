import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/service/service';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  order: any;
  name: any;
  idBusiness: any;
  imgBusiness: any;
  valorUnit: any;
  dateOrder: any;
  random: any;
  numberOrder: any;
  idEstabCart = '';
  nameEstabCart = '';
  imgEstabCart = '';
  orderNumberCart;
  getCart=0;  
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: ServiceProvider,
    private socialSharing: SocialSharing
  ) {
    this.order = this.navParams.get("obj");
    this.idEstabCart = this.navParams.get("idBusinessCart");
    this.nameEstabCart = this.navParams.get("nameBusinessCart");
    this.imgEstabCart = this.navParams.get("imgBusinessCart");
    this.orderNumberCart = this.navParams.get("orderNumberCart");
    this.getCart = this.navParams.get("cart");
    this.idUser=localStorage.getItem("iduser");


    if (this.idEstabCart != null) {
      this.idBusiness = this.idEstabCart;
    } else {
      this.idBusiness = this.order['id_estab'];
    }

    if (this.nameEstabCart != null) {
      this.name = this.nameEstabCart;
    } else {
      this.name = this.order['nome_estab'];
    }

    if (this.imgEstabCart != null) {
      this.imgBusiness = this.nameEstabCart;
    } else {
      this.imgBusiness = this.order['img_business'];
    }

    

    //gera data do pedido    
    var d = new Date();
    var today = this.formatarData(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
    this.dateOrder = today;

    //gera número do pedido
    var n = new Date;
    this.random = Math.random();
    var nOrder = n.getMilliseconds() + "-" + n.getSeconds() + this.random + this.dateOrder;
    this.numberOrder = nOrder;

    if (this.getCart === 1) {
      this.numberOrder = this.orderNumberCart;
      console.log('coming the database',this.numberOrder);
      this.listOrder(this.numberOrder);
    } else {
      var nE = new Date;
      this.random = Math.random();
      var nOrderE = nE.getMilliseconds() + "-" + nE.getSeconds() + this.random + this.dateOrder;
      this.numberOrder = nOrderE;
      console.log('coming the homepage',this.numberOrder);
    }

    this.listProducts(this.idBusiness);
    this.listSubCat(this.idBusiness);
  }//constructor
  info:Boolean=false;
  showInfo(){
    if(this.info === false){
      this.info=true;
    }else{
      this.info=false;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }
  showCart() {
    const modal = this.modalCtrl.create(
      CartPage,
      {
        totalPrice: this.totalOrder,
        nPedido: this.numberOrder,
        idEstabGetBack: this.idBusiness,
        nameEstabGetBack: this.name,
        imgEstabGetBack: this.imgBusiness

      });

    modal.present();
  }
  pp: string = "";
  palavra: Boolean = false;
  onKeySearch(event: any) {
    if (this.pp != "") {
      this.palavra = true;
    } else {
      this.palavra = false;
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
  }
  load: Boolean = false;
  error: any;
  products: any;
  listProducts(id) {
    this.load = true;
    this.service.getProductsById(id).subscribe(
      data => {
        this.products = data.message;
        this.load = false;
        console.log(this.products)
      },
      err => this.error
    )
  }
  subCateg:any;
  listSubCat(id) {
    this.load = true;
    this.service.getSubCatProducts(id).subscribe(
      data => {
        this.subCateg = data.message;
        this.load = false;
        console.log(this.subCateg)
      },
      err => this.error
    )
  }
  listBySub(id,id2){
    this.load = true;
    this.service.getProductsBySubCat(id,id2).subscribe(
      data => {
        this.products = data.message;
        this.load = false;
        console.log(this.subCateg)
      },
      err => this.error
    )

  }


  valor: any;
  add(data) {
    data.qtd++;
    this.qtdSave = data.qtd;
  }
  vlrLess: any;
  less(data) {
    if (data.qtd > 0) {
      data.qtd--;
      this.qtdSave = data.qtd;
    }
  }
  orderData: any;
  orderCount = 0;
  animeBlock: Boolean = false;
  animeCart: Boolean = false;
  totalOrder: any;
  listOrder(id) {
    this.animeCart = true;
    this.service.getOrder(this.numberOrder).subscribe(
      data => {
        this.orderData = data.message;

        this.orderCount = data.count;
        this.animeBlock = true;
        this.animeCart = false;


        if (this.orderCount > 0) {
          this.totalOrder = this.orderData.reduce(function (a, b) {
            return a + b['vlr_total'];
          }, 0).toFixed(2);
        }
      },
      err => this.error
    )
  }

  qtdSave: any;
  idProdSave: any;
  idEstabdSave: any;
  loadBt: Boolean = false;
  idUser:any;
  addCart(data, obj) {
    this.loadBt = true;
    this.valor = data;
    let objeto = obj;
    this.qtdSave = objeto['qtd'];
    this.idProdSave = objeto['id_produto'];
    this.idEstabdSave = objeto['id_estab'];
    this.valorUnit = objeto['vlr_produto'];

    this.service.registerOrder(
      "id_user=" + this.idUser +
      "&id_estab=" + this.idEstabdSave +
      "&n_pedido=" + this.numberOrder +
      "&id_produto=" + this.idProdSave +
      "&qtd=" + this.qtdSave +
      "&data_pedido=" + this.dateOrder +
      "&vlr_unit=" + this.valorUnit +
      "&vlr_total=" + this.valor +
      "&status_info=" + 0
    )
      .subscribe(
        data => {
          console.log(data.message);
          this.listOrder(this.numberOrder);
          obj.qtd = 0;
          this.loadBt = false;
        }
      );

  }
  regularShare(nome, preco) {
    var msg = "O valor do " + nome + " aqui no " + this.name + " está: " + preco;
    this.socialSharing.share(msg, msg, null, null);
  }
  showMsg: Boolean = false;
  animeModal: Boolean = false;
  goBack() {
    if (this.orderCount > 0) {
      this.showMsg = true;
      this.animeModal = true;
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }
  closeModal() {
    this.showMsg = false;
    this.animeModal = false;
  }
  closePage() {
    this.numberOrder = '';
    this.navCtrl.setRoot(HomePage);
  }

}
