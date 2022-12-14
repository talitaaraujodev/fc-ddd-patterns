import { OrderRepositoryInterface } from "./../../../../domain/checkout/repository/order-repository.interface";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";
import { OrderItem } from "../../../../domain/checkout/entity/order-item";
import OrderFactory from "../../../../domain/checkout/factory/order.factory";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
    const updateItems = entity.items.map((item) =>
      OrderItemModel.update(
        {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        },
        {
          where: {
            id: item.id,
          },
        }
      )
    );
    await Promise.all(updateItems);
  }
  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const items = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price / item.quantity,
          item.product_id,
          item.quantity
        )
    );
    return new Order(orderModel.id, orderModel.customer_id, items);
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orderModels.map((orderModel) =>
      OrderFactory.create({
        id: orderModel.id,
        customerId: orderModel.customer_id,
        items: orderModel.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.product_id,
          quantity: item.quantity,
        })),
      })
    );
  }
}
