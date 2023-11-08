import { catalogComp } from './modules/catalog/catalog';
import { checkoutComp } from './modules/checkout/checkout';
import { homepageComp } from './modules/homepage/homepage';
import { notFoundComp } from './modules/notFound/notFound';
import { productDetailComp } from './modules/productDetail/productDetail';
import { statisticsService } from './services/statistics.service';

const ROUTES = {
  '/': homepageComp,
  '/catalog': catalogComp,
  '/product': productDetailComp,
  '/checkout': checkoutComp
};

export default class Router {
  $appRoot: HTMLElement;

  constructor() {
    // @ts-ignore
    this.$appRoot = document.querySelector('.js__root');

    window.addEventListener('load', this.route.bind(this));
    window.addEventListener('hashchange', this.route.bind(this));
  }

  route(e: any) {
    e.preventDefault();
    const eventTime = Date.now();

    const {href, pathname} = window.location;
    // @ts-ignore
    const component = ROUTES[pathname] || notFoundComp;

    component.attach(this.$appRoot);
    component.render();
    statisticsService.routeChange(href, eventTime);
  }
}
