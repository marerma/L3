import { ProductData } from 'types';
import { cartService } from '../../services/cart.service';
import { statisticsService } from '../../services/statistics.service';
import { formatPrice } from '../../utils/helpers';
import { Component } from '../component';
import { ProductList } from '../productList/productList';
import html from './productDetail.tpl.html';

class ProductDetail extends Component {
  more: ProductList;
  product?: ProductData;

  constructor(props: any) {
    super(props);

    this.more = new ProductList();
    this.more.attach(this.view.more);
  }

  async render() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));

    const productResp = await fetch(`/api/getProduct?id=${productId}`);
    this.product = await productResp.json();

    if (!this.product) return;

    const { id, src, name, description, salePriceU } = this.product;

    this.view.photo.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.description.innerText = description;
    this.view.price.innerText = formatPrice(salePriceU);
    this.view.btnBuy.onclick = this._addToCart.bind(this);

    const isInCart = await cartService.isInCart(this.product);

    if (isInCart) this._setInCart();
    const eventTime = Date.now();

    fetch(`/api/getProductSecretKey?id=${id}`)
      .then((res) => res.json())
      .then((secretKey) => {
        this.view.secretKey.setAttribute('content', secretKey);
        statisticsService.viewAction(this.product!, secretKey, eventTime);
      });

    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.more.update(products);
      });
  }

  private _addToCart() {
    if (!this.product) return;
    const eventTime = Date.now();

    cartService.addProduct(this.product);
    statisticsService.addToCartAction(this.product, eventTime);
    this._setInCart();
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }
}

export const productDetailComp = new ProductDetail(html);
