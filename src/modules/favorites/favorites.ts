import { Component } from '../component';
import html from './favorites.tpl.html';
import { ProductData } from 'types';
import { favService } from '../../services/fav.service';
import { ProductList } from '../productList/productList';

class Favorites extends Component {
  products!: ProductData[];
  productList: ProductList;

  constructor(props: any) {
    super(props);
    this.productList = new ProductList();
    this.productList.attach(this.view.favorites);
  }

  async render() {
    this.products = await favService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.productList.update(this.products);
  }

}

export const favoritesComp = new Favorites(html);
