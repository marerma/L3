import { Component } from '../component';
import html from './favorites.tpl.html';
import { ProductData } from 'types';
import { favService } from '../../services/fav.service';
import { Product } from '../product/product';

class Favorites extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favService.get();
    this.view.favorites.innerHTML = '';
    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isFavorite: true });
      productComp.render();
      productComp.attach(this.view.favorites);
    });
  }
}

export const favoritesComp = new Favorites(html);
