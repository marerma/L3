import { ProductData } from 'types';
import { genUUID, isEmpty } from '../utils/helpers';

const URL = '/api/sendEvent';

export const enum EventType {
  RouteChange = "route",
  ProductView = "viewCard",
  ProductViewPromo = "viewCardPromo",
  AddToCart = "addToCard",
  Purchase = "purchase", 
}
type RouteEventPayload = {
  url: string;
};
type ProductEventPayload = ProductData & {
  secretKey: string;
};

type PurchasePayload = {
  orderId: string;
	totalPrice: number;
	productIds: Array<number>;
} 
type EventPayload = RouteEventPayload | ProductEventPayload | PurchasePayload | ProductData
type Event = {
  type: EventType;
	payload: EventPayload, 
	timestamp: number;
}
class StatisticsService {
  
  private async _send(type: EventType, payload: EventPayload, timestamp: number): Promise<void> {
    const event: Event = {
      type: type,
      payload: payload,
      timestamp
    };

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
      const data = await response.json();
      if (data.success) {
        console.log('Событие успешно отправлено');
      } else {
        console.log('Произошла ошибка при отправке события');
      }

    } catch (error) {
        console.error('Произошла ошибка при отправке события:', error);
      }; 
  }

  async routeChange(data: string, timestamp: number) {
    await this._send(EventType.RouteChange, {url: data}, timestamp)
  }

  async purchaseAction(data: ProductData[], timestamp: number) {
    const orderId = genUUID();
    const totalPrice = data.reduce((acc, product) => (acc += product.salePriceU), 0);
    const productIds =  data.map((product) => product.id);
    await this._send(EventType.Purchase, {orderId, totalPrice, productIds}, timestamp );
  }

  async addToCartAction(data: ProductData, timestamp: number) {
    await this._send(EventType.AddToCart, {...data}, timestamp);
  }

  async viewAction(product: ProductData, secretKey: string, timestamp: number) {
    let eventType = EventType.ProductView;
    if (!isEmpty(product.log)) {
      eventType = EventType.ProductViewPromo;
    }
    await this._send(eventType, {...product, secretKey}, timestamp);
  }
}

export const statisticsService = new StatisticsService();