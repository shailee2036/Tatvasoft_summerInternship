import { CartModel } from "./cart.model";
import { CartRepository } from "./cart.repository";

export class CartService {
  constructor(private readonly cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  public getCart = async (userId: number) => {
    return this.cartRepository.getCart(userId);
  };

  public addCart = async (cartDetail: CartModel) => {
    return this.cartRepository.addCart(cartDetail);
  };

  public updateCart = async (cart: CartModel) => {
    return this.cartRepository.updateCart(cart);
  };

  public deleteCart = async (cartId: number) => {
    return this.cartRepository.deleteCart(cartId);
  };
}
