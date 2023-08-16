import { OrderModel } from "./order.model";
import { OrderRepository } from "./order.repository";
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public addOrder = (order: OrderModel) => {
    return this.orderRepository.addOrder(order);
  };
}
