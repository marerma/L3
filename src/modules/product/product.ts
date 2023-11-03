import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';
import { statisticsService } from '../../services/statistics.service';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render() {
    const { id, name, src, salePriceU } = this.product;

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal');
  }
  async addObserver() {
      let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const eventTime = Date.now();
          fetch(`/api/getProductSecretKey?id=${this.product.id}`)
          .then(res => res.json())
          .then(secretKey => {
            statisticsService.viewAction(this.product, secretKey, eventTime)
            observer.unobserve(entry.target); // прекращаем наблюдение после обработки, чтобы не отправлять дважды один товар со страницы
          })         
        }
      });
    }, options)
      observer.observe(this.view.root);
    }
}