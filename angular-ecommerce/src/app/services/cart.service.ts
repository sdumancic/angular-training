import { Injectable } from '@angular/core';
import {Product} from '../common/product';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    // check if we already have the item in our cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      alreadyExistInCart =  (existingCartItem !== undefined);
    }

    if (alreadyExistInCart){
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    // compute totals
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (const currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    // publish
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  private logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`totalPriceValue = ${totalPriceValue.toFixed(2)}, totalQuantityValue = ${totalQuantityValue.toFixed(2)}` );
    console.table(this.cartItems);
  }

  decrementQuantity(tempCartItem: CartItem) {
    tempCartItem.quantity--;
    if (tempCartItem.quantity === 0){
      this.remove(tempCartItem);
    } else{
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
    if (itemIndex > -1){
      this.cartItems.splice(itemIndex, 1 );
      this.computeCartTotals();
    }
  }
}
