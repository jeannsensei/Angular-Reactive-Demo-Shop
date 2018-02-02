import { Component, OnInit, OnChanges } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from './shared/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {
  public items: CartItem[];
  public total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.cartService.itemsChanged.subscribe(
      (items: CartItem[]) => {
        this.items = items;
      }
    );
  }

  ngOnChanges() {
    console.log('ngOnChanges called!');
  }

  onClearCart(event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.clearCart();
  }

  onRemoveItem(event, item: CartItem) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.removeItem(item);
  }

  increaseAmount(item: CartItem) {
    this.cartService.updateItemAmount(item, item.amount + 1);
  }

  decreaseAmount(item: CartItem) {
    const newAmount = (item.amount === 1) ?  1 : item.amount - 1;
    this.cartService.updateItemAmount(item, newAmount);
  }

  checkAmount(item: CartItem) {
    if (item.amount < 1 || !item.amount || isNaN(item.amount)) {
      this.cartService.updateItemAmount(item, 1);
    }
  }

}
