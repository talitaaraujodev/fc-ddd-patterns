import { OrderItem } from "./order-item";

export  class Order {
  _id: string;
  _customerId: string;
  _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {}
}
